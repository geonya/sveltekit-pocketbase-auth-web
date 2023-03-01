import { registerUserSchema } from "$lib/schema";
import { generateUsername, validataData } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const { formData, errors } = await validataData(await request.formData(), registerUserSchema);
    if (errors) {
      return {
        data: formData as Record<string, string>,
        errors: errors.fieldErrors,
      }
    }
    let username = generateUsername(
      formData.name.split(" ").join("").toLowerCase()
    );
    try {
      await locals.pb.collection("users").create({ username, ...formData });
      await locals.pb.collection("users").requestVerification(formData.email);

    } catch (err) {
      console.error(err);
      throw error(500, "회원가입 에러");
    }
    throw redirect(303, "/login");

  },
};
