<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex h-full w-full flex-col">
  <form
    action="?/update-profile"
    method="post"
    class="flex w-full flex-col space-y-2"
  >
    <h3 class="text-2xl font-medium">Update Profile</h3>
    <div class="form-control w-full max-w-lg">
      <label for="avatar" class="label pb-1 font-medium">
        <span class="label-text">Profile Picture</span>
      </label>
      <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
        <div class="w-32 rounded-full">
          <img
            src="https://placeimg.com/80/80/people"
            alt="User Avatar"
            class=""
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
        class=""
      />
    </div>
  </form>
</div>
