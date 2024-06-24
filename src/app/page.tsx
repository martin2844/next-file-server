import { getFiles } from '@/services/server/files';
import { getSession } from '@/utils/session';
import FileSection from '@/components/FileSection/FileSection';
const HomePage = async () => {
  const session = await getSession();
  const files = await getFiles(!!session?.user);
  return (
    <section className="mt-8">
      <FileSection loggedin={!!session?.user} ssrFiles={files} />
    </section>
  );
};

export default HomePage;
