'use client';
import { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { UploadedFile } from '@/types/file';
import { updateFile } from '@/services/client/file';
import FileTable from '../FileTable/FileTable';
import UploadModal from '../UploadModal/UploadModal';
import { Switch } from '@nextui-org/react';

const FileSection = ({
  loggedin,
  ssrFiles,
}: {
  loggedin?: boolean;
  ssrFiles: UploadedFile[];
}) => {
  const [files, setFiles] = useState<UploadedFile[]>(ssrFiles);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const addFile = (file: UploadedFile) => {
    setFiles([...files, file]);
  };

  const markFilePrivate = useCallback(
    async (id: number, is_private: boolean) => {
      const file = files.find((file) => file.id === id);
      if (!file) return;
      try {
        await updateFile(id, { is_private: is_private });
        // Update the file in the state
        const updatedFiles = files.map((file) => {
          if (file.id === id) {
            return { ...file, is_private: is_private };
          }
          return file;
        });
        setFiles(updatedFiles);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [files],
  );

  const debouncedMarkFilePrivate = useMemo(() => {
    return debounce(markFilePrivate, 500);
  }, [markFilePrivate]);

  return (
    <>
      {loggedin && (
        <div className="flex flex-row justify-end items-center mb-4">
          <div className="mr-4 font-bold">Enable Delete</div>
          <Switch
            size="sm"
            defaultSelected={deleteEnabled}
            isSelected={deleteEnabled}
            onChange={() => setDeleteEnabled(!deleteEnabled)}
          />
        </div>
      )}
      <FileTable
        loggedin={loggedin}
        files={files}
        markFilePrivate={debouncedMarkFilePrivate}
        deleteEnabled={deleteEnabled}
        setFiles={setFiles}
      />
      {loggedin && (
        <div className="mt-4 flex items-center w-full justify-center">
          <UploadModal addFile={addFile} />
        </div>
      )}
    </>
  );
};

export default FileSection;
