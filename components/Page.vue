<template>
  <div v-editable="blok" class="page">
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component" :posts="posts"></component>
  </div>
</template>

<script>
export default {
  props: ['blok', 'posts']
}
</script>
