import { UploadedFile } from "@/types/file";
import db from "@/lib/db";

export const saveFile = async (file: UploadedFile) => {
  return db("uploads").insert(file).returning("*");
};
