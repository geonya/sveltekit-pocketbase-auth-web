import { serializeNonPOJOs } from "$lib/utils";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw error(401, "Unauthorized");
  }
  try {
    const project: Project = serializeNonPOJOs(
      await locals.pb.collection("projects").getOne(params.projectId)
    );

    if (locals.user.id === project.user) {
      return {
        project,
      };
    } else {
      throw error(401, "forbidden");
    }
  } catch (err: any) {
    console.error(err);
    throw error(err.status, err.message);
  }
};

export const actions: Actions = {
  "update-project": async ({ request, locals, params }) => {
    if (params.projectId === undefined) throw error(404, "Not found");
    const formData = await request.formData();
    const thumbnail = formData.get("thumbnail") as File;
    if (thumbnail.size === 0) {
      formData.delete("thumbnail");
    }
    try {
      await locals.pb.collection("projects").update(params.projectId, {
        ...formData,
      });
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    throw redirect(303, "/projects/" + params.projectId);
  },
  "delete-thumbnail": async ({ locals, params }) => {
    if (params.projectId === undefined) throw error(404, "Not found");
    try {
      await locals.pb.collection("projects").update(params.projectId, {
        thumbnail: null,
      });
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
};
