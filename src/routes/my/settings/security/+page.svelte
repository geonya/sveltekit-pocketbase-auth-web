<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import type { PageData } from "./$types";
</script>

<div class="flex h-full w-full flex-col">
  <div class="w-full">
    <form
      action="?/update-password"
      method="post"
      class="flex w-full flex-col space-y-2"
    >
      <h3 class="text-2xl font-medium">Change Password</h3>
      <div class="divider" />
      <Input
        id="oldPassword"
        type="password"
        label="Current Password"
        placeholder="Enter your current password"
        required
      />
      <Input
        id="password"
        type="password"
        label="New Password"
        placeholder="Change your password"
        required
      />
      <Input
        id="passwordConfirm"
        type="password"
        label="Confirm Password"
        placeholder="Change your password"
        required
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
