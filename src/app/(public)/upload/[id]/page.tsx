import UploadModal from '@/components/UploadModal/UploadModal';
import { getBlankFile } from '@/services/server/user_files';
import { redirect } from 'next/navigation';
const Page = async ({ params }: { params: { id: string } }) => {
  const file = await getBlankFile(params.id);
  if (!file) {
    redirect('/');
  }
  return (
    <div>
      <br></br>
      <UploadModal noPrivate userFileId={params.id} redirect />
    </div>
  );
};

export default Page;
