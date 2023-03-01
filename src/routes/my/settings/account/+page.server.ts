import { updateEmailSchema, updateNameSchema } from "$lib/schema";
import { validataData } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types"

export const actions: Actions = {
  "update-email": async ({ request, locals }) => {
    const body = await request.formData()
    const { formData, errors } = await validataData(body, updateEmailSchema)
    if (errors) {
      return {
        data: formData,
        errors: errors.fieldErrors
      }
    }
    try {
      await locals.pb.collection("users").requestEmailChange(formData.email);
      locals.user.email = formData.email;
      await locals.pb.collection("users").authRefresh();
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
  "update-name": async ({ request, locals }) => {
    const body = await request.formData()
    const { formData, errors } = await validataData(body, updateNameSchema)
    if (errors) {
      return {
        data: formData,
        errors: errors.fieldErrors
      }
    }
    try {
      await locals.pb
        .collection("users")
        .getFirstListItem(`name = "${formData.name}"`);
      locals.user.name = formData.name;
      await locals.pb.collection("users").authRefresh();
    } catch (err: any) {
      console.error(err);
      if (err.status === 404) {
        try {
          const { name } = await locals.pb
            .collection("users")
            .update(locals.user.id, { name: formData.name });
          locals.user.name = name;
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
