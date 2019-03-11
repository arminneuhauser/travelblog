<template>
  <section class="blog">
    <div class="container">
      <article :key="story.content._uid" v-for="story in data.stories">
        <nuxt-link :to="'/' + story.full_slug">
          <figure>
            <img :src="resize(story.content.image, '375x228')">
          </figure>
          <div>
            <h1>{{ story.content.title }}</h1>
            <p>{{ story.content.intro }}</p>
            <p class="meta">{{ formatDate(story.first_published_at) }} • {{ readTime(story.content.body) }} Min. Lesezeit</p>
          </div>
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  data () {
    return { total: 0, data: { stories: [] } }
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize,
    formatDate,
    readTime
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `posts/`,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang="scss">
</style>
