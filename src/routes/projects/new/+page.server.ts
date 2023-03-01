import { createProjectSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { serialize } from 'object-to-formdata'

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login");
  }
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const body = await request.formData();
    const thumb = body.get("thumbnail") as File;
    if (thumb.size === 0) {
      body.delete("thumbnail");
    }
    body.append("user", locals.user.id);
    const { formData, errors } = await validataData(body, createProjectSchema)
    const { thumbnail, ...rest } = formData;
    if (errors) {
      return {
        errors: errors.fieldErrors,
        data: rest,
      };
    }
    try {
      await locals.pb.collection("projects").create(serialize(formData));
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    throw redirect(303, "/my/projects");
  }
}

