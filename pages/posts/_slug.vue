<template>
  <article class="post container" v-editable="story.content">
    <div class="post__header">
      <h1>{{story.content.title}}</h1>
      <p>{{ story.content.intro }}</p>
      <p class="meta">{{ formatDate(story.first_published_at) }} • {{ readTime(story.content.body) }} Minuten Lesezeit</p>
    </div>
    <figure class="post__image">
      <img :src="resize(story.content.image, '1024x0')" :alt="story.content.image_alt">
    </figure>
    <div class="post__body" v-html="body"></div>
    <progress-bar/>
  </article>
</template>

<script>
import Vue from 'vue'
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'
import ProgressBar from '~/components/ProgressBar.vue'

export default {
  data () {
    return { story: { content: { body: '' } } }
  },
  components: {
    ProgressBar
  },
  computed: {
    body () {
      return marked(this.story.content.body)
    }
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize,
    formatDate,
    readTime
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi.get(`cdn/stories${context.route.path}`, {
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
  &::before {
    content: '';
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgba($tint,.1);

    @include breakpoint(m) {
      top: 150px;
    }
  }

  .post__image {
    margin: 0 -26px 50px;

    @include breakpoint(m) {
      margin: 0 -30px 50px;
    }

    img {
      margin: 0 auto;
    }
  }

  .post__header {
    max-width: 700px;
    margin: 0 auto;
    padding: 30px 0 20px 0;
    text-align: center;

    h1 {
      font-size: 3.6rem;

      @include breakpoint(l) {
        font-size: 4.6rem;
      }
    }

    p {
      margin-bottom: 30px;
      font-size: 1.8rem;
      line-height: 1.6;

      @include breakpoint(l) {
        font-size: 2rem;
      }

      &.meta {
        font-size: 1.5rem;

        @include breakpoint(l) {
          font-size: 1.6rem;
        }
      }
    }
  }

  .post__body {
    max-width: 700px;
    margin: 0 auto 100px;

    p, ul, ol, table {
      font-family: $fs-serif;
      font-size: 2rem;
      line-height: 1.6;
      margin-bottom: 30px;

      @include breakpoint(l) {
        font-size: 2.2rem;
      }
    }

    > p:first-of-type {
      &::first-letter {
        color: $tint;
        font-family: $fs-serif;
        font-size: 7.2rem;
        font-weight: 400;
        line-height: 1;
        float: left;
        margin: -7px 3px -7px 0;

        @include breakpoint(l) {
          font-size: 7.6rem;
        }
      }
    }

    hr {
      border-color: rgba($tint,0.25);
      border-width: 1px 0 0 0;
      margin: 30px 0;
    }

    blockquote {
      margin: 50px 0;
      padding: 0 15px;
      position: relative;

      > * {
        position: relative;
      }

      p {
        font-size: 2.8rem;
        line-height: 1.2;
        margin: 0;
      }

      cite {
        font-family: $fs-sans;
        font-size: 1.6rem;

        &::before {
          content: '–';
          margin: 0 5px;
        }
      }

      &::before, &::after {
        content: '';
        position: absolute;
        top: -26px;
        bottom: -26px;
      }

      &::before {
        right: -26px;
        left: -26px;
        background-color: rgba(#fff,0.8);
      }

      &::after {
        right: -26px;
        left: -26px;
        width: 5px;
        background-color: rgba($tint,0.5);
      }

      @include breakpoint(l) {
        p {
          font-size: 3.6rem;
        }

        cite {
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>
