<template>
  <div v-editable="blok" class="hero hero--home">
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.hero--home {
  padding-top: 90px;

  @include breakpoint(l) {
    padding-top: 150px;
  }
}
</style>
