'use client';
import { useState } from 'react';
import { createBlankFile } from '@/services/client/user_files';
import { Button } from '@nextui-org/react';
const Create = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const response = await createBlankFile();
    setLinks([...links, response.data]);
    setLoading(false);
  };

  return (
    <div>
      <section className="mt-8 mb-8">
        <h1 className="mb-2">Create Upload Link</h1>
        <p>
          You can create a unique link that you can send to a user, this will
          enable them to upload 1 file.
        </p>
      </section>
      <form>
        <Button isLoading={loading} onClick={handleCreate} color="primary">
          Create Link
        </Button>
        {links.length > 0 && (
          <div>
            {links.map((link) => (
              <div key={link}>
                <p>{`${process.env.NEXT_PUBLIC_URL}/upload/${link}`}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Create;
