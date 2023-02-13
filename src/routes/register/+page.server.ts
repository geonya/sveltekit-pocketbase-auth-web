import { generateUsername } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData()) as {
      name: string;
      email: string;
      password: string;
    };
    let username = generateUsername(
      body.name.split(" ").join("").toLowerCase()
    );
    try {
      await locals.pb.collection("users").create({ username, ...body });
      await locals.pb.collection("users").requestVerification(body.email);
    } catch (err) {
      console.error(err);
      throw error(500, "회원가입 에러");
    }
    throw redirect(303, "/login");
  },
};
