import { resetPasswordSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  "reset-password": async ({ locals, request }) => {
    const body = await request.formData();
    const { formData, errors } = await validataData(body, resetPasswordSchema);
    if (errors) {
      return {
        errors: errors.fieldErrors,
      }
    }
    try {
      await locals.pb.collection("users").requestPasswordReset(formData.email);
      return {
        success: true,
      };
    } catch (err) {
      console.error(err);
      throw error(500, "Reset Password Internal Error");
    }
  },
};
