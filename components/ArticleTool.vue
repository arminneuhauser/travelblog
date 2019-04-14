<template>
  <aside class="article-tool" :class="{ 'active': this.active }">
    <nav>
      <h3>Artikel teilen</h3>
      <ul>
        <li>
          <a href="#" title="Artikel auf Facebook teilen">
            <span>Artikel auf Facebook teilen</span>
            <svg><use xlink:href="#facebook"></use></svg>
          </a>
        </li>
        <li>
          <a href="#" title="Artikel auf Twitter teilen">
            <span>Artikel auf Twitter teilen</span>
            <svg><use xlink:href="#twitter"></use></svg>
          </a>
        </li>
        <li>
          <a href="#" title="Artikel auf WhatsApp teilen">
            <span>Artikel auf WhatsApp teilen</span>
            <svg><use xlink:href="#whatsapp"></use></svg>
          </a>
        </li>
        <li class="copy-url" :class="{ 'active': this.active }">
          <input id="url" type="hidden" :value="this.url">
          <button @click.stop.prevent="copyURL" class="btn-copy" title="URL kopieren">
            <span :class="{ 'active': this.active }">{{message}}</span>
            <svg><use xlink:href="#share"></use></svg>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      message: 'URL kopieren',
      active: false
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
        this.active = true;
      } catch (err) {
        this.message = 'URL konnte nicht kopiert werden';
      }

      /* unselect the range */
      codeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      // reset message
      var self = this;
      setTimeout(function(){
        self.message = 'URL kopieren';
        self.active = false;
      }, 3000);
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

      &:hover {
        svg {
          fill: $cta;
        }
      }

      @include breakpoint(899, max) {
        &.copy-url {
          position: relative;

          button {
            > span.active {
              display: block;
              position: absolute;
              left: 50%;
              top: 100%;
              transform: translateX(-50%);
              margin: 0;
              width: 150px;
            }
          }
        }
      }
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
      font-size: 1.4rem;
      font-family: $fs-sans;
      justify-content: center;
      overflow: visible;
      padding: 6px;
      text-decoration: none;
      width: auto;

      &:hover {
        background-color: transparent;
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
  }

  @include breakpoint(900) {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -80px;
    z-index: 1;

    &:hover, &.active {
      z-index: 3;
    }

    nav {
      border: none;
      position: sticky;
      top: 110px;

      h3 {
        display: none;
      }

      ul {
        flex-direction: column;
        align-items: flex-end;
      }

      li {
        border-radius: 4px;
        margin: 0;
        padding: 4px;

        &:hover, &.active {
          background-color: $background-color;
          width: auto;

          a, button {
            border-color: rgba(0,0,0,0.15);
            box-shadow: 0 5px 10px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.1);

            > span {
              display: inline;
              color: $cta;
            }
          }

          svg {
            fill: $cta;
          }
        }
      }

      a, button {
        background: none;
        border: 1px solid transparent;
        justify-content: flex-start;
        padding: 10px;
      }

      svg {
        fill: rgba($tint,0.7);
        height: 24px;
        width: 24px;
        transition: none;
      }
    }
  }
}
</style>
