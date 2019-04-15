<template>
  <article v-editable="category.content">

    <div class="category" :style="{ 'background-image': 'url(' + resize(category.content.image, '1920x1080') + ')' }">
      <div>
        <h1>{{category.name}}</h1>
        <p>{{category.content.about}}</p>
      </div>
      <a href="#" v-scroll-to="'#blog'" class="arrow-button">
        <svg><use xlink:href="#down"></use></svg>
      </a>
    </div>

    <div id="blog" class="blog">
      <div class="container">
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
    </div>

  </article>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
  head () {
    return {
      title: this.category.name + ' - Travelcouple', // TODO: change to real name
      meta: [
        { hid: 'description', name: 'description', content: this.category.content.about },
        { hid: 'og:type', propery: 'og:type', content: 'article' },
        { hid: 'og:title', propery: 'og:title', content: this.category.name },
        { hid: 'og:description', propery: 'og:description', content: this.category.content.about },
        { hid: 'og:image', propery: 'og:image', content: 'https:' + resize(this.category.content.image, '1200x630') },
        { hid: 'og:url', property: 'og:url', content: 'https://travelcouple.netlify.com' + this.$route.fullPath }, // TODO: change to real domain
        { hid: 'twitter:title', name: 'twitter:title', content: this.category.name },
        { hid: 'twitter:description', name: 'twitter:description', content: this.category.content.about },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https:' + resize(this.category.content.image, '1200x630') }
      ]
    }
  },
  data () {
    return { story: { content: {} } }
  },
  layout: 'elevated',
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
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 80vh;
  padding-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2) 200px)
  }

  > * {
    position: relative;
  }

  h1 {
    color: #fff;
    font-size: 4.2rem;
    line-height: 4.2rem;
    text-shadow: 0 0 30px rgba(0,0,0,0.1);
  }

  p {
    color: #fff;
    text-shadow: 0 0 30px rgba(0,0,0,0.1);
  }

  .arrow-button {
    position: absolute;
    bottom: 40px;
  }

  @include breakpoint(m) {
    padding-top: 150px;
    margin-bottom: 20px;
  }

  @include breakpoint(l) {
    h1 {
      font-size: 5rem;
      line-height: 5.4rem;
    }

    p {
      font-size: 2rem;
    }
  }

  @include breakpoint(xl) {
    h1 {
      font-size: 5.6rem;
      line-height: 6rem;
    }
  }
}

/*.category__image {
  border-radius: 50%;
  border: 1px solid #d8d8d8;
}*/
</style>
