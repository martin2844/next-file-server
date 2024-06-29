'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/table';
import { UploadedFile, UserFile } from '@/types/file';
import { IconDelete } from '@/icons/Delete';
import { Checkbox, Button } from '@nextui-org/react';
import useIsMobile from '@/hooks/useIsMobile';

const FileTable = ({
  loggedin,
  files,
  markFilePrivate,
  userFiles,
}: {
  loggedin?: boolean;
  files: UploadedFile[] | UserFile[];
  markFilePrivate?: any;
  userFiles?: boolean;
}) => {
  const isMobile = useIsMobile();
  const columns = [
    {
      key: 'file_type',
      label: 'Type',
    },
    {
      key: 'file_name',
      label: 'Name',
    },
    {
      key: 'file_size',
      label: 'Size',
    },
  ];

  loggedin &&
    !userFiles &&
    columns.push({
      key: 'is_private',
      label: 'Private',
    });

  userFiles &&
    columns.push(
      {
        key: 'user_agent',
        label: 'User Agent',
      },
      {
        key: 'user_ip',
        label: 'User IP',
      },
    );

  loggedin &&
    columns.push({
      key: 'delete_action',
      label: 'Delete',
    });

  const rows = files.map((file) => {
    const fileRow = {
      key: file.id,
      file_type: file?.file_type,
      file_name: file?.file_name,
      file_size: file?.file_size,
      is_private: file?.is_private ? true : false,
      delete_action: 'delete',
    };
    if (userFiles) {
      (fileRow as Partial<UserFile>)['user_agent'] =
        (file as UserFile)?.user_agent?.substring(0, 15) + '...';
      (fileRow as Partial<UserFile>)['user_ip'] = (file as UserFile)?.user_ip;
    }
    return fileRow;
  });

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              if (columnKey === 'file_name') {
                return (
                  <TableCell>
                    <a
                      target="_blank"
                      className="text-blue-500"
                      href={`/api/file/${item.key}`}
                    >
                      {isMobile
                        ? getKeyValue(item, columnKey).substring(0, 15) + '...'
                        : getKeyValue(item, columnKey)}
                    </a>
                  </TableCell>
                );
              }
              if (columnKey === 'file_size') {
                const fileSizeInMegabytes =
                  getKeyValue(item, columnKey) / 1024 / 1024;
                return (
                  <TableCell>{fileSizeInMegabytes.toFixed(2) + 'MB'}</TableCell>
                );
              }
              if (columnKey === 'is_private') {
                return (
                  <TableCell>
                    <Checkbox
                      onChange={(e) =>
                        markFilePrivate(item.key, e.target.checked)
                      }
                      defaultSelected={getKeyValue(item, columnKey)}
                    />
                  </TableCell>
                );
              }
              if (columnKey === 'delete_action') {
                return (
                  <TableCell>
                    <div style={{ scale: 0.7 }} className="-my-2">
                      <Button
                        isIconOnly
                        className="text-lg"
                        color="danger"
                        aria-label="delete"
                      >
                        <IconDelete />
                      </Button>
                    </div>
                  </TableCell>
                );
              }
              return (
                <TableCell>
                  {' '}
                  {isMobile
                    ? getKeyValue(item, columnKey).substring(0, 15)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FileTable;
