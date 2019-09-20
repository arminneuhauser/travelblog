<template>
  <div>
    <site-header class="elevated"/>
    <main class="main elevated" role="main">
      <nuxt/>
    </main>
    <site-footer/>
    <cookie-banner/>
    <svg-sprite/>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import CookieBanner from '~/components/CookieBanner.vue'
import SvgSprite from '~/components/SvgSprite.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
    CookieBanner,
    SvgSprite
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>
