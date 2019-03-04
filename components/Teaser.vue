<template>
  <div v-editable="blok">
    {{ blok.headline }}
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
