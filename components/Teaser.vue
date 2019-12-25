<template>
  <div v-editable="blok" class="hero hero--home">
    <div class="teaser">
      <div class="container">
        <div class="teaser__text">
          <h1><strong>Solmates </strong>{{ blok.headline }}</h1>
          <figure>
            <picture>
              <source :srcset="resize(blok.avatar_image, '140x140/filters:format(webp)')" type="image/webp">
              <img :src="resize(blok.avatar_image, '140x140')" alt="Armin &amp; Miriam sind Solmates" title="Armin &amp; Miriam sind Solmates">
            </picture>
          </figure>
          <div>
            <p>{{ blok.text }}</p>
            <p class="location">
              <svg><use xlink:href="#location"></use></svg>
              <a href="#map">{{ blok.location }}</a>
            </p>
          </div>
        </div>
        <figure class="teaser__figure">
          <picture>
            <source :srcset="resize(blok.image, '520x390/filters:format(webp)')" type="image/webp" media="(min-width: 768px)">
            <source :srcset="resize(blok.image, '520x390')" media="(min-width: 768px)">
            <source :srcset="resize(blok.image, '750x422/filters:format(webp)')" type="image/webp">
            <img
            :src="resize(blok.image, '750x422')"
            :alt="'Solmates - ' + blok.headline"
            :title="'Solmates - ' + blok.headline">
          </picture>
        </figure>
      </div>
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
.hero--home {
  padding-top: 90px;

  @include breakpoint(l) {
    padding-top: 150px;
  }
}

.teaser {
  border-bottom: 1px solid rgba($tint, 0.15);
  padding: 0 0 10px;

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .teaser__text {
    flex-grow: 1;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    margin: 20px 0 15px 0;
    order: 2;

    figure {
      flex-basis: 70px;
      max-width: 70px;

      img {
        border-radius: 100%;
      }

      + div {
        flex-basis: calc(100% - 70px);
        max-width: calc(100% - 70px);
        padding-left: 20px;
      }
    }
  }

  .teaser__figure {
    margin: 0 calc(var(--site-core-padding) * -1);
    order: 1;

    img {
      margin: 0 auto;
    }
  }

  h1 {
    flex-basis: 100%;
    font-family: $fs-serif;
    font-size: 3.4rem;
    line-height: 1;
    margin: 0 0 16px;
    opacity: 1;

    > strong {
      display: none;
    }
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .location {
    display: flex;
    align-items: center;
    font-weight: 500;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      fill: $tint;
      margin-right: 8px;
    }
  }

  @include breakpoint(m) {
    padding-bottom: 30px;

    .container {
      flex-wrap: nowrap;
    }

    .teaser__text {
      order: 1;

      figure {
        flex-basis: 90px;
        max-width: 90px;

        + div {
          flex-basis: calc(100% - 90px);
          max-width: calc(100% - 90px);
        }
      }
    }

    .teaser__figure {
      order: 2;
      position: static;
      flex-basis: 50%;
      flex-shrink: 0;
      margin: 0 0 0 35px;
      max-width: 520px;
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
      font-size: 4.2rem;
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
    }
  }
}
</style>
