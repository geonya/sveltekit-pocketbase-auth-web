<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import { Input } from '$lib/components';
  import { getImageURL } from '$lib/utils';
  import { Icon, Pencil } from 'svelte-hero-icons';
  import type { ActionData, PageData } from './$types';
  export let data: PageData;
  let loading = false;
  let form: ActionData;

  $: console.log(form);

  const showPreview = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;
    const files = target.files;
    if (files && files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById(
        'avatar-preview',
      ) as HTMLImageElement;
      preview.src = src;
    }
  };

  const submitProfileUpdate: SubmitFunction = () => {
    loading = true;
    return ({ result, update }) => {
      switch (result.type) {
        case 'success':
          if (result) {
            form = result.data as ActionData;
          }
          break;
        case 'error':
          console.log(result.error);
          break;
        default:
          update();
      }
      loading = false;
    };
  };
</script>

<div class="flex h-full w-full flex-col">
  <form
    action="?/update-profile"
    method="post"
    class="flex w-full flex-col space-y-2"
    enctype="multipart/form-data"
    use:enhance={submitProfileUpdate}
  >
    <h3 class="text-2xl font-medium">Update Profile</h3>
    <div class="form-control w-full max-w-lg">
      <label for="avatar" class="label pb-1 font-medium">
        <span class="label-text">Profile Picture</span>
      </label>
      <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
        <label
          for="avatar"
          class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
        >
          <span class="btn-secondary btn-sm btn-circle btn">
            <Icon src={Pencil} class="h-4 w-4" />
          </span>
        </label>
        <div class="w-32 rounded-full">
          <img
            src={data?.user?.avatar
              ? getImageURL(
                  data?.user?.collectionId,
                  data?.user?.id,
                  data?.user?.avatar,
                )
              : `https://ui-avatars.com/api/?name=${data?.user?.name}`}
            alt="User Avatar"
            class=""
            id="avatar-preview"
          />
        </div>
      </label>
      <input
        type="file"
        name="avatar"
        id="avatar"
        value=""
        accept="image/*"
        hidden
        on:change={showPreview}
        disabled={loading}
      />
      {#if form?.errors?.avatar}
        <label for="avatar" class="label py-0 pt-1">
          <span class="label-text-alt text-error">{form.errors.avatar}</span>
        </label>
      {/if}
    </div>
    <Input
      id="username"
      label="Username"
      value={form?.data?.username ?? data?.user?.username ?? ''}
      disabled={loading}
      errors={form?.errors?.username}
    />
    <div class="w-full max-w-lg pt-3">
      <button class="btn-primary btn w-full max-w-lg" type="submit"
        >Update Profile</button
      >
    </div>
  </form>
</div>
