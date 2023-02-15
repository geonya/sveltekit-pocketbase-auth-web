<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import { getImageURL } from "$lib/utils";
  import { Icon, Trash } from "svelte-hero-icons";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="flex h-full w-full flex-col p-2">
  <div class="w-full">
    <form
      method="post"
      action="?/update-project"
      class="flex w-full flex-col items-center space-y-2"
      enctype="multipart/form-data"
      use:enhance
    >
      <h3>
        Edit {data.project?.name}
      </h3>
      <Input
        id="name"
        label="Name"
        value={data.project?.name ?? ""}
        placeholder="Project name"
      />
      <Input id="tagline" label="Tagline" value={data.project?.tagline ?? ""} />
      <Input id="url" label="URL" value={data.project?.url ?? ""} />
      <div class="form-control w-full max-w-lg">
        <label for="description" class="label pb-1 font-medium">
          <span class="label-text">Project Description</span>
        </label>
        <textarea
          name="description"
          value={data.project?.description ?? ""}
          class="textarea-bordered textarea h-24 resize-none p-2"
        />
      </div>
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
                  "80x80"
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
          class="file-input-bordered file-input file-input-sm mt-2 w-full max-w-lg"
        />
      </div>
      <div class="w-full max-w-lg pt-3">
        <button type="submit" class="btn-primary btn w-full "
          >Edit Project</button
        >
      </div>
    </form>
  </div>
</div>
