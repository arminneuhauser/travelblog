<template>
  <div class="container padding-bottom">
    <div class="error">
      <h1>{{error.statusCode}}</h1>
      <div>
        <h2 v-if="error.statusCode === 404">Seite nicht gefunden</h2>
        <h2 v-else>Es ist ein Fehler aufgetreten</h2>
        <p>Wir können die Seite, die du suchst, leider nicht finden.</p>
        <nuxt-link to="/" class="button button--icon button--large">
          Zur Startseite
          <svg class="rotate-270"><use xlink:href="#down"></use></svg>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  h1 {
    font-family: $fs-sans;
    font-size: 10rem;
    margin-right: 30px;
  }

  h2 {
    font-family: $fs-sans;
    font-size: 5rem;
    opacity: 0.5;
  }

  p {
    font-size: 2rem;
  }
}
</style>
