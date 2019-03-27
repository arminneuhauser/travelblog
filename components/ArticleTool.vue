<template>
  <aside class="article-tool">
    <nav>
      <h3>Artikel teilen</h3>
      <ul>
        <li>
          <a href="#" title="Artikel auf Facebook teilen">
            <svg><use xlink:href="#facebook"></use></svg>
            <span>Artikel auf Facebook teilen</span>
          </a>
        </li>
        <li>
          <a href="#" title="Artikel auf Twitter teilen">
            <svg><use xlink:href="#twitter"></use></svg>
            <span>Artikel auf Twitter teilen</span>
          </a>
        </li>
        <li>
          <a href="#" title="Artikel auf WhatsApp teilen">
            <svg><use xlink:href="#whatsapp"></use></svg>
            <span>Artikel auf WhatsApp teilen</span>
          </a>
        </li>
        <li>
          <input id="url" type="hidden" :value="this.url">
          <button @click.stop.prevent="copyURL" class="btn-copy" title="URL kopieren">
            <svg><use xlink:href="#share"></use></svg>
            <span>URL kopieren</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="snackbar">{{message}}</div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      message: ''
    }
  },
  mounted() {
    this.url = window.location.href;
  },
  methods: {
    copyURL() {
      let codeToCopy = document.querySelector('#url')
      codeToCopy.setAttribute('type', 'text')
      codeToCopy.select()

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'erfolgreich' : 'nicht';
        this.message = 'URL wurde ' + msg + ' kopiert';
      } catch (err) {
        this.message = 'URL konnte nicht kopiert werden';
      }

      /* unselect the range */
      codeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style lang="scss">
.article-tool {
  nav {
    border-top: 1px solid rgba(0,0,0,0.15);
    margin-bottom: 100px;

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;
    }

    li {
      box-sizing: border-box;
      display: flex;
      margin: 0 35px 0 0;
    }

    a, button {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: 3px;
      box-sizing: border-box;
      color: $tint;
      cursor: pointer;
      display: flex;
      font-size: 1.2rem;
      justify-content: center;
      overflow: visible;
      padding: 6px;
      text-decoration: none;
      width: auto;

      &:hover {
        svg {
          fill: $cta;
        }
      }

      > span {
        display: none;
        margin: 0 10px 0 5px;
      }
    }

    svg {
      fill: $tint;
      height: 30px;
      width: 30px;
      transition: fill 0.2s ease;
    }

    @include breakpoint(900) {
      border: none;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      transform: translateX(200%);

      > div {
        position: sticky;
        top: 110px;
      }

      h3 {
        display: none;
      }

      ul {
        flex-direction: column;
      }

      li {
        margin: 0 0 10px;
      }

      a, button {
        background: none;
        justify-content: flex-start;
        padding: 4px;
      }

      svg {
        fill: rgba($tint,0.7);
        height: 24px;
        width: 24px;
      }
    }
  }
}
</style>
