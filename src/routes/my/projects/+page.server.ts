import { serializeNonPOJOs } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login");
  }

  const getUserProjects = async (userId: string) => {
    try {
      const projects = serializeNonPOJOs(
        await locals.pb.collection("projects").getFullList(undefined, {
          filter: `user = "${userId}"`,
        })
      );
      return projects;
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
  };
  return {
    projects: await getUserProjects(locals.user.id),
  };
};

export const actions: Actions = {
  "delete-project": async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as { id: string };
    const projectId = data.id;
    try {
      await locals.pb.collection("projects").delete(projectId);
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
};
