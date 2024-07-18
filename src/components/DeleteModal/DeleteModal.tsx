'use client';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { deleteFile } from '@/services/client/file';
import { UploadedFile, UserFile } from '@/types/file';

const DeleteModal = ({
  fileId,
  open,
  setOpen,
  file_name,
  files,
  setFiles,
}: {
  fileId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  file_name: string;
  files: UploadedFile[];
  setFiles?: (files: UploadedFile[]) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Delete the file
      await deleteFile(Number(fileId));
      if (setFiles) {
        setFiles(files.filter((file) => file.id !== Number(fileId)));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={() => setOpen(!open)}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              File: {file_name}
            </ModalHeader>
            <ModalBody>
              <div>Are you sure you want to delete?</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="danger"
                variant="light"
                onPress={handleDelete}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
