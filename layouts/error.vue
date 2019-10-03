<template>
  <div class="container error-container">
    <div class="error">
      <h1>{{error.statusCode}}</h1>
      <div>
        <h2 v-if="error.statusCode === 404">Seite nicht gefunden</h2>
        <h2 v-else>Es ist ein Fehler aufgetreten</h2>
        <p>Wir können die Seite, die du suchst, leider nicht finden.</p>
        <nuxt-link to="/" class="button button--icon">
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
.error-container {
  padding-bottom: 40px;

  @include breakpoint(l) {
    padding-bottom: 50px;
  }
}

.error {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  h1 {
    font-family: $fs-sans;
    font-size: 8rem;
    margin: 40px 30px 5px 0;

    @include breakpoint(l) {
      font-size: 10rem;
    }
  }

  h2 {
    font-family: $fs-sans;
    font-size: 3rem;
    margin: 10px 0;
    opacity: 0.5;

    @include breakpoint(l) {
      font-size: 5rem;
    }
  }

  p {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
}
</style>
