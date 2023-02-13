import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
    };
    try {
      await locals.pb
        .collection("users")
        .authWithPassword(body.email, body.password);
      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return {
          verified: false,
        };
      }
    } catch (err) {
      console.error(err);
      throw error(500, "Login Internal Error");
    }
    throw redirect(303, "/");
  },
};
