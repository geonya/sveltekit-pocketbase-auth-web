import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  "update-password": async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());
    try {
      await locals.pb.collection("users").update(locals.user.id, data);
      locals.pb.authStore.clear();
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    throw redirect(303, "/login");
  },
};
