<template>
  <article class="container" v-editable="category.content">

    <div class="category">
      <h1>{{category.name}}</h1>
      <img class="category__image" :src="resize(category.content.image, '100x100')" :alt="category.name">
      <p>{{category.content.about}}</p>
    </div>

    <div class="blog">
      <article :key="post.id" v-for="post in posts">
        <nuxt-link :to="'/' + post.full_slug">
          <figure>
            <img :src="resize(post.content.image, '375x228')">
          </figure>
          <div>
            <h1>{{ post.content.title }}</h1>
            <p>{{ post.content.intro }}</p>
            <p class="meta">{{ formatDate(post.first_published_at) }} • {{ readTime(post.content.body) }} Min. Lesezeit</p>
          </div>
        </nuxt-link>
      </article>
    </div>

  </article>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  methods: {
    resize,
    formatDate,
    readTime
  },
  mixins: [storyblokLivePreview],
  async asyncData (context) {
    // load the content-entry at the current path - will be something like: '/posts/first-post'
    const categoryResponse = await context.app.$storyapi.get(`cdn/stories${context.route.path}`, { version: 'draft' })
    const postsByCategoryResponse = await context.app.$storyapi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: `blog/`,
        filter_query: {
          "categories": {
            "in_array": categoryResponse.data.story.uuid
          }
        }
      })
    return { category: categoryResponse.data.story, posts: postsByCategoryResponse.data.stories }
  }
}
</script>


<style lang="scss" scoped>
.category {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 0px;
}

.category__image {
  border-radius: 50%;
  border: 1px solid #d8d8d8;
}

.posts {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.post {
  color: inherit;
  text-decoration: none;
  display: block;
  margin-bottom: 30px;
  transition: transform 500ms ease, box-shadow 500ms ease;
  border: 1px solid #ddd;
  &:hover, &:focus {
    transform: translateY(-1px);
    box-shadow: 0px 1px 10px 0px #ccc;
  }
}

.post__inner {
  padding: 20px;
}

.post__headline {
  display: block;
  font-size: 1.5em;
  -webkit-margin-before: 0.83em;
  -webkit-margin-after: 0.83em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
</style>
