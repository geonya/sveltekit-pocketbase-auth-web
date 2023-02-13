import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  "update-profile": async ({ locals, request }) => {
    let data = await request.formData();
    const userAvatar = data.get("avatar") as File;
    if (userAvatar?.size === 0) {
      data.delete("avatar");
    }
    try {
      const { name, avatar } = await locals.pb
        .collection("users")
        .update(locals?.user?.id, data);
      locals.user.name = name;
      locals.user.avatar = avatar;
    } catch (err) {
      console.error(err);
      throw error(400, "update profile internal error");
    }
    return {
      success: true,
    };
  },
};
