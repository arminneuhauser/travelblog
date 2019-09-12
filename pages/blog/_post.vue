<template>
  <div>
    <article class="post" v-editable="story.content">
      <div class="container">
        <div class="post__header">
          <div>
            <h3>
              <nuxt-link :key="category.id" v-for="category in categories" :to="'/' + category.full_slug">
                <span>{{ category.content.name }}</span>
              </nuxt-link>
            </h3>
            <h1>{{ post.content.title }}</h1>
            <p>{{ post.content.intro }}</p>
            <div class="meta">
              <figure v-if="author">
                <nuxt-link :to="'/' + author.full_slug">
                  <img class="author" :src="resize(author.content.avatar, '60x60')" :alt="author.content.name">
                </nuxt-link>
              </figure>
              <div>
                <h2 v-if="author">Geschrieben von <nuxt-link :to="'/' + author.full_slug">{{ author.content.name }}</nuxt-link></h2>
                <p>{{ formatDate(post.first_published_at, 'DD. MMMM YYYY') }} • {{ readTime(post.content.body) }} Min. Lesezeit</p>
              </div>
            </div>
          </div>
          <figure class="post__image">
            <img :src="resize(post.content.image, '860x0')">
            <!--<img
              :src="resize(post.content.image, '300x0')"
              :srcset="resize(post.content.image, '375x300') + ' 300w, ' +
              resize(post.content.image, '638x0') + ' 600w'">-->
          </figure>
        </div>

        <div class="post__body">
          <div v-html="body"></div>
          <article-tool :title="post.content.title"/>
        </div>
      </div>
    </article>

    <section class="related" v-if="related.length">
      <div class="container">
        <h2>Ähnliche Beiträge</h2>
      </div>
      <div class="skid">
        <article :key="story.content._uid" v-for="story in related">
          <nuxt-link :to="'/' + story.full_slug">
            <figure>
              <img :src="resize(story.content.image, '375x228')">
            </figure>
            <h1>{{ story.content.title }}</h1>
          </nuxt-link>
        </article>
      </div>
    </section>

    <progress-bar/>

  </div>
</template>

<script>
import Vue from 'vue'
import SiteHeader from '~/components/SiteHeader.vue'
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { markdown, resize, formatDate, readTime } from '@/plugins/helper'
import ProgressBar from '~/components/ProgressBar.vue'
import ArticleTool from '~/components/ArticleTool.vue'
import mediumZoom from 'medium-zoom'

const initAfterMount = () => {
  mediumZoom('.post img:not(.author):not(.medium-zoom-image)')
}

export default {
  head () {
    return {
      title: this.post.content.title + ' - Solmates',
      meta: [
        { hid: 'description', name: 'description', content: this.post.content.intro },
        { hid: 'og:type', propery: 'og:type', content: 'article' },
        { hid: 'og:title', propery: 'og:title', content: this.post.content.title },
        { hid: 'og:description', propery: 'og:description', content: this.post.content.intro },
        { hid: 'og:image', propery: 'og:image', content: 'https:' + resize(this.post.content.image, '1200x630') },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
        { hid: 'twitter:title', name: 'twitter:title', content: this.post.content.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.post.content.intro },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https:' + resize(this.post.content.image, '1200x630') }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": "https://www.solmates.at" + this.$route.fullPath,
        "headline": this.post.content.title,
        "datePublished": this.post.first_published_at,
        "dateModified": this.post.published_at,
        "description": this.post.content.intro,
        "author": {
            "@type": "Person",
            "name": this.author ? this.author.content.name : "Solmates"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Solmates",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.solmates.at/solmates-logo.png",
                "width": "200",
                "height": "200"
            }
        },
        "image": {
            "@type": "ImageObject",
            "url": 'https:' + resize(this.post.content.image, '1200x630'),
            "width": "1200",
            "height": "630"
        }
      }), type: 'application/ld+json' }]
    }
  },
  data () {
    return {
      story: {
        content: { body: '' }
      }
    }
  },
  components: {
    SiteHeader,
    ProgressBar,
    ArticleTool
  },
  computed: {
    body () {
      return markdown(this.post.content.body, '860x0')
    }
  },
  mounted: function() {
    // this will be called when any component is mounted!
    initAfterMount()
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize,
    formatDate,
    readTime
  },
  async asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    const { data } = await context.app.$storyapi.get(`cdn/stories${context.route.path}`, {
      version: version,
      cv: context.store.state.cacheVersion,
      resolve_relations: "author,categories,related_posts"
    })

    return {
      post: data.story,
      categories: data.story.content.categories,
      author: data.story.content.author,
      related: data.story.content.related_posts
    };
  }
}
</script>

