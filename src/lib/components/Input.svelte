<script lang="ts">
  export let value: string = '';
  export let placeholder: string = '';
  export let id: string;
  export let label: string;
  export let type = 'text';
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let errors: string[] = [];
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{label}</span></label
  >
  <input
    class={type === 'file'
      ? 'file-input-bordered file-input w-full max-w-lg '
      : 'input-bordered input w-full max-w-lg '}
    name={id}
    {type}
    {id}
    {placeholder}
    {required}
    {disabled}
    {value}
  />
  {#if errors}
    {#each errors as error}
      <label for={id} class="label py-0 pt-1">
        <span class="label-text-alt text-error">{error}</span>
      </label>
    {/each}
  {/if}
</div>
