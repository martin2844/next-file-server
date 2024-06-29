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

export type UserFile = {
  id: string;
  user_ip?: string;
  user_agent?: string;
  user_name?: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  file_extension?: string;
  file_url?: string;
  is_private?: boolean;
  created_at?: string;
  updated_at?: string;
};
