<template>
  <section class="blog">
    <div class="container">
      <article :key="story.content._uid" v-for="story in data.stories">
        <nuxt-link :to="'/' + story.full_slug">
          <figure>
            <img :src="resize(story.content.image, '375x228')">
          </figure>
          <div>
            <h1>{{ story.content.title }}</h1>
            <p>{{ story.content.intro }}</p>
            <p class="meta">{{ formatDate(story.first_published_at) }} • {{ readTime(story.content.body) }} Min. Lesezeit</p>
          </div>
        </nuxt-link>
      </article>
      <div class="pagination">
        <nuxt-link class="pagination__link--prev button button--ghost" v-if="this.prevPage != null" :to="{ path: '/blog/', query: { page: this.prevPage }}">
          Vorherige Seite
        </nuxt-link>
        <nuxt-link class="pagination__link--next button button--ghost" v-if="this.nextPage != null && this.nextPage <= totalpages" :to="{ path: '/blog/', query: { page: this.nextPage }}">
          Nächste Seite
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize, formatDate, readTime } from '@/plugins/helper'

export default {
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
    resize,
    formatDate,
    readTime,
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
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>
