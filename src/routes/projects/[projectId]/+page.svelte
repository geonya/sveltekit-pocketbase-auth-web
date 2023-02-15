<script lang="ts">
  import { getImageURL } from "$lib/utils";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<div class="mt-4 flex w-full flex-col">
  <div class="avatar">
    <div class="w-20 rounded">
      <img
        src={data?.project?.thumbnail
          ? getImageURL(
              data?.project?.collectionId,
              data?.project?.id,
              data?.project?.thumbnail
            )
          : `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data?.project?.name}`}
        alt="Project thumbnail"
      />
    </div>
  </div>
  <h1 class="mt-4 text-2xl font-bold">
    {data?.project?.name}
  </h1>
  <p class="mt-2 text-2xl font-light">{data?.project?.tagline}</p>
  <p class="">{data?.project?.description}</p>
</div>
