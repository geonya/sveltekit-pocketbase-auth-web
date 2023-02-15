import crypto from "crypto";

export const serializeNonPOJOs = (obj: Object | null): any => {
  return structuredClone(obj);
};

export const generateUsername = (name: string) => {
  const id = crypto.randomBytes(2).toString("hex");
  return `${name.slice(0, 5) + id}`;
};
export const getImageURL = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = "0x0"
) => {
  return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
