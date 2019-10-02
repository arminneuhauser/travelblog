<template>
  <div class="container" v-editable="story.content">
    <component v-if="story.content.component" :key="story.content._uid" :story="story" :blok="story.content" :is="story.content.component"></component>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import { resize } from '@/plugins/helper'

export default {
  head () {
    return {
      title: this.story.name + ' - Solmates',
      meta: [
        { hid: 'description', name: 'description', content: this.story.content.description },
        { hid: 'og:title', propery: 'og:title', content: this.story.name },
        { hid: 'og:description', propery: 'og:description', content: this.story.content.description },
        { hid: 'og:image', propery: 'og:image', content: 'https:' + resize(this.story.content.image, '1200x630') },
        { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' + this.$route.fullPath },
        { hid: 'twitter:title', name: 'twitter:title', content: this.story.name },
        { hid: 'twitter:description', name: 'twitter:description', content: this.story.content.description },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https:' + resize(this.story.content.image, '1200x630') }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "https://www.solmates.at" + this.$route.fullPath,
        "name": this.story.name + " - Solmates",
        "description": this.story.content.description,
        "image": {
            "@type": "ImageObject",
            "url": "https:" + resize(this.story.content.image, '1200x630'),
            "width": "1200",
            "height": "630"
        }
      }), type: 'application/ld+json' }],
      link: [
        { rel: 'canonical', href: 'https://www.solmates.at' + this.$route.fullPath },
      ]
    }
  },
  data () {
    return { story: { content: {} } }
  },
  mixins: [storyblokLivePreview],
  methods: {
    resize
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories${context.route.path}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>
