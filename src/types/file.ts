export type UploadedFile = {
  id?: number;
  file_name: string;
  file_type: string;
  file_size?: number;
  file_extension: string;
  file_url: string;
  is_private: boolean;
  created_at?: string;
  updated_at?: string;
};
