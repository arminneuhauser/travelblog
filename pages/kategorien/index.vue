<template>
  <div class="container">
    <h1 class="text-center">Kategorien</h1>
    <hr>
    <ul class="categories">
      <li :key="category.id" v-for="category in categories">
        <nuxt-link class="category" :to="'/' + category.full_slug">
          <figure>
            <img class="category__image" :src="resize(category.content.image, '400x300')" :alt="category.name">
            <figcaption>
              <h1>{{category.name}}</h1>
            </figcaption>
          </figure>
          <p>{{category.content.about}}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize } from '@/plugins/helper'

export default {
  head () {
    return {
      title: 'Kategorien - Solmates',
      meta: [
        { hid: 'og:title', propery: 'og:title', content: 'Kategorien - Solmates' },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Kategorien - Solmates' }
      ]
    }
  },
  methods: {
    resize
  },
  async asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    const { data } = await context.app.$storyapi.get(`cdn/stories/`, {
      version: version,
      starts_with: `${context.route.path.substr(1)}`
    })
    return { categories: data.stories }
  }
}
</script>

<style lang="scss" scoped>
hr {
  width: 150px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  margin: 40px -10px;
  padding: 0;
  list-style-type: none;

  li {
    flex-basis: 100%;
    padding: 0 10px;
    margin-bottom: 20px;

    @include breakpoint(m) {
      flex-basis: 50%;
    }

    @include breakpoint(l) {
      flex-basis: 33.33333%;
    }
  }
}

.category {
  display: block;

  figure {
    position: relative;
    margin-bottom: 10px;

    img {
      width: 100%;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($tint,0.4);
      transition: background-color .2s ease-out;
    }
  }

  h1 {
    color: #fff;
    margin: 0;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    text-shadow: 0 2px 20px rgba($tint,0.6);
    hyphens: auto;
    word-break: break-word;
    font-size: 2.8rem;

    @include breakpoint(m) {
      font-size: 3rem;
    }

    @include breakpoint(xl) {
      font-size: 3.4rem;
    }
  }

  &:hover {
    figure {
      &::before {
        background-color: rgba($tint,0.5);
      }
    }

    h1 {
      text-decoration: underline;
    }
  }
}
</style>