<style lang="scss">
.post {
  .post__image {
    @include breakpoint(m) {
      flex-basis: 50%;
      margin: 0 0 30px;
    }

    img {
      margin: 0 auto;
    }
  }

  .post__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 30px auto;

    @include breakpoint(m) {
        margin: 0 auto 30px auto;
    }

    > div {
      @include breakpoint(m) {
        flex-basis: 50%;
        padding: 0 30px;
        max-width: 510px;
      }

      h3 {
        font-family: $fs-sans;
        font-weight: 500;
        font-size: 1.6rem;
        text-transform: uppercase;
        margin: 0 0 10px;

        a {
          color: $cta;

          &:hover span {
            text-decoration: underline;
          }

          &::after {
            content: ', ';
          }

          &:last-child::after {
            display: none;
          }
        }
      }

      h1 {
        margin: 0 0 15px;
      }

      > p {
        margin-bottom: 30px;
        font-size: 1.8rem;
        line-height: 1.4;

        @include breakpoint(l) {
          font-size: 2rem;
        }
      }
    }
  }

  .meta {
    margin: 40px 0;

    a:hover {
      text-decoration: underline;
    }
  }

  .post__body {
    max-width: 700px;
    margin: 0 auto 100px;
    position: relative;

    p, ul, ol, table {
      font-family: $fs-serif;
      font-size: 2rem; //1.7rem;
      line-height: 1.6; //1.7;
      margin-bottom: 30px;

      @include breakpoint(l) {
        font-size: 2.2rem; //1.8rem;
      }
    }

    &::after {
      @include squiggly;
    }

    &::after {
      content: '';
    }

    > div {
      position: relative;
      z-index: 2;

      > p:first-of-type {
        &::first-letter {
          color: $tint;
          font-family: $fs-serif;
          font-size: 6.5rem; //7.2rem;
          font-weight: 400;
          line-height: 1;
          float: left;
          margin: 1px 10px -7px 0;

          @include breakpoint(l) {
            font-size: 6.7rem; //7.6rem;
          }
        }
      }
    }

    img {
      @include breakpoint(l) {
        margin: 0 -80px;
        max-width: calc(100% + 160px);
      }
    }

    blockquote {
      font-family: $fs-serif;
      font-weight: 400;
      margin: 50px 0;
      padding: 0 15px;
      position: relative;
      text-align: center;

      > * {
        position: relative;
      }

      p {
        font-size: 2.8rem;
        line-height: 1.2;
        font-style: italic;
        margin: 0;
      }

      cite {
        font-family: $fs-sans;
        font-size: 1.6rem;
        font-weight: 400;
        color: rgba($tint, 0.6);

        &::before {
          content: '–';
          margin: 0 5px;
        }
      }

      @include breakpoint(l) {
        p {
          font-size: 3.6rem;
        }

        cite {
          font-size: 1.8rem;
        }
      }
    }
  }

  /*&.elevated {
    .post__header {
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

      @include breakpoint(m) {
        padding-top: 150px;
      }

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
        text-shadow: 0 0 30px rgba(0,0,0,0.1);
      }

      > div {
        h3 {
          a {
            color: #fff;
          }
        }

        > p {
          color: #fff;
        }
      }
    }
    .meta {
      justify-content: center;
    }
  }*/
}
</style>
