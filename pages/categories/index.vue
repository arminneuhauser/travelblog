<template>
  <div class="container">
    <h1>Kategorien</h1>
    <ul class="categories">
      <li :key="category.id" v-for="category in categories">
        <nuxt-link class="category" :to="'/' + category.full_slug">
          <img class="category__image" :src="resize(category.content.image, '60x60')" :alt="category.name">
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

<style scoped>
.categories {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.category {
  color: inherit;
  text-decoration: none;
  display: block;
  margin-bottom: 30px;
  transition: transform 500ms ease, box-shadow 500ms ease;
  border: 1px solid #ddd;
  padding: 20px;
  &:hover, &:focus {
    transform: translateY(-1px);
    box-shadow: 0px 1px 10px 0px #ccc;
  }
}

.category__image {
  display: inline;
  border-radius: 50%;
  border: 1px solid #d8d8d8;
}
</style>
