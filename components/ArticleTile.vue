<template>
  <article>
    <nuxt-link :to="'/' + story.full_slug">
      <figure>
        <img :src="resize(story.content.image, '750x420')">
      </figure>
      <header>
        <h1 class="title">{{ story.content.title }}</h1>
        <p class="subtitle">{{ story.content.intro }}</p>
        <p class="meta">{{ formatDate(story.first_published_at) }} • {{ readTime(story.content.body) }} Min. Lesezeit</p>
      </header>
    </nuxt-link>
  </article>
</template>

<script>
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  props: [
    'blok',
    'story'
  ],
  methods: {
    resize,
    formatDate,
    readTime
  }
}
</script>

<style lang="scss" scoped>
article {
  border-bottom: 2px solid rgba($tint,0.1);
  padding: 20px 0;

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

  header {
    flex-basis: 100%;
    flex-grow: 1;
    margin-top: 16px;
  }

  h1 {
    font-family: $fs-serif;
    font-size: 2.4rem;
    line-height: 1.1;
    margin: 0 0 10px;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.4;
  }

  .meta {
    font-size: 1.4rem;
    margin: 0;
  }

  &:last-of-type {
    border-bottom: 0;
  }

  &.compact {
    .subtitle {
      display: none;
    }
  }

  @include breakpoint(m) {
    &:not(.compact) {
      figure {
        flex-basis: 375px;
        max-width: 375px;
      }

      header {
        flex-basis: calc(100% - 375px);
        padding: 0 20px;
      }
    }
  }

  @include breakpoint(l) {
    &:not(.compact) {
      header {
        padding: 0 35px;
      }

      h1 {
        font-size: 2.8rem;
      }

      .subtitle {
        font-size: 1.7rem;
      }
    }
  }
}
</style>