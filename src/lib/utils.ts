export const serializeNonPOJOs = (obj: Object | null) => {
  return structuredClone(obj);
};
