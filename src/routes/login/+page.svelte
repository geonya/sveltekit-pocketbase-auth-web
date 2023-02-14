<script lang="ts">
  import type { ActionData, PageData } from "./$types";

  export let form: ActionData;
</script>

<div class="flex h-full w-full flex-col items-center">
  <h2
    class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight"
  >
    Login Account
  </h2>
  <p class="mt-1 text-center">
    Or <a
      href="/register"
      class="text-primary font-medium hover:cursor-pointer hover:underline"
      >Register</a
    > If you don't have account.
  </p>
  <form
    action="?/login"
    method="post"
    class="flex w-full flex-col items-center space-y-2 pt-4"
  >
    <div class="form-control w-full max-w-md">
      <label for="email" class="label pb-1 font-medium">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        name="email"
        class="input-bordered input w-full max-w-md"
      />
    </div>
    <div class="form-control w-full max-w-md">
      <label for="password" class="label pb-1 font-medium">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        name="password"
        class="input-bordered input w-full max-w-md"
      />
    </div>
    <div class="w-full max-w-md">
      <a
        href="/reset-password"
        class="text-primary font-medium hover:cursor-pointer hover:underline"
      >
        Forgot password?
      </a>
    </div>

    <div class="w-full max-w-md pt-2">
      <button type="submit" class="btn-primary btn mb-6 w-full"> Login </button>
    </div>

    {#if form?.verified === false}
      <div class="alert alert-error mt-3 w-full max-w-md shadow-lg">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            /></svg
          >
          <span>You must verify your email!</span>
        </div>
      </div>
    {/if}
  </form>
</div>
