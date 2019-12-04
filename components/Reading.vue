<template>
  <div class="about" v-editable="blok">
    <div class="container">
      <header>
        <nav>
          <h3>
            <nuxt-link :to="'/ueber-uns'" :title="blok.link_text">
              <span class="show-on-s">{{ blok.headline }}</span>
              <span class="hide-on-s">{{ blok.headline_long }}</span>
            </nuxt-link>
          </h3>
          <nuxt-link :to="'/ueber-uns'" class="link link--right" :title="blok.link_text">{{ blok.link_text }}</nuxt-link>
        </nav>
      </header>
      <div class="about__row">
        <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.about {
  background: #F2F6FA;
  padding: 30px 0 50px;

  .container {
    max-width: 1196px;
  }

  header {
    text-align: center;
    margin-bottom: 30px;

    > nav {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      border-bottom: 2px solid rgba(0,0,0,0.1);
      padding: 10px 0 5px;

      @include breakpoint(l) {
        padding: 20px 0 5px;
        margin-bottom: 10px;
      }

      > h3 {
        margin: 0;
      }

      > a {
        margin-left: auto;
      }
    }
  }

  .about__row {
    display: flex;
    flex-wrap: wrap;

    @include breakpoint(m) {
      margin: 0 -15px;
    }
  }

  .about__item {
    flex-basis: 100%;

    @include breakpoint(m) {
      flex-basis: 50%;
      padding: 0 15px;
    }
  }
}
</style>
