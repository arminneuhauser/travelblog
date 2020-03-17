<template>
  <div>
    <corona-modal/>
    <component v-if="home.story.content.component" :key="home.story.content._uid" :blok="home.story.content" :is="home.story.content.component" :posts="posts"></component>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import CoronaModal from '@/components/CoronaModal.vue'

export default {
  components: {
    CoronaModal
  },
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
  mounted () {
    this.$modal.show('corona-modal')
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
      cv: context.store.state.cacheVersion,
      resolve_relations: "reading.authors"
    })

    let posts = await context.app.$storyapi.get('cdn/stories', {
      version: version,
      per_page: 6,
      page: 1,
      starts_with: `blog/`,
      sort_by: "first_published_at:desc",
      cv: context.store.state.cacheVersion
    })

    return { home: home.data, posts: posts }
  }
}
</script>
