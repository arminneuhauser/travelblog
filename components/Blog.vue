<template>
  <section>
    <h1>Blog posts</h1>
    <div :key="blogPost.content._uid" v-for="blogPost in data.stories" class="blog__overview">
      <h2>
        {{ blogPost.content.title }}
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  data () {
    console.log('data');

    return { total: 0, data: { stories: [] } }
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    console.log('version');

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `posts/`,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>
