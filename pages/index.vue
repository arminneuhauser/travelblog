<template>
  <div>
    <div class="hero hero--home">
      <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    </div>
    <section id="blog" class="blog">
      <div class="container">
        <header>
          <nav>
            <h3><nuxt-link :to="{ path: '/blog/'}" title="Solmates Reisetagebuch">Unser Reisetagebuch</nuxt-link></h3>
            <nuxt-link class="link link--right" :to="{ path: '/blog/'}" title="Mehr aus Solmates Reisetagebuch">mehr</nuxt-link>
          </nav>
        </header>
        <div class="posts">
          <article-tile :key="story.content._uid" v-for="story in posts.stories" :story="story" class="compact"/>
        </div>
        <div class="read-more">
          <!--<pre>total: {{ this.total }} currentPage: {{ this.currentPage }} perPage: {{ this.perPage }}</pre>-->
          <button v-if="this.total > (this.perPage * this.currentPage)" @click="loadMore" class="button button--ghost button--large" title="Mehr Beiträge von Solmates laden">
            Mehr laden
          </button>
        </div>
      </div>
    </section>

    <newsletter-signup/>

    <world-map/>

  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  head() {
    return {
      title: 'Solmates - Mit dem Rucksack durch Lateinamerika',
      meta: [
        { hid: 'og:title', propery: 'og:title', content: 'Solmates - Mit dem Rucksack durch Lateinamerika' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Solmates - Mit dem Rucksack durch Lateinamerika' }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "https://www.solmates.at",
        "name": "Solmates",
        "alternateName": "Solmates - Mit dem Rucksack durch Lateinamerika",
        "description": "Solmates ist der Reiseblog von Miriam und Armin, einem Paar aus Wien. Begleitet uns auf unserem Abenteuer nach Lateinamerika, von den Alpen in die Anden.",
        "image": {
            "@type": "ImageObject",
            "url": "https://img2.storyblok.com/1200x630/f/54536/2048x1365/5ca76528f1/solmates.jpg",
            "width": "1200",
            "height": "630"
        }
      }), type: 'application/ld+json' }],
      bodyAttrs: {
        class: 'page-home',
      },
    };
  },
  data () {
    return {
      currentPage: 1,
      perPage: 6,
      story: { content: {} }
    }
  },
  methods: {
    async loadMore () {
      this.currentPage++

      let newPosts = await this.$storyapi.get('cdn/stories', {
        version: 'published',
        per_page: this.perPage,
        page: this.currentPage,
        starts_with: `blog/`,
        sort_by: "first_published_at:desc",
        cv: this.$store.state.cacheVersion
      })

      this.posts.stories.push(...newPosts.data.stories);
    },
  },
  mixins: [storyblokLivePreview],
  async asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    let home = await context.app.$storyapi.get('cdn/stories/home', {
      version: version,
      cv: context.store.state.cacheVersion
    })

    let posts = await context.app.$storyapi.get('cdn/stories', {
      version: version,
      per_page: 6,
      page: 1,
      starts_with: `blog/`,
      sort_by: "first_published_at:desc",
      cv: context.store.state.cacheVersion
    })

    return { home: home.data, posts: posts.data, total: posts.total }
  }
}
</script>

<style lang="scss" scoped>
.hero--home {
  padding-top: 90px;

  @include breakpoint(l) {
    padding-top: 150px;
  }
}

.blog {
  background-color: $background-color;

  @media (max-width: map-get($breakpoints, 'm') - 1) and (orientation: landscape), (min-width: map-get($breakpoints, 'm')) {
    .posts {
      margin: 0 -15px;
    }

    article {
      border-bottom: none;
      flex-basis: 50%;
      max-width: 50%;
      padding: 20px 15px;
    }
  }

  @include breakpoint(l) {
    article {
      flex-basis: 33.33333%;
      max-width: 33.33333%;

      h1 {
        font-size: 2.6rem;
      }
    }
  }
}
</style>
