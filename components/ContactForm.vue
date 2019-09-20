<template>
  <div class="contactform padding-bottom" v-editable="blok">
    <h1>{{ blok.headline }}</h1>
    <form name="contact" method="POST" action="/kontakt/erfolg" netlify-honeypot="bot-field" data-netlify="true">
      <input type="hidden" name="form-name" value="contact">
      <p class="hidden">
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <div class="text-field">
        <input type="text" name="name" placeholder="Dein Name" required>
        <label>Name</label>
      </div>
      <div class="text-field">
        <input type="email" name="email" placeholder="deine@email.at" required>
        <label>E-Mail-Adresse</label>
      </div>
      <div class="text-field">
        <textarea name="message" rows="5" placeholder="Deine Nachricht an uns" required></textarea>
        <label>Deine Nachricht</label>
      </div>
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
.contactform {
  margin: 0 auto;
  max-width: 560px;
}
</style>
