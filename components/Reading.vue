<template>
  <div class="about" v-editable="blok">
    <div class="container">
      <header>
        <nav>
          <h3>
            <nuxt-link :to="'/ueber-uns'" :title="blok.link_text">
              <span class="show-on-s">{{ blok.headline }}</span>
              <span class="hide-on-s">{{ blok.headline_long }}</span>
            </nuxt-link>
          </h3>
          <nuxt-link :to="'/ueber-uns'" class="link link--right" :title="blok.link_text">{{ blok.link_text }}</nuxt-link>
        </nav>
      </header>
      <div class="about__row">
        <div class="about__item" v-for="author in blok.authors">
          <div class="book">

            <figure class="book__cover">
              <picture>
                <source :srcset="resize(author.content.reading[author.content.reading.length - 1].book_cover, '165x0/filters:format(webp)')" type="image/webp">
                <img :src="resize(author.content.reading[author.content.reading.length - 1].book_cover, '165x0')" :alt="author.content.reading[author.content.reading.length - 1].book_title">
              </picture>
              <figure class="book__reader">
                <nuxt-link :to="'/' + author.full_slug" :title="author.content.name">
                  <picture>
                    <source :srcset="resize(author.content.avatar, '70x70/filters:format(webp)')" type="image/webp">
                    <img :src="resize(author.content.avatar, '70x70')" :alt="author.content.name">
                  </picture>
                </nuxt-link>
              </figure>
            </figure>

            <h3>{{ author.content.reading[author.content.reading.length - 1].book_title }}</h3>
            <h4>{{ author.content.reading[author.content.reading.length - 1].book_author}}</h4>
            <p>{{ author.content.reading[author.content.reading.length - 1].book_summary }}</p>

          </div>
        </div>
      </div>
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
.about {
  background: #F2F6FA;
  padding: 30px 0 50px;

  .container {
    max-width: 1196px;
  }

  header {
    text-align: center;
    margin-bottom: 30px;

    > nav {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      border-bottom: 2px solid rgba(0,0,0,0.1);
      padding: 10px 0 5px;

      @include breakpoint(l) {
        padding: 20px 0 5px;
        margin-bottom: 10px;
      }

      > h3 {
        margin: 0;
      }

      > a {
        margin-left: auto;
      }
    }
  }

  .about__row {
    display: flex;
    flex-wrap: wrap;

    @include breakpoint(m) {
      margin: 0 -15px;
    }
  }

  .about__item {
    flex-basis: 100%;

    @include breakpoint(m) {
      flex-basis: 50%;
      padding: 0 15px;
    }
  }
}

.about__item {
  .book {
    margin-bottom: 20px;

    &::after {
      content: '';
      clear: both;
    }

    h3 {
      font-size: 2.2rem;
      margin: 0 0 10px;

      @include breakpoint(l) {
        font-size: 2.4rem;
      }
    }

    h4 {
      font-family: $fs-sans;
      font-weight: 500;
      font-size: 1.6rem;
      margin: 0 0 10px;

      @include breakpoint(l) {
        font-size: 1.7rem;
      }
    }

    p {
      font-size: 1.5rem;
      margin: 0;

      @include breakpoint(l) {
        font-size: 1.6rem;
      }
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
