<script lang="ts">
  import { enhance } from "$app/forms";
  import { getImageURL } from "$lib/utils";
  import Modal from "./Modal.svelte";
  export let project: Project;
  let modalOpen: boolean;
  $: modalOpen = false;
</script>

<div class="flex h-28 w-full items-center justify-between">
  <div class="avatar">
    <div class="w-20 rounded">
      <img
        src={project?.thumbnail
          ? getImageURL(project.collectionId, project.id, project.thumbnail)
          : `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project.name}`}
        alt="Project thumbnail"
      />
    </div>
  </div>
  <div class="ml-4 flex h-full w-full flex-col justify-center">
    <a href="/projects/{project.id}" class="text-lg font-semibold"
      >{project.name}</a
    >
    <p>{project.tagline}</p>
  </div>
  <div class="flex w-full items-center justify-end">
    <a href="/projects/{project.id}/edit" class="btn-outline btn">수정</a>
    <Modal label={project.id} checked={modalOpen}>
      <span slot="trigger" class="btn-error btn ml-2">삭제</span>
      <div class="" slot="heading">
        <h3 class="text-2xl">{project.name} 예쁘게 지우기 ✏️</h3>
        <p class="mt-2 text-base font-normal">정말로 지우시겠습니까? ❌</p>
      </div>
      <div
        slot="actions"
        class="flex w-full items-center justify-center space-x-2"
      >
        <label for={project.id} class="btn-outline btn "> 취소해염 </label>
        <form action="?/delete-project" method="post" use:enhance>
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" class="btn-error btn">진짜 지우기</button>
        </form>
      </div>
    </Modal>
  </div>
</div>
<p class="text-sm">{project.tagline}</p>
