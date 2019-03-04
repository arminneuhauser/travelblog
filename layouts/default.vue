<template>
  <div>
    <top-header/>
    <main id="main" role="main">
      <nuxt/>
    </main>
    <!--<bottom-footer/>-->
    <svg-sprite/>
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
import BottomFooter from '~/components/BottomFooter.vue'
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
    TopHeader,
    BottomFooter,
    SvgSprite
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>
