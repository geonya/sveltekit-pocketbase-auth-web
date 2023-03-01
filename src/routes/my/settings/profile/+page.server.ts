import { updateProfileSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import type { Actions } from "./$types";

export const actions: Actions = {
  "update-profile": async ({ locals, request }) => {
    let body = await request.formData();
    const img = body.get("avatar") as File;
    if (img?.size === 0) {
      body.delete("avatar");
    }
    const { formData, errors } = await validataData(body, updateProfileSchema)
    const { avatar, ...rest } = formData;
    if (errors) {
      console.dir(errors.fieldErrors.username, { depth: null })
      return {
        success: false,
        status: 400,
        data: rest,
        errors: errors.fieldErrors
      }
    }
    try {
      const { username, avatar } = await locals.pb
        .collection("users")
        .update(locals?.user?.id, serialize(formData));
      locals.user.username = username;
      locals.user.avatar = avatar;

    } catch (err) {
      console.log(JSON.stringify(err, null, 4));
      throw error(400, "update profile internal error");
    }
    return {
      success: true,
    };
  },
};
