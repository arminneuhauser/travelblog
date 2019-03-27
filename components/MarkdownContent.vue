<template>
  <div class="narrow margin-auto padding-bottom" v-editable="blok">
    <div class="markdown-content" v-html="body"></div>
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

  p, ul, ol, table {
    //font-family: $fs-serif;
    font-size: 1.8rem;//2rem;
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 30px;

    @include breakpoint(l) {
      font-size: 1.9rem;//2.2rem;
    }
  }
}
</style>
