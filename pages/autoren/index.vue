<template>
  <div class="container">
    <h1 class="text-center">Autoren</h1>
    <ul class="authors">
      <li :key="author.id" v-for="author in authors">
        <nuxt-link class="author" :to="'/' + author.full_slug">
          <img class="author__image" :src="resize(author.content.avatar, '300x300')" :alt="author.name">
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
  head() {
    return {
      bodyAttrs: {
        class: 'page-authors',
      },
    };
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
    return { authors: data.stories }
  }
}
</script>

<style lang="scss" scoped>
.authors {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  padding: 10px 0;
  list-style-type: none;

  li {
    display: flex;
    flex-basis: 100%;
    padding: 0 15px;
    margin-bottom: 30px;

    a {
      background: #fff;
      border-radius: 4px;
      border: 1px solid rgba($tint,0.1);
      box-shadow: 0 2px 8px rgba($tint,.05);
      margin: 0 auto;
      max-width: 350px;
      padding: 20px;
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
    color: $cta;
    font-size: 2.8rem;
    //font-style: italic;
    //font-weight: normal;
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
  width: 150px;
  height: 150px;
}
</style>
