import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  "reset-password": async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData()) as {
      email: string;
    };
    try {
      await locals.pb.collection("users").requestPasswordReset(body.email);
      return {
        success: true,
      };
    } catch (err) {
      console.error(err);
      throw error(500, "Reset Password Internal Error");
    }
  },
};
