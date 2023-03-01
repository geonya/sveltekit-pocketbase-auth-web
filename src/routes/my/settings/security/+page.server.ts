import { updatePasswordSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  "update-password": async ({ request, locals }) => {
    const body = await request.formData();
    const { formData, errors } = await validataData(body, updatePasswordSchema);
    if (errors) {
      return {
        errors: errors.fieldErrors,
      }
    }
    try {
      await locals.pb.collection("users").update(locals.user.id, formData);
      locals.pb.authStore.clear();
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    throw redirect(303, "/login");
  },
};
