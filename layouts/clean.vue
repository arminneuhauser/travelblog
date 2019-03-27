<template>
  <div>
    <nuxt/>
    <site-footer/>
    <svg-sprite/>
  </div>
</template>

<script>
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
    SiteFooter,
    SvgSprite,
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>
