import crypto from "crypto";
import type { ZodEffects, ZodError, ZodObject } from 'zod'

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

export const validataData = async (formData: FormData, schema: ZodEffects<ZodObject<any>> | ZodObject<any>) => {
  const body = Object.fromEntries(formData);
  try {
    const data = schema.parse(body);
    return {
      formData: data,
      errors: null
    }
  } catch (err: unknown) {
    console.log(JSON.stringify(err, null, 4));
    const errors = (<ZodError>err).formErrors;
    return {
      formData: body,
      errors
    }
  }
}  