<template>
  <div class="fullscreen-teaser" v-editable="blok">
    <style>
      .fullscreen-teaser {
        background-image: url( {{resize(blok.image, '600x667')}} );
      }
      @media (min-width: 600px) {
        .fullscreen-teaser {
          background-image: url( {{resize(blok.image, '1600x725')}} );
        }
      }
    </style>
    <div class="fullscreen-teaser__text">
      <h1>
        <nuxt-link :to="'/' + blok.button_link.cached_url">
          {{ blok.headline }}
        </nuxt-link>
      </h1>
    </div>
    <a href="#" v-scroll-to="'#blog'" class="arrow-button">
      <svg><use xlink:href="#down"></use></svg>
    </a>
  </div>
</template>

<script>
import { isEditMode, resize, formatDate } from '@/plugins/helper'

export default {
  props: ['blok'],
  methods: {
    resize
  }
}
</script>

<style lang="scss">
.fullscreen-teaser {
  background: #000 no-repeat center center / cover;
  height: 100vh;
  padding: 90px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .fullscreen-teaser__text {
    color: #fff;
    text-align: center;
    width: 70%;
  }

  h1 {
    font-size: 4.2rem;
    line-height: 1;
    margin: 0 0 20px;

    a {
      color: #fff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .arrow-button {
    position: absolute;
    bottom: 40px;
  }

  @include breakpoint(l) {
    h1 {
      font-size: 6rem;
      margin-bottom: 30px;
    }
  }

  @include breakpoint(xl) {
    h1 {
      font-size: 7.6rem;
      margin-bottom: 50px;
    }
  }
}
</style>
