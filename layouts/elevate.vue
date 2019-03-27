<template>
  <div>
    <site-header class="inverted"/>
    <main class="main elevated" role="main">
      <nuxt/>
    </main>
    <site-footer/>
    <svg-sprite/>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SvgSprite from '~/components/SvgSprite.vue'

export default {
  head () {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    SvgSprite
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>
