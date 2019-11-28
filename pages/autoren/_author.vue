<template>
  <div v-editable="author.content" :style="cssVars">
    <div class="author">
      <div class="container">
        <header>
          <nuxt-link class="link link--left" :to="{ path: '/autoren'}">alle Autoren</nuxt-link>
        </header>
        <div class="author__content">
          <figure>
            <img class="author__image" :src="resize(author.content.avatar, '300x300')" :alt="author.name">
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
  head() {
    return {
      title: this.author.name + ' - Solmates',
      meta: [
        { hid: 'description', name: 'description', content: 'Lies die Blog-Beiträge von ' + this.author.name + ' - ' + this.author.content.about },
        { hid: 'og:type', propery: 'og:type', content: 'profile' },
        { hid: 'profile:username', propery: 'profile:username', content: this.author.name },
        { hid: 'profile:first_name', propery: 'profile:first_name', content: this.author.name },
        { hid: 'og:title', propery: 'og:title', content: this.author.name },
        { hid: 'og:description', propery: 'og:description', content: this.author.content.about },
        { hid: 'og:image', propery: 'og:image', content: 'https:' + resize(this.author.content.avatar, '1200x1200') },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
        { hid: 'twitter:title', name: 'twitter:title', content: this.author.name },
        { hid: 'twitter:description', name: 'twitter:description', content: this.author.content.about },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https:' + resize(this.author.content.avatar, '1200x1200') }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        "mainEntityOfPage": "https://www.solmates.at" + this.$route.fullPath,
        "name": this.author.name,
        "description": this.author.content.about,
        "image": {
            "@type": "ImageObject",
            "url": "https:" + resize(this.author.content.avatar, '1200x1200'),
            "width": "1200",
            "height": "1200"
        }
      }), type: 'application/ld+json' }],
      link: [
        { rel: 'canonical', href: 'https://www.solmates.at' + this.$route.fullPath },
      ],
      bodyAttrs: {
        class: 'page-author',
        style: '--site-header-tint: ' + this.author.content.textcolor
      },
    };
  },
  computed: {
    cssVars() {
      return {
        '--background': this.author.content.background,
        '--text-color': this.author.content.textcolor
      }
    }
  },
  methods: {
    resize
  },
  mixins: [storyblokLivePreview],
  async asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    // load the content-entry at the current path - will be something like: '/posts/first-post'
    const authorResponse = await context.app.$storyapi.get(`cdn/stories${context.route.path}`, { version: 'draft' })
    const postsByAuthorResponse = await context.app.$storyapi.get(`cdn/stories`, {
      version: version,
      per_page: 10,
      page: context.query.page,
      starts_with: `blog/`,
      sort_by: "first_published_at:desc",
      cv: context.store.state.cacheVersion,
      filter_query: {
        "author": {
          "in": authorResponse.data.story.uuid
        }
      }
    })
    return { author: authorResponse.data.story, stories: postsByAuthorResponse.data.stories }
  }
}
</script>

<style lang="scss" scoped>
.author {
  background: var(--background);
  border-bottom: 1px solid rgba($tint,0.15);
  color: var(--text-color);
  padding: 90px 0 30px;
  text-align: center;

  @include breakpoint(l) {
    padding-top: 150px;
  }

  header {
    display: flex;
    margin: 20px 0;

    a {
      color: var(--text-color);
    }
  }

  figure {
    margin-bottom: 20px;

    img {
      margin: 0 auto;
    }
  }

  h1 {
    //font-style: italic;
    //font-weight: normal;
    margin-top: 0;
  }

  p {
    color: var(--text-color);
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
  width: 150px;
  height: 150px;
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
    color: var(--text-color);
    border-color: var(--text-color);

    &:hover {
      border-color: var(--text-color);
    }
  }
}
</style>
