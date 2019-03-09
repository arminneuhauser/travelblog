<template>
  <article class="post container" v-editable="story.content">
    <h1>{{story.content.title}}</h1>
    <p>{{ story.content.intro }}</p>
    <p class="meta">{{ formatDate(story.first_published_at) }}</p>
    <img class="post__image" :src="resize(story.content.image, '700x300')" :alt="story.content.image_alt">
    <div class="post__body" v-html="body"></div>
  </article>
</template>

<script>
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { isEditMode, resize, formatDate } from '@/plugins/helper'

export default {
  data () {
    return { story: { content: { body: '' } } }
  },
  computed: {
    body () {
      return marked(this.story.content.body)
    }
  },
  mixins: [storyblokLivePreview],
  mounted () {
    isEditMode(this)
  },
  methods: {
    resize,
    formatDate
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    let endpoint = `cdn/stories/${context.route.path}`

    return context.app.$storyapi.get(endpoint, {
      version: version,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang="scss">
.post {
  p, ul, ol, table {
    font-size: 1.8rem;
    line-height: 1.6;
    margin-bottom: 30px;

    @include breakpoint(l) {
      font-size: 1.9rem;
    }
  }

  hr {
    border-color: rgba($tint,0.25);
    border-width: 1px 0 0 0;
    margin: 30px 0;
  }

  .post__image {
    margin-bottom: 50px;
  }

  .post__body {
    max-width: 700px;
    margin: 0 auto 100px;

    p:first-of-type {
      &::first-letter {
        color: $tint;
        font-family: $fs-serif;
        font-size: 6rem;
        font-weight: 400;
        line-height: 1;
        float: left;
        margin: -5px 3px 0 0;
      }
    }
  }
}
</style>
