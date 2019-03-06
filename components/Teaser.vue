<template>
  <div class="teaser" v-editable="blok">
    <div>
      <h1>{{ blok.headline }}</h1>
      <p>{{ blok.text }}</p>
      <a href="#" class="button">{{ blok.button_text }}</a>
    </div>
    <figure>
      <img :src="blok.image">
    </figure>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.teaser {
  display: flex;
  //align-items: center;
  //justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 100px;

  > div {
    margin-bottom: 40px;
  }

  figure {
    margin: 0;
  }

  h1 {
    font-family: $fs-serif;
    font-weight: 600;
    font-size: 3.6rem;
    line-height: 4rem;
    margin: 0 0 20px;
  }

  p {
    font-size: 1.7rem;
    opacity: 0.8;
  }

  @include breakpoint(m) {
    //flex-wrap: nowrap;
    justify-content: space-between;

    > div {
      flex-basis: 50%;
    }

    figure {
      flex-basis: 40%;
    }
  }

  @include breakpoint(l) {
    h1 {
      font-size: 5.6rem;
      line-height: 6rem;
      margin-bottom: 30px;
    }

    p {
      font-size: 2rem;
    }
  }
}
</style>
