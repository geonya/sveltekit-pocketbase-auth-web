<script lang="ts">
  export let label: string, id: string;
  export let value = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let errors: string[] = [];
</script>

<div class="form-control w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{label}</span>
  </label>
  <textarea
    {id}
    name={id}
    class="textarea-bordered textarea h-24 resize-none"
    {value}
    {required}
    {disabled}
    {placeholder}
  />
  {#if errors}
    {#each errors as error}
      <label for={id} class="label py-0 pt-1">
        <span class="label-text-alt text-error">{error}</span>
      </label>
    {/each}
  {/if}
</div>
