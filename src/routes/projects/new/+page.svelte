<script lang="ts">
  import Input from "$lib/components/Input.svelte";
</script>

<div class="flex h-full w-full flex-col p-2">
  <div class="w-full">
    <form
      method="post"
      action="?/create"
      class="flex w-full flex-col items-center space-y-2"
      enctype="multipart/form-data"
    >
      <h3 class="text-3xl font-bold ">Tell us about your project.</h3>
      <p class="mt-2 text-lg">
        We'll need the name, tagline, link, and description
      </p>
      <Input id="name" label="Project Name" />
      <Input id="tagline" label="Project Tagline" />
      <Input id="url" label="Project URL" />
      <div class="form-control w-full max-w-lg">
        <label for="description" class="label pb-1 font-medium">
          <span class="label-text">Project Description</span>
        </label>
        <textarea
          name="description"
          class="textarea-bordered textarea h-24 resize-none"
        />
      </div>
      <div class="form-control w-full max-w-lg">
        <label for="thumnail">
          <span class="label-text">Project Thumbnail</span>
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          class="file-input-bordered file-input w-full max-w-lg"
        />
      </div>
      <div class="w-full max-w-lg pt-3">
        <button class="btn-primary btn w-full max-w-lg">Create</button>
      </div>
    </form>
  </div>
</div>
