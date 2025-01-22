"use server";

import {
  revalidatePath as customRevalidatePath,
  revalidateTag as customRevalidateTag,
} from "next/cache";
type RevalidatePathParams = Parameters<typeof customRevalidatePath>;
type RevalidateTagParams = Parameters<typeof customRevalidateTag>;

export const revalidatePath = (...args: RevalidatePathParams) => {
  const [path, type] = args;
  customRevalidatePath(path, type);
};

export const revalidateTag = (...args: RevalidateTagParams) => {
  const [tag] = args;
  customRevalidateTag(tag);
};
