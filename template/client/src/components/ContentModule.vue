<template>
  <div class="app-content flex flex-1">
    <div class="flex flex-1 flex-column" :class="['m-'+name]">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
