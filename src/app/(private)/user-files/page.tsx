import { getUserFiles } from '@/services/server/user_files';
import FileTable from '@/components/FileTable/FileTable';
const Page = async () => {
  const files = await getUserFiles();

  return (
    <div className="mt-8">
      <h1 className="mb-8">User Uploaded Files</h1>
      <FileTable files={files} userFiles />
    </div>
  );
};

export default Page;
