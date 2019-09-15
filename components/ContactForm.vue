<template>
  <div class="contactform narrow margin-auto padding-bottom" v-editable="blok">
    <h1>{{ blok.headline }}</h1>

    <div class="alert alert--success" v-if="$route.hash === '#success'">
      <p>Danke für deine Nachricht! Wir werden dir sobald wie möglich antworten.</p>
      <nuxt-link class="close" :to="$route.path">
        <svg><use xlink:href="#close"></use></svg>
      </nuxt-link>
    </div>

    <form v-else name="contact" method="POST" action="#success" netlify-honeypot="bot-field" data-netlify="true">
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <div class="text-field">
        <input type="text" name="name" placeholder="Dein Name">
        <label>Name</label>
      </div>
      <div class="text-field">
        <input type="email" name="email" placeholder="deine@email.at">
        <label>E-Mail-Adresse</label>
      </div>
      <div class="text-field">
        <textarea name="message" rows="5" placeholder="Deine Nachricht an uns"></textarea>
        <label>Deine Nachricht</label>
      </div>
      <!--<div class="radio">
        <input id="radio" type="radio"><label for="radio">radio</label>
      </div>
      <div class="checkbox">
        <input id="checkbox" type="checkbox"><label for="checkbox">checkbox</label>
      </div>-->
      <div>
        <button type="submit" class="button button--large">Absenden</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
</style>
