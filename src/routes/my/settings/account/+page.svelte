<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import Input from "$lib/components/Input.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import type { PageData } from "./$types";
  export let data: PageData;
  let emailModalOpen: boolean;
  $: emailModalOpen && (emailModalOpen = false);

  let usernameModalOpen: boolean;
  $: usernameModalOpen && (usernameModalOpen = false);

  let loading: boolean;
  $: loading && (loading = false);

  const submitUpdateEmail = () => {
    loading = true;
    emailModalOpen = true;
    return async ({ result }: { result: ActionResult }) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          emailModalOpen = false;
          break;
        case "error":
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
  const submitUpdateUsername = () => {
    loading = true;
    usernameModalOpen = true;
    return async ({ result }: { result: ActionResult }) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          usernameModalOpen = false;
          break;
        case "error":
          break;
        default:
          await applyAction(result);
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
      <form
        action="?/update-email"
        method="post"
        class="space-y-2"
        use:enhance={submitUpdateEmail}
      >
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder={data?.user?.email ||
            "Enter Your Email which you want to change"}
          required
          value={data?.user?.email}
          disabled={loading}
        />
        <button class="btn-primary btn w-full" type="submit" disabled={loading}
          >Change Email</button
        >
      </form>
    </Modal>
  </div>
  <div class="w-full">
    <h3 class="text-2xl font-medium">Change Username</h3>
    <div class="divider mb-0.5" />
    <Input
      id="username"
      label="Username"
      value={data?.user?.username || ""}
      disabled
    />
    <Modal label="Change Username" checked={usernameModalOpen}>
      <span slot="trigger" class="btn-primary btn">Change Name</span>
      <h3 slot="heading">Change Your Name</h3>
      <form
        action="?/update-username"
        method="post"
        class="space-y-2"
        use:enhance={submitUpdateUsername}
      >
        <Input
          id="username"
          label="Username"
          value={data?.user?.username}
          placeholder={data?.user?.username || "Enter Your Name"}
          disabled={loading}
        />
        <button class="btn-primary btn w-full" disabled={loading} type="submit"
          >Change Name</button
        >
      </form>
    </Modal>
  </div>
</div>
