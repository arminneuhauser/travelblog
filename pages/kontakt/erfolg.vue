<template>
  <div>
    <div class="container narrow padding-bottom padding-top">
      <div class="alert alert--success">
        <p>Danke für deine Nachricht! Wir werden dir sobald wie möglich antworten.</p>
        <nuxt-link class="close" to="/kontakt">
          <svg><use xlink:href="#close"></use></svg>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Danke für deine Nachricht - Solmates',
      link: [
        { rel: 'canonical', href: 'https://www.solmates.at' + this.$route.fullPath },
      ]
    }
  }
}
</script>
