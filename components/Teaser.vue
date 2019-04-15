<template>
  <div class="teaser" v-editable="blok">
    <div class="container">
      <div class="teaser__text">
        <h1>{{ blok.headline }}</h1>
        <figure>
          <img :src="resize(blok.avatar_image, '88x88')">
        </figure>
        <div>
          <p>{{ blok.text }}</p>
          <nuxt-link class="button" :to="'/' + blok.button_link.cached_url">
            {{ blok.button_text }}
          </nuxt-link>
        </div>
      </div>
      <figure class="teaser__figure">
        <img :src="resize(blok.image, '520x390')">
      </figure>
    </div>
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
.teaser {
  border-bottom: 1px solid rgba($tint, 0.15);
  padding: 20px 0 40px;

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .teaser__text {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    figure {
      flex-basis: 66px;

      img {
        border-radius: 100%;
      }

      + div {
        flex-basis: calc(100% - 66px);
        padding-left: 20px;
      }
    }
  }

  .teaser__figure {
    position: relative;
    width: calc(100% + 30px);
    max-width: 520px;
    margin: 0 -15px;
    //left: -20px;

    img {
      position: relative;
      margin: 0 auto;
    }

    /*&::before {
      @include bg-pattern;

      content: '';
      position: absolute;
      bottom: 40px;
      right: -40px;
      width: 100%;
      height: calc(100% - 20px);
      opacity: 0.8;
    }*/
  }

  h1 {
    font-family: $fs-serif;
    font-size: 4.2rem;
    line-height: 4.2rem;
    margin: 0 0 20px;
    opacity: 1;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  @include breakpoint(m) {
    .container {
      flex-wrap: nowrap;
    }

    .teaser__text {
      figure {
        flex-basis: 88px;

        + div {
          flex-basis: calc(100% - 88px);
        }
      }
    }

    .teaser__figure {
      position: static;
      flex-basis: 50%;
      flex-shrink: 0;
      margin: 0 0 0 35px;
      width: auto;

      /*&::before {
        top: -170px;
        left: calc(50% + 40px);
        bottom: auto;
        right: auto;
        width: calc(50vw - 40px);
        height: calc(90% + 150px);
      }*/
    }
  }

  @include breakpoint(l) {
    padding-bottom: 50px;

    .teaser__text {
      margin-left: 40px;
    }

    .teaser__figure {
      margin-left: 40px;
    }

    h1 {
      font-size: 5rem;
      line-height: 5.4rem;
    }

    p {
      font-size: 2rem;
    }
  }

  @include breakpoint(xl) {
    .teaser__text {
      margin-left: 70px;
    }

    .teaser__figure {
      margin-left: 70px;

      /*&::before {
        left: calc(50% + 160px);
        width: calc(50vw - 160px);
      }*/
    }

    h1 {
      font-size: 5.6rem;
      line-height: 6rem;
    }
  }
}
</style>
