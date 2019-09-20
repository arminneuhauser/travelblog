<template>
  <div class="hero hero--home">
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    <section id="blog" class="blog">
      <div class="container">
        <header>
          <nav>
            <h3><nuxt-link :to="{ path: '/blog/'}">Unser Reisetagebuch</nuxt-link></h3>
            <nuxt-link class="link link--right" :to="{ path: '/blog/'}">mehr</nuxt-link>
          </nav>
        </header>
        <div class="posts">
          <article-tile :key="story.content._uid" v-for="story in posts.stories" :story="story" class="compact"/>
        </div>
        <div class="read-more">
          <nuxt-link class="button button--ghost button--large button--icon" :to="{ path: '/blog/'}">
            Alle Beiträge
            <svg class="rotate-270"><use xlink:href="#down"></use></svg>
          </nuxt-link>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  head() {
    return {
      bodyAttrs: {
        class: 'page-home',
      },
    };
  },
  data () {
    return {
      story: { content: {} }
    }
  },
  mixins: [storyblokLivePreview],
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
.hero--home {
  @include bg-pattern($home-background-color,darken($home-background-color,10%));
}

.blog {
  background-color: $background-color;

  @include breakpoint(m) {
    .posts {
      margin: 0 -15px;
    }

    article {
      border-bottom: none;
      flex-basis: 50%;
      padding: 20px 15px;

      header {
        padding: 0;
      }
    }
  }

  @include breakpoint(l) {
    article {
      flex-basis: 33.33333%;

      h1 {
        font-size: 2.6rem;
      }
    }
  }
}
</style>
