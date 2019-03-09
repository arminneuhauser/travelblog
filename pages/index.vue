<template>
  <div class="hero hero--home">
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    <section class="blog">
      <div class="container">
        <article :key="story.content._uid" v-for="story in posts.stories">
          <nuxt-link :to="'/' + story.full_slug">
            <figure>
              <img :src="resize(story.content.image, '375x228')">
            </figure>
            <div>
              <h1>{{ story.content.title }}</h1>
              <p>{{ story.content.intro }}</p>
              <p class="meta">{{ formatDate(story.first_published_at) }}</p>
            </div>
          </nuxt-link>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { isEditMode, resize, formatDate } from '@/plugins/helper'

export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize,
    formatDate
  },
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

<style lang="scss">
.blog {
  background-color: #fff;
  padding-bottom: 50px;

  article {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 30px 0;

    > a {
      display: flex;
      flex-wrap: wrap;

      &:hover {
        h1 {
          text-decoration: underline;
        }
      }
    }

    figure {
      flex-basis: 100%;
    }

    h1 {
      color: $cta;
      font-family: $fs-serif;
      font-size: 2.6rem;
      line-height: 3rem;
      margin: 10px 0;
    }

    .meta {
      margin: 0;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  @include breakpoint(m) {
    article {
      > a {
        flex-wrap: nowrap;
      }

      figure {
        flex-basis: 33%;
        flex-shrink: 0;
        margin-right: 20px;
        max-width: 375px;
      }
    }
  }

  @include breakpoint(l) {
    article {
      figure {
        margin-right: 35px;
      }
    }
  }
}
</style>
