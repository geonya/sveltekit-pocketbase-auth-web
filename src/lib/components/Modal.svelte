<script lang="ts">
  export let label: string;
  export let checked: boolean;
</script>

<label for={label}>
  <slot name="trigger" />
</label>

<input type="checkbox" id={label} class="modal-toggle" {checked} />
<label for={label} class="modal modal-bottom sm:modal-middle">
  <label for="" class="modal-box">
    <div class="text-center text-xl font-bold">
      <slot name="heading"><!-- optional fallback --></slot>
    </div>
    <div class="my-2">
      <slot><!-- optional fallback --></slot>
    </div>
    <div class="modal-action justify-center">
      <slot name="actions"><!-- optional fallback --></slot>
    </div>
  </label>
</label>
