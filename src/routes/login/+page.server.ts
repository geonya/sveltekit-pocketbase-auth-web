import { loginUserSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const body = await request.formData();
    const { formData, errors } = await validataData(body, loginUserSchema)
    if (errors) {
      return {
        data: formData,
        errors: errors.fieldErrors
      }
    }
    try {
      await locals.pb
        .collection("users")
        .authWithPassword(formData.email, formData.password);
      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return {
          data: { email: formData.email },
          errors,
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
