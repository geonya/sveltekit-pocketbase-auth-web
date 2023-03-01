<script lang="ts">
  import type { ActionData } from './$types';
  import { Input } from '$lib/components';
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';

  export let form: ActionData;

  let loading = false;

  const submitResetPassworld: SubmitFunction = () => {
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

<div class="flex h-full w-full flex-col items-center">
  <h2
    class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content"
  >
    Reset Your Password
  </h2>
  <p class="mt-1 text-center">
    We will send you an email with a link to reset your password.
  </p>
  <form
    action="?/reset-password"
    method="post"
    class="flex w-full flex-col items-center space-y-2 pt-4"
    use:enhance={submitResetPassworld}
  >
    <Input
      id="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      required
      errors={form?.errors?.email}
      disabled={loading}
    />

    <div class="w-full max-w-md pt-2">
      <button type="submit" class="btn-primary btn mb-6 w-full">
        Reset Password
      </button>
    </div>
  </form>
  {#if form?.success === true}
    <div class="alert alert-success max-w-md shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>Email has been sent to reset your password!</span>
        <a
          href="/login"
          class="font-medium text-primary hover:cursor-pointer hover:underline"
          >Login</a
        >
      </div>
    </div>{/if}
</div>
