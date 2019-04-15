<template>
  <div v-editable="author.content">

    <div class="author container">
      <figure>
        <img class="author__image" :src="resize(author.content.avatar, '150x150')" :alt="author.name">
      </figure>
      <div>
        <h1>{{author.name}}</h1>
        <p>{{author.content.about}}</p>
        <ul class="author__socials">
          <li :key="social_link._uid" v-for="social_link in author.content.socials">
            <a :href="social_link.link.cached_url" target="_blank" rel="noopener nofollow">{{social_link.name}}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="blog">
      <div class="container">
        <hr>
        <h2>Blogbeiträge von {{author.name}}</h2>
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

  </div>
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
    const authorResponse = await context.app.$storyapi.get(`cdn/stories${context.route.path}`, { version: 'draft' })
    const postsByAuthorResponse = await context.app.$storyapi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: `blog/`,
        filter_query: {
          "author": {
            "in": authorResponse.data.story.uuid
          }
        }
      })
    return { author: authorResponse.data.story, posts: postsByAuthorResponse.data.stories }
  }
}
</script>


<style lang="scss" scoped>
.author {
  text-align: center;

  figure img {
    margin: 0 auto;
  }

  @include breakpoint(m) {
    display: flex;
    justify-content: center;
    text-align: left;

    figure {
      flex-basis: 150px;
      flex-shrink: 0;
      margin: 30px 35px 0 0;
    }
  }
}

.author__image {
  border-radius: 50%;
}

.author__socials {
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    display: inline-block;

    & + li {
      margin-left: 10px;
    }
  }

  a {
    @include button();
    @include ghost-button();
    @include small-button();
  }
}

.author__posts-by {
  text-align: center;
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
