<template>
  <div class="container">
    <h1 class="text-center">Kategorien</h1>
    <ul class="categories">
      <li :key="category.id" v-for="category in categories">
        <nuxt-link class="category" :to="'/' + category.full_slug">
          <img class="category__image" :src="resize(category.content.image, '400x0')" :alt="category.name">
          <h2>{{category.name}}</h2>
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
      title: 'Kategorien - Travelcouple', // TODO: change to real name
      meta: [
        { hid: 'og:title', propery: 'og:title', content: 'Kategorien - Travelcouple' },
        { hid: 'og:url', property: 'og:url', content: 'https://travelcouple.netlify.com' + this.$route.fullPath }, // TODO: change to real domain
        { hid: 'twitter:title', name: 'twitter:title', content: 'Kategorien - Travelcouple' }
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
.categories {
  display: flex;
  flex-wrap: wrap;
  margin: 40px -15px 0;
  padding: 0;
  list-style-type: none;

  li {
    flex-basis: 100%;
    padding: 0 15px;
    margin-bottom: 30px;

    @include breakpoint(m) {
      flex-basis: 50%;
    }

    @include breakpoint(l) {
      flex-basis: 33%;
    }
  }
}

.category {
  display: block;
  text-align: center;

  h2 {
    font-size: 2.8rem;
    margin: 10px 0;
  }

  &:hover {
    h2 {
      text-decoration: underline;
    }
  }
}
</style>
