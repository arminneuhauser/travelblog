<template>
  <div class="narrow margin-auto padding-bottom" v-editable="blok">
    <div class="markdown-content" :class="blok.size" v-html="body"></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  props: ['blok'],
  computed: {
    body () {
      return marked(this.blok.body)
    }
  },
}
</script>

<style lang="scss">
.markdown-content {
  margin: 0 auto 100px;
  overflow-wrap: break-word;

  p, ul, ol, table {
    //font-family: $fs-serif;
    font-size: 1.8rem;//2rem;
    font-weight: 400;
    line-height: 1.7;
    margin-bottom: 30px;

    a {
      color: $cta;
      text-decoration: underline;
      transition: all .1s ease-out;

      &:hover {
        text-decoration: none;
      }
    }

    @include breakpoint(l) {
      font-size: 1.9rem;//2.2rem;
    }
  }

  &.small {
    h1 {
      font-size: 2.8rem;
    }

    h2, h3, h4, h5, h6 {
      font-size: 2.1rem;
      margin: 16px 0;
    }

    p, ul, ol, table {
      font-size: 1.4rem;
      line-height: 1.6;
      margin-bottom: 10px;
    }
  }
}
</style>
