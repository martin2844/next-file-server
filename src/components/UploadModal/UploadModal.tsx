'use client';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  Checkbox,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { UploadedFile } from '@/types/file';
import { useRouter } from 'next/navigation';

const UploadModal = ({
  addFile,
  userFileId,
  redirect,
  noPrivate,
}: {
  addFile?: (file: UploadedFile) => void;
  userFileId?: string;
  redirect?: boolean;
  noPrivate?: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handler for file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handler for checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file before submitting.');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('is_private', isPrivate.toString());
    if (userFileId) {
      formData.append('user_upload_id', userFileId);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { file } = await response.json();
        if (addFile) {
          addFile(file);
        }
        onClose();
        setFile(null);
        setIsPrivate(false);
        if (redirect) {
          router.push('/done');
        }
      } else {
        alert('Failed to upload file.');
      }
    } catch (error: any) {
      alert('Error submitting the form: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Upload
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload File
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      className="border border-gray-300 p-2 w-full rounded-md mb-4"
                    />
                    {!noPrivate && (
                      <Checkbox
                        checked={isPrivate}
                        onChange={handleCheckboxChange}
                      >
                        Private
                      </Checkbox>
                    )}
                  </div>
                  <Button isLoading={loading} type="submit">
                    Upload File
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadModal;
