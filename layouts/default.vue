<template>
  <div>
    <site-header/>
    <main class="main" role="main">
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
  head() {
    return {
      bodyAttrs: {
        class: `page-${this.$nuxt.$route.name}`,
      },
    };
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
