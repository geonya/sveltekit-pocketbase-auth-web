<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { TextArea, Input } from '$lib/components';
  import type { ActionData } from './$types';
  export let form: ActionData;
  let loading = false;
  const submitCreateProject: SubmitFunction = () => {
    loading = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          break;
        case 'error':
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<div class="flex h-full w-full flex-col p-2">
  <div class="w-full">
    <form
      method="post"
      action="?/create"
      class="flex w-full flex-col items-center space-y-2"
      enctype="multipart/form-data"
      use:enhance={submitCreateProject}
    >
      <h3 class="text-3xl font-bold ">Tell us about your project.</h3>
      <p class="mt-2 text-lg">
        We'll need the name, tagline, link, and description
      </p>
      <Input
        disabled={loading}
        id="name"
        label="Project Name"
        value={form?.data?.name}
        errors={form?.errors?.name}
      />
      <Input
        disabled={loading}
        id="tagline"
        label="Project Tagline"
        value={form?.data?.tagline}
        errors={form?.errors?.tagline}
      />
      <Input
        disabled={loading}
        id="url"
        label="Project URL"
        value={form?.data?.url}
        errors={form?.errors?.url}
      />
      <TextArea
        disabled={loading}
        id="description"
        label="Project Description"
        value={form?.data?.description}
        errors={form?.errors?.description}
      />
      <Input
        disabled={loading}
        id="thumbnail"
        label="Thumbnail"
        type="file"
        errors={form?.errors?.thumbnail}
      />
      <div class="w-full max-w-lg pt-3">
        <button class="btn-primary btn w-full max-w-lg">Create</button>
      </div>
    </form>
  </div>
</div>
