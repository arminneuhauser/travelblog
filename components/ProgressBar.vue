<template>
  <div class="progress-bar">
    <div :style="{width: `${width}%`}"></div>
  </div>
</template>

<script>
// simple version of https://github.com/guillaumebriday/vue-scroll-progressbar
export default {
  name: "VueScrollProgressBar",

  data() {
    return {
      width: 0
    }
  },

  methods: {
    handleScroll() {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      this.width = (window.scrollY / height) * 100
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, {capture: true,passive: true});
    window.dispatchEvent(new Event("scroll"))
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;

  > div {
    background-color: var(--deco-color, $cta);
    height: 4px;
  }
}
</style>
