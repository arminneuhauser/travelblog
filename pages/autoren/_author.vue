<template>
  <div class="hero hero--author" v-editable="author.content">
    <div class="author">
      <div class="container">
        <header>
          <nuxt-link class="link link--left" :to="{ path: '/autoren/'}">alle Autoren</nuxt-link>
        </header>
        <div class="author__content">
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
      </div>
    </div>

    <div class="blog">
      <div class="container">
        <header>
          <h3>Blogbeiträge von {{author.name}}</h3>
          <hr>
        </header>
        <div class="posts">
          <article :key="post.id" v-for="post in posts">
            <nuxt-link :to="'/' + post.full_slug">
              <figure>
                <img :src="resize(post.content.image, '375x228')">
              </figure>
              <header>
                <h1>{{ post.content.title }}</h1>
                <p>{{ post.content.intro }}</p>
                <p class="meta">{{ formatDate(post.first_published_at) }} • {{ readTime(post.content.body) }} Min. Lesezeit</p>
              </header>
            </nuxt-link>
          </article>
        </div>
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
.hero--author {
  background: $home-background-color;
}

.author {
  border-bottom: 1px solid rgba($tint,0.15);
  margin-top: 20px;
  padding-bottom: 30px;
  text-align: center;

  header {
    display: flex;
    margin-bottom: 20px;
  }

  figure {
    margin-bottom: 20px;

    img {
      margin: 0 auto;
    }
  }

  h1 {
    margin-top: 0;
  }

  @include breakpoint(m) {
    text-align: left;
    padding-bottom: 50px;

    &__content {
      display: flex;
      justify-content: center;
    }

    figure {
      flex-basis: 150px;
      flex-shrink: 0;
      margin-right: 35px;
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
    margin-bottom: 10px;

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
</style>
