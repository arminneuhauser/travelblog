<template>
  <div class="hero hero--home">
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    <section id="blog" class="blog">
      <div class="container">
        <header>
          <h3>Aktuelle Blogbeiträge</h3>
          <hr>
        </header>
        <article :key="story.content._uid" v-for="story in posts.stories">
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
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize,
    formatDate,
    readTime
  },
  async asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    let home = await context.app.$storyapi.get('cdn/stories/home', {
      version: version,
      cv: context.store.state.cacheVersion
    })

    let posts = await context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `blog/`,
      cv: context.store.state.cacheVersion
    })

    return { home: home.data, posts: posts.data };
  }
}
</script>

<style lang="scss" scoped>
.blog {
  background-color: $background-color;

  header {
    text-align: center;

    hr {
      width: 160px;
    }
  }
}

.hero--home {
  @include bg-pattern($home-background-color,darken($home-background-color,10%));
}
</style>
