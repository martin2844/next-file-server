import { deleteFile, getFileById, updateFile } from '@/services/server/files';
import { UploadedFile } from '@/types/file';
import { apiResponse } from '@/utils/apiResponse';
import { getSession } from '@/utils/session';
import { NextRequest } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import fs from 'fs';

// How to stream files in Next.js https://www.ericburel.tech/blog/nextjs-stream-files
async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}
// Provided by Mozilla Developer documentation
// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
// Please say thanks to Mozilla !!
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export function streamFile(path: string): ReadableStream {
  const nodeStream = fs.createReadStream(path);
  const data: ReadableStream = iteratorToStream(
    nodeStreamToIterator(nodeStream),
  );
  return data;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  const id = params.id;
  const file = await getFileById(parseInt(id));
  if (!file) {
    apiResponse(404, { message: 'File not found' });
  }
  if ((file as unknown as UploadedFile)?.is_private && !session?.user) {
    return apiResponse(401, { message: 'Unauthorized' });
  }

  // Ensure the file path is safe and valid
  const filePath = path.resolve(
    '.',
    (file as unknown as UploadedFile).file_url,
  ); // Adjust './public' to the directory where your files are stored

  // Check if file exists and is readable
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return apiResponse(404, { message: 'File not found' });
  }

  const stats = await fsPromises.stat(filePath);
  const stream: ReadableStream = streamFile(filePath);
  return new Response(stream, {
    status: 200,
    headers: new Headers({
      'content-disposition': `attachment; filename=${path.basename(filePath)}`,
      'content-type': 'application/zip',
      'content-length': stats.size + '',
    }),
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session?.user) {
    return apiResponse(401, { message: 'Unauthorized' });
  }
  const id = params.id;
  const file = await getFileById(parseInt(id));
  if (!file) {
    apiResponse(404, { message: 'File not found' });
  }
  const updateFields = await req.json();
  delete updateFields.id;
  try {
    const updatedFile = await updateFile(parseInt(id), updateFields);
    return apiResponse(200, {
      message: 'File updated successfully',
      file: updatedFile[0],
    });
  } catch (error) {
    return apiResponse(500, {
      message: 'Error updating file',
      error: error?.toString(),
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session?.user) {
    return apiResponse(401, { message: 'Unauthorized' });
  }
  const id = params.id;
  const file = await getFileById(parseInt(id));
  if (!file) {
    apiResponse(404, { message: 'File not found' });
  }
  try {
    await fsPromises.unlink(
      path.resolve('.', (file as unknown as UploadedFile).file_url),
    );
    await deleteFile(parseInt(id));
    return apiResponse(200, { message: 'File deleted successfully' });
  } catch (error) {
    return apiResponse(500, {
      message: 'Error deleting file',
      error: error?.toString(),
    });
  }
}
