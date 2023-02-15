import { serializeNonPOJOs } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const getProject = async (projectId: string) => {
    try {
      const project: Project | null = serializeNonPOJOs(
        await locals.pb.collection("projects").getOne(projectId)
      );
      return project;
    } catch (err: any) {
      console.error(err);
      throw error(err.status, err.message);
    }
  };
  return {
    project: getProject(params.projectId),
  };
};
