<script lang="ts">
  import { getImageURL } from "$lib/utils";
  import "../app.postcss";
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;
</script>

<main class="min-h-full">
  <nav class="navbar border-b bg-base-100">
    <div class="flex-1">
      <a href="/" class="btn-ghost btn text-xl normal-case">Showcase</a>
    </div>
    <div class="flex-none">
      {#if !data.user}
        <div class="dropdown-end dropdown">
          <a href="/login" class="btn-primary btn">Login</a>
          <a href="/register" class="btn-secondary btn">Register</a>
        </div>
      {:else}
        <div class="dropdown-end dropdown mr-4">
          <a href="/projects/new" class="btn-outline btn-primary btn"
            >Add Project</a
          >
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <div class="dropdown-end dropdown">
          <label tabindex="0" class="btn-ghost btn-circle avatar btn">
            <div class="w-10 rounded-full">
              <img
                src={data?.user?.avatar
                  ? getImageURL(
                      data?.user?.collectionId,
                      data?.user?.id,
                      data?.user?.avatar
                    )
                  : `https://ui-avatars.com/api/?name=${data?.user?.name}`}
                alt="User Avatar"
                class=""
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
          >
            <li>
              <a href="/my/projects" class="justify-between">My Projects</a>
            </li>
            <li>
              <a href="/my/settings">Settings</a>
            </li>
            <li>
              <form action="/logout" method="post">
                <button type="submit" class="w-full text-start">Logout</button>
              </form>
            </li>
            <li />
          </ul>
        </div>
      {/if}
    </div>
  </nav>
  <div class="mx-auto w-full max-w-4xl py-10 sm:px-6 lg:px-8">
    <slot><!-- optional fallback --></slot>
  </div>
</main>
