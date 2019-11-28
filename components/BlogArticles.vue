<template>
  <section id="blog" class="blog">
    <div class="container">
      <header>
        <nav>
          <h3><nuxt-link :to="'/' + blok.link.url" title="Solmates Reisetagebuch">{{ blok.headline }}</nuxt-link></h3>
          <nuxt-link class="link link--right" :to="'/' + blok.link.url" title="Mehr aus Solmates Reisetagebuch">mehr</nuxt-link>
        </nav>
      </header>
      <div class="posts">
        <article-tile :key="story.content._uid" v-for="story in posts.data.stories" :story="story" class="compact"/>
      </div>
      <div class="read-more">
        <!--<pre>total: {{ posts.total }} currentPage: {{ this.currentPage }} perPage: {{ this.perPage }}</pre>-->
        <button v-if="posts.total > (this.perPage * this.currentPage)" @click="loadMore" class="button button--ghost button--large" title="Mehr Beiträge von Solmates laden">
          Mehr laden
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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

      this.posts.data.stories.push(...newPosts.data.stories);
    },
  },
  props: ['blok', 'posts']
}
</script>

<style lang="scss" scoped>
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
