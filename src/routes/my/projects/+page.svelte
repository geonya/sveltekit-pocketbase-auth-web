<script lang="ts">
  import { MyProjectItem } from "$lib/components";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<h2 class="text-3xl font-bold">My Projects</h2>
<div class="mt-4 flex w-full flex-col items-center">
  {#if data?.projects?.length === 0}
    <p class="text-center text-3xl">😇 프로젝트 없음</p>
    <p class="text-center text-3xl">👉 프로젝트를 추가해주세요</p>
    <a href="/projects/new" class="btn-primary btn mt-4 max-w-md">추가하기</a>
  {:else}
    <div class="flex w-full max-w-4xl flex-col space-y-4">
      {#each data?.projects as project}
        <MyProjectItem {project} />
        <div class="divider mt-0 mb-2" />
      {/each}
    </div>
  {/if}
</div>
