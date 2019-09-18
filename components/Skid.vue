<template>
  <div class="skid">
    <article :key="story.content._uid" v-for="story in stories">
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
.skid {
  display: flex;
  padding: 0 var(--site-core-padding) 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;

  article {
    display: flex;
    flex-basis: 66vw;
    flex-shrink: 0;
    margin-right: 20px;
    max-width: 375px;
    position: relative;
    scroll-snap-align: start;

    &:first-child {
      margin-left: auto;
    }

    &:last-child {
      margin-right: auto;

      &::after {
        content: "";
        display: block;
        position: absolute;
        right: calc(var(--site-core-padding) * -1);
        width: var(--site-core-padding);
        height: 1px;
      }
    }

    @include breakpoint(m) {
      flex-basis: 36vw;
    }

    @include breakpoint(l) {
      flex-basis: 25%;
      margin-right: 0;
      padding: 0 15px;

      &:last-of-type::after {
        display: none;
      }
    }

    a {
      flex-basis: 100%;
    }

    h1 {
      font-size: 2.4rem;
      margin: 10px 0;
      text-align: center;
    }

    &:hover {
      h1 {
        text-decoration: underline;
      }
    }

    figure {
      @include ratio-container(750/500);
    }
  }
}

</style>
