<template>
  <div class="hero hero--home">
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    <section id="blog" class="blog">
      <div class="container">
        <header>
          <h3>Unser Reisetagebuch</h3>
          <hr>
        </header>
        <div class="posts">
          <article :key="story.content._uid" v-for="story in posts.stories">
            <nuxt-link :to="'/' + story.full_slug">
              <figure>
                <img :src="resize(story.content.image, '375x210')">
              </figure>
              <header>
                <h1>{{ story.content.title }}</h1>
                <p>{{ story.content.intro }}</p>
                <p class="meta">{{ formatDate(story.first_published_at) }} • {{ readTime(story.content.body) }} Min. Lesezeit</p>
              </header>
            </nuxt-link>
          </article>
        </div>

        <div class="read-more">
          <nuxt-link class="button button--ghost" :to="{ path: '/blog/'}">
            Alle Beiträge
          </nuxt-link>
        </div>

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
.hero--home {
  @include bg-pattern($home-background-color,darken($home-background-color,10%));
}

.blog {
  background-color: $background-color;

  .container {
    > header {
      text-align: center;

      hr {
        width: 160px;
      }
    }

    > .read-more {
      display: flex;
      margin: 30px 0;

      .button {
        margin: 0 auto;
      }
    }
  }

  /*article {
    border-bottom: none;
    flex-basis: 50%;
    padding: 8px;

    h1 {
      font-size: 2rem;
      text-align: center;
    }
  }

  @include breakpoint(m) {
    article {
      flex-basis: 33.33333%;

      > a {
        flex-wrap: wrap;
      }

      figure {
        flex-shrink: 1;
      }

      h1 {
        font-size: 2.4rem;
      }
    }
  }

  @include breakpoint(l) {
    .container > div.posts {
      margin: 0 -18px;
    }

    article {
      padding: 18px;

      h1 {
        font-size: 2.6rem;
      }
    }
  }*/
}
</style>
