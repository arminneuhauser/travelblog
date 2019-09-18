<template>
  <div v-editable="category.content">

    <div class="category" :style="{ 'background-image': 'url(' + resize(category.content.image, '1920x1080') + ')' }">
      <div>
        <h1>{{category.name}}</h1>
        <p>{{category.content.about}}</p>
      </div>
      <a href="#" v-scroll-to="'#blog'" class="arrow-button" aria-label="Nach unten scrollen">
        <svg><use xlink:href="#down"></use></svg>
      </a>
    </div>

    <div id="blog" class="blog">
      <div class="container">
        <div class="posts">
          <article-tile :key="story.content._uid" v-for="story in stories" :story="story"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize } from '@/plugins/helper'

export default {
  head () {
    return {
      title: this.category.name + ' - Solmates',
      meta: [
        { hid: 'description', name: 'description', content: this.category.content.about },
        { hid: 'og:type', propery: 'og:type', content: 'article' },
        { hid: 'og:title', propery: 'og:title', content: this.category.name },
        { hid: 'og:description', propery: 'og:description', content: this.category.content.about },
        { hid: 'og:image', propery: 'og:image', content: 'https:' + resize(this.category.content.image, '1200x630') },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
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
    resize
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
    return { category: categoryResponse.data.story, stories: postsByCategoryResponse.data.stories }
  }
}
</script>


<style lang="scss" scoped>
.category {
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: -webkit-fill-available;
  min-height: 500px;
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

  > div {
    padding: 0 var(--site-core-padding);
    position: relative;
  }

  h1 {
    color: #fff;
    font-size: 4.2rem;
    line-height: 4.2rem;
    text-shadow: 0 0 30px rgba(0,0,0,0.2);
  }

  p {
    font-size: 1.8rem;
    color: #fff;
    text-shadow: 0 0 30px rgba(0,0,0,0.2);
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
