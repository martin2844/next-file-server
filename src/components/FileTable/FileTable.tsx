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
import { UploadedFile } from '@/types/file';
import { Checkbox } from '@nextui-org/react';

const FileTable = ({
  loggedin,
  files,
  markFilePrivate,
}: {
  loggedin?: boolean;
  files: UploadedFile[];
  markFilePrivate?: any;
}) => {
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
    columns.push({
      key: 'is_private',
      label: 'Private',
    });

  const rows = files.map((file) => {
    return {
      key: file.id,
      file_type: file?.file_type,
      file_name: file?.file_name,
      file_size: file?.file_size,
      is_private: file?.is_private ? true : false,
    };
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
                      {getKeyValue(item, columnKey)}
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
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FileTable;
