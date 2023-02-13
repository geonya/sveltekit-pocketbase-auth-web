import crypto from "crypto";

export const serializeNonPOJOs = (obj: Object | null) => {
  return structuredClone(obj);
};

export const generateUsername = (name: string) => {
  const id = crypto.randomBytes(2).toString("hex");
  return `${name.slice(0, 5) + id}`;
};
