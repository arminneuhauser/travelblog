<template>
  <div class="hero hero--home">
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component"></component>
    <section id="blog" class="blog">
      <div class="container">
        <header>
          <nav>
            <h3><nuxt-link :to="{ path: '/blog/'}">Unser Reisetagebuch</nuxt-link></h3>
            <nuxt-link class="link link--right" :to="{ path: '/blog/'}">mehr</nuxt-link>
          </nav>
        </header>
        <div class="posts">
          <article-tile :key="story.content._uid" v-for="story in posts.stories" :story="story" class="compact"/>
        </div>
        <div class="read-more">
          <nuxt-link class="button button--ghost button--large button--icon" :to="{ path: '/blog/'}">
            Alle Beiträge
            <svg class="rotate-270"><use xlink:href="#down"></use></svg>
          </nuxt-link>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  head() {
    return {
      title: 'Solmates - Mit dem Rucksack durch Lateinamerika',
      meta: [
        { hid: 'description', name: 'description', content: 'Ein Reisetagebuch von Miriam und Armin. Begleitet uns auf unserem Abenteuer von den Alpen in die Anden.' },
        { hid: 'og:title', propery: 'og:title', content: 'Solmates - Mit dem Rucksack durch Lateinamerika' },
        { hid: 'og:description', propery: 'og:description', content: 'Ein Reisetagebuch von Miriam und Armin. Begleitet uns auf unserem Abenteuer von den Alpen in die Anden.' },
        { hid: 'og:image', propery: 'og:image', content: 'https://img2.storyblok.com/750x422/f/54536/2048x1365/306b0b6caf/12034365_10205045344112624_7076641627775926331_o.jpg' },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Solmates - Mit dem Rucksack durch Lateinamerika' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Ein Reisetagebuch von Miriam und Armin. Begleitet uns auf unserem Abenteuer von den Alpen in die Anden.' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://img2.storyblok.com/750x422/f/54536/2048x1365/306b0b6caf/12034365_10205045344112624_7076641627775926331_o.jpg' }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "https://www.solmates.at",
        "name": "Solmates",
        "alternateName": "Solmates - Mit dem Rucksack durch Lateinamerika",
        "description": "Ein Reisetagebuch von Miriam und Armin. Begleitet uns auf unserem Abenteuer von den Alpen in die Anden.",
        "image": "https://img2.storyblok.com/750x422/f/54536/2048x1365/306b0b6caf/12034365_10205045344112624_7076641627775926331_o.jpg"
      }), type: 'application/ld+json' }],
      bodyAttrs: {
        class: 'page-home',
      },
    };
  },
  data () {
    return {
      story: { content: {} }
    }
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
      starts_with: `blog/`,
      cv: context.store.state.cacheVersion
    })

    return { home: home.data, posts: posts.data };
  }
}
</script>

<style lang="scss" scoped>
.hero--home {
  @include bg-pattern($home-background-color,darken($home-background-color,10%));
}

.blog {
  background-color: $background-color;

  @include breakpoint(m) {
    .posts {
      margin: 0 -15px;
    }

    article {
      border-bottom: none;
      flex-basis: 50%;
      max-width: 50%;
      padding: 20px 15px;

      header {
        padding: 0;
      }
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
