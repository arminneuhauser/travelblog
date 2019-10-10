<template>
  <section class="blog">
    <div class="container">
      <div class="posts">
        <article-tile :key="story.content._uid" v-for="story in data.stories" :story="story"/>
      </div>
      <div class="pagination">
        <nuxt-link class="pagination__link--prev button button--ghost" v-if="this.prevPage != null" :to="{ path: '/blog', query: { page: this.prevPage }}">
          Vorherige Seite
        </nuxt-link>
        <nuxt-link class="pagination__link--next button button--ghost" v-if="this.nextPage != null && this.nextPage <= totalpages" :to="{ path: '/blog', query: { page: this.nextPage }}">
          Nächste Seite
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  head () {
    return {
      title: 'Blog - Solmates',
      meta: [
        { hid: 'og:title', propery: 'og:title', content: 'Blog - Solmates' },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Blog - Solmates' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.solmates.at' + this.$route.fullPath },
      ],
      bodyAttrs: {
        class: 'page-blog',
      }
    }
  },
  data () {
    return {
      total: 0,
      data: { stories: [] },
      prevPage: null,
      nextPage: null,
      currentPage: null
    }
  },
  computed: {
    totalpages () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  mounted () {
    this.setPages()
  },
  updated () {
    this.setPages()
  },
  mixins: [storyblokLivePreview],
  methods: {
    setPages () {
      let _currentPage = this.$route.query.page ? this.$route.query.page : 1
      this.currentPage = _currentPage
      this.prevPage = _currentPage > 1 ? (_currentPage - 1) : null
      this.nextPage = (parseInt(_currentPage) + 1)
    }
  },
  watchQuery: true,
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      per_page: 10,
      page: context.query.page,
      starts_with: `blog/`,
      sort_by: "first_published_at:desc",
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang="scss" scoped>
  .blog {
    padding-top: 90px;

    @include breakpoint(l) {
      padding-top: 150px;
    }
  }
</style>
