<template>
  <div>
    <section class="container">
      <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    </section>
    <div :key="blogPost.content._uid" v-for="blogPost in posts.stories" class="blog__overview">
      <h2>
        {{ blogPost.content.title }}
      </h2>
    </div>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return { story: { content: {} } }
  },
  mixins: [storyblokLivePreview],
  async asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    let home = await context.app.$storyapi.get('cdn/stories/home', {
      version: version
    })

    let posts = await context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `posts/`,
      cv: context.store.state.cacheVersion
    })

    return { home: home.data, posts: posts.data };
  }
}
</script>
