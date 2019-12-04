<template>
  <div class="about__item" v-editable="blok">
    <div class="book">

      <figure class="book__cover">
        <picture>
          <source :srcset="resize(blok.book_cover, '165x0/filters:format(webp)')" type="image/webp">
          <img :src="resize(blok.book_cover, '165x0')" :alt="blok.book_title">
        </picture>
        <figure class="book__reader">
          <nuxt-link :to="'/' + blok.author.full_slug">
            <picture>
              <source :srcset="resize(blok.author.content.avatar, '70x70/filters:format(webp)')" type="image/webp">
              <img :src="resize(blok.author.content.avatar, '70x70')" :alt="blok.author.content.name">
            </picture>
          </nuxt-link>
        </figure>
      </figure>

      <h3>{{ blok.book_title }}</h3>
      <h4>{{ blok.book_author}}</h4>
      <p>{{ blok.book_summary }}</p>

    </div>
  </div>
</template>

<script>
import { resize } from '@/plugins/helper'

export default {
  props: ['blok'],
  methods: {
    resize
  }
}
</script>

<style lang="scss">
.about__item {
  .book {
    margin-bottom: 20px;

    &::after {
      content: '';
      clear: both;
    }

    h3 {
      margin: 0 0 10px;
    }

    h4 {
      font-family: $fs-sans;
      font-weight: 500;
      font-size: 1.6rem;
      margin: 0 0 10px;
    }

    p {
      margin: 0;
    }

    .book__cover {
      float: right;
      position: relative;
      max-width: 130px;
      margin: 0 0 8px 8px;

      @include breakpoint(s) {
        float: left;
        margin: 0 25px 25px 0;
        max-width: 150px;
      }
    }

    .book__reader {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(20%, 20%);

      img {
        border-radius: 100%;
        border: 3px solid #fff;

        @include breakpoint(s, max) {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
