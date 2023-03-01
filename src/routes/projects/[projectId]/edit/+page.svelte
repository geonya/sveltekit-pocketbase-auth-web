<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { TextArea, Input } from '$lib/components';
  import { getImageURL } from '$lib/utils';
  import { Icon, Trash } from 'svelte-hero-icons';
  import type { ActionData, PageServerData } from './$types';

  export let data: PageServerData;
  export let form: ActionData;

  let loading = false;

  const submitUpdateProject: SubmitFunction = () => {
    loading = true;
    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();

          break;
        case 'error':
          break;
        default:
          await update();
      }
      loading = false;
    };
  };
</script>

<div class="flex h-full w-full flex-col p-2">
  <div class="w-full">
    <form
      method="post"
      action="?/update-project"
      class="flex w-full flex-col items-center space-y-2"
      enctype="multipart/form-data"
      use:enhance={submitUpdateProject}
    >
      <h3>
        Edit {data.project?.name}
      </h3>
      <Input
        id="name"
        label="Name"
        value={form?.data?.name ?? data.project?.name}
        placeholder="Project name"
        errors={form?.errors?.name}
        disabled={loading}
      />
      <Input
        id="tagline"
        label="Tagline"
        value={form?.data?.tagline ?? data.project?.tagline}
        errors={form?.errors?.tagline}
        disabled={loading}
      />
      <Input
        id="url"
        label="URL"
        value={form?.data?.url ?? data.project?.url}
        errors={form?.errors?.url}
        disabled={loading}
      />
      <TextArea
        id="description"
        label="Project Description"
        value={form?.data?.description ?? data.project?.url}
        errors={form?.errors?.description}
        disabled={loading}
      />
      <div class="form-controll flex w-full max-w-lg flex-col space-y-2">
        <label for="thumbnail" class="label pb-1 font-medium">
          <span class="label-text">Thumbnail</span>
        </label>
        {#if data.project?.thumbnail}
          <label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
            <label
              for="thumbnail"
              class="absolute -top-1.5 -right-1.5 hover:cursor-pointer"
            >
              <button
                class="btn-error btn-xs btn-circle btn"
                formaction="?/delete-thumbnail"
              >
                <Icon src={Trash} class="h-4 w-4 text-white" />
              </button>
            </label>
            <div class="w-16 rounded">
              <img
                src={getImageURL(
                  data.project?.collectionId,
                  data.project?.id,
                  data.project?.thumbnail,
                  '80x80',
                )}
                alt="Project Thumbnail"
                class="w-20 rounded"
              />
            </div>
          </label>
        {/if}
        <input
          name="thumbnail"
          id="thumbnail"
          type="file"
          disabled={loading}
          class="file-input-bordered file-input file-input-sm mt-2 w-full max-w-lg"
        />
        {#if form?.errors?.thumbnail}
          <label for="thumbnail" class="label py-0 pt-1">
            <span class="label-text-alt text-error"
              >{form.errors.thumbnail}</span
            >
          </label>
        {/if}
      </div>
      <div class="w-full max-w-lg pt-3">
        <button type="submit" class="btn-primary btn w-full "
          >Edit Project</button
        >
      </div>
    </form>
  </div>
</div>
