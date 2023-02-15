import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
  "update-email": async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
    };
    try {
      await locals.pb.collection("users").requestEmailChange(data.email);
      locals.user.email = data.email;
      await locals.pb.collection("users").authRefresh();
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
  "update-username": async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as {
      username: string;
    };
    try {
      await locals.pb
        .collection("users")
        .getFirstListItem(`username = "${data.username}"`);
      locals.user.username = data.username;
      await locals.pb.collection("users").authRefresh();
    } catch (err: any) {
      console.error(err);
      if (err.status === 404) {
        try {
          const { username } = await locals.pb
            .collection("users")
            .update(locals.user.id, { username: data.username });
          locals.user.username = username;
          await locals.pb.collection("users").authRefresh();
          return {
            success: true,
          };
        } catch (err: any) {
          console.error(err);
          throw error(err.status, err.message);
        }
      }
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
};
