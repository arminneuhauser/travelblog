<template>
  <div class="skid">
    <article :key="story.content._uid" v-for="story in related">
      <nuxt-link :to="'/' + story.full_slug">
        <figure>
          <img
          :data-src="resize(story.content.image, '750x500')"
          :alt="story.content.title"
          class="lazyload">
        </figure>
        <h1>{{ story.content.title }}</h1>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  props: [
    'stories'
  ],
  methods: {
    resize,
    formatDate,
    readTime
  }
}
</script>

<style lang="scss" scoped>
</style>
