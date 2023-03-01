<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import Input from '$lib/components/Input.svelte';
  import type { ActionData } from './$types';

  export let form: ActionData;
  export let loading = false;

  const submitUpdatePassword: SubmitFunction = () => {
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

<div class="flex h-full w-full flex-col">
  <div class="w-full">
    <form
      action="?/update-password"
      method="post"
      class="flex w-full flex-col space-y-2"
      use:enhance
    >
      <h3 class="text-2xl font-medium">Change Password</h3>
      <div class="divider" />
      <Input
        disabled={loading}
        id="oldPassword"
        type="password"
        label="Current Password"
        placeholder="Enter your current password"
        required
        errors={form?.errors?.oldPassword}
      />
      <Input
        disabled={loading}
        id="password"
        type="password"
        label="New Password"
        placeholder="Change your password"
        required
        errors={form?.errors?.password}
      />
      <Input
        disabled={loading}
        id="passwordConfirm"
        type="password"
        label="Confirm Password"
        placeholder="Change your password"
        required
        errors={form?.errors?.passwordConfirm}
      />
      <a
        href="/reset-password"
        class="text-primary hover:cursor-pointer hover:underline"
        >I forgot my password</a
      >
      <button class="btn-primary btn w-full max-w-lg uppercase"
        >update password</button
      >
    </form>
  </div>
</div>
