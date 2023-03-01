<script lang="ts">
  import { Input } from '$lib/components';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<div class="flex h-full w-full flex-col items-center">
  <h2
    class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content"
  >
    Register Account
  </h2>
  <p class="mt-1 text-center">
    Or <a
      href="/login"
      class="font-medium text-primary hover:cursor-pointer hover:underline"
      >Login</a
    > If you already have account.
  </p>
  <form
    action="?/register"
    method="post"
    class="pt-r flex w-full flex-col items-center space-y-2"
  >
    <Input
      type="text"
      id="name"
      label="Name"
      value={form?.data?.name}
      errors={form?.errors?.name}
    />
    <Input
      type="email"
      id="email"
      label="Email"
      value={form?.data?.email}
      errors={form?.errors?.email}
    />
    <Input
      type="password"
      id="password"
      label="Password"
      errors={form?.errors?.password}
    />
    <Input
      type="password"
      id="passwordConfirm"
      label="Password Confirm"
      errors={form?.errors?.passwordConfirm}
    />
    <div class="w-full max-w-lg pt-2">
      <button type="submit" class="btn-primary btn w-full"> Register </button>
    </div>
  </form>
</div>
