<template>
  <div class="container">
    <h1 class="text-center">Autoren</h1>
    <ul class="authors">
      <li :key="author.id" v-for="author in authors">
        <nuxt-link class="author" :to="'/' + author.full_slug">
          <img class="author__image" :src="resize(author.content.avatar, '150x150')" :alt="author.name">
          <h2>{{author.name}}</h2>
          <p>{{author.content.about}}</p>
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
    return { authors: data.stories }
  }
}
</script>

<style lang="scss" scoped>
.authors {
  display: flex;
  flex-wrap: wrap;
  margin: 40px -15px 20px;
  padding: 0;
  list-style-type: none;

  li {
    flex-basis: 100%;
    padding: 0 15px;
    margin-bottom: 30px;

    a {
      margin: 0 auto;
      max-width: 350px;
    }

    @include breakpoint(l) {
      flex-basis: 33%;
    }
  }
}

.author {
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

.author__image {
  border-radius: 100%;
}
</style>
