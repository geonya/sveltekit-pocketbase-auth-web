<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import Input from '$lib/components/Input.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import type { ActionData, PageData } from './$types';
  export let data: PageData;
  export let form: ActionData;
  let emailModalOpen: boolean;
  $: emailModalOpen && (emailModalOpen = false);

  let nameModalOpen: boolean;
  $: nameModalOpen && (nameModalOpen = false);

  let loading: boolean;
  $: loading && (loading = false);

  const submitUpdate: SubmitFunction = () => {
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

<div class="flex h-full w-full flex-col space-y-12">
  <div class="w-full">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />
    <Modal label="Change Email" checked={emailModalOpen}>
      <span slot="trigger" class="btn-primary btn">Change Email</span>
      <h3 slot="heading">Change Your Email</h3>
      <form action="?/update-email" method="post" class="space-y-2" use:enhance>
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder={data?.user?.email ||
            'Enter Your Email which you want to change'}
          required
          value={data?.user?.email}
          disabled={loading}
          errors={form?.errors?.email}
        />
        <button class="btn-primary btn w-full" type="submit" disabled={loading}
          >Change Email</button
        >
      </form>
    </Modal>
  </div>
  <div class="w-full">
    <h3 class="text-2xl font-medium">Change Name</h3>
    <div class="divider mb-0.5" />
    <Input id="name" label="name" value={data?.user?.name || ''} disabled />
    <Modal label="Change Name" checked={nameModalOpen}>
      <span slot="trigger" class="btn-primary btn">Change Name</span>
      <h3 slot="heading">Change Your Name</h3>
      <form
        action="?/update-name"
        method="post"
        class="space-y-2"
        use:enhance={submitUpdate}
      >
        <Input
          id="name"
          label="name"
          value={data?.user?.name}
          placeholder={data?.user?.name || 'Enter Your Name'}
          disabled={loading}
          errors={form?.errors?.name}
        />
        <button class="btn-primary btn w-full" disabled={loading} type="submit"
          >Change Name</button
        >
      </form>
    </Modal>
  </div>
</div>
