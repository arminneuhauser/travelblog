<template>
  <aside class="article-tool" :class="{ 'active': this.active }">
    <div>
      <nav>
        <div>
          <h3>Artikel teilen</h3>
          <ul>
            <li>
              <a @click="facebookLink()" title="Artikel auf Facebook teilen" class="facebook">
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a @click="twitterLink()" title="Artikel auf Twitter teilen" class="twitter">
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a @click="whatsappLink(title + ' - Travelcouple')" title="Artikel in WhatsApp senden" class="whatsapp">
                <span>WhatsApp</span>
              </a>
            </li>
            <li class="copy-url" :class="{ 'active': this.active }">
              <input id="url" type="hidden" :value="this.url">
              <button @click.stop.prevent="copyURL" class="btn-copy" title="Link kopieren">
                <span :class="{ 'active': this.active }">{{message}}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script>
import { objectToGetParams } from '@/plugins/helper'

export default {
  props: ['title'],
  data() {
    return {
      url: '',
      message: 'Link kopieren',
      active: false
    }
  },
  mounted() {
    this.url = window.location.href
    console.log(this.props)
  },
  methods: {
    facebookLink() {
      window.open(
        `https://www.facebook.com/sharer/sharer.php` +
          objectToGetParams({
            u: this.url
          }),
        '__blank'
      );
    },
    twitterLink() {
      window.open(
        'https://www.twitter.com/share' +
          objectToGetParams({
            url: this.url
          }),
        '__blank'
      );
    },
    whatsappLink(title) {
      window.open(
        'https://api.whatsapp.com/send' +
          objectToGetParams({
            text: title ? title + ' ' + this.url : this.url
          }),
        '__blank'
      );
    },
    copyURL() {
      let codeToCopy = document.querySelector('#url')
      codeToCopy.setAttribute('type', 'text')
      codeToCopy.select()

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'erfolgreich' : 'nicht';
        this.message = 'Link wurde ' + msg + ' kopiert';
        this.active = true;
      } catch (err) {
        this.message = 'Link konnte nicht kopiert werden';
      }

      /* unselect the range */
      codeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      // reset message
      var self = this;
      setTimeout(function(){
        self.message = 'Link kopieren';
        self.active = false;
      }, 3000);
    }
  }
}
</script>

<style lang="scss">
.article-tool {
  nav {
    margin-bottom: 60px;

    &:before {
      @include squiggly;
      content: '';
    }

    h3 {
      text-align: center;
    }

    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      margin: 0 -15px;
      padding: 0;
      position: relative;
    }

    li {
      box-sizing: border-box;
      display: flex;
      margin: 0 15px;

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
    }
  }

  @include breakpoint(900) {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -100px;
    z-index: 1;

    &:hover, &.active {
      z-index: 3;
    }

    > div {
      position: sticky;
      top: 110px;
    }

    nav {
      position: absolute;
      top: 0;
      left: 0;
      border: none;
      transform: rotate(90deg);
      transform-origin: top left;
      height: 36px;
      overflow: hidden;

      > div {
        transform: matrix(1, 0, 0, 1, 0, 0);
        transition: transform .2s ease;
      }

      &:hover {
        > div {
          transform: matrix(1, 0, 0, 1, 0, -38);
        }
      }

      &:before {
        display: none;
      }

      h3 {
        font-family: $fs-sans;
        font-weight: 500;
        font-size: 1.8rem;
        margin: 0;
      }

      ul {
      }

      li {
        margin: 0;
        padding: 4px;
      }

      a, button {
        background: none;
        border: 1px solid transparent;
        justify-content: flex-start;
        padding: 10px;
      }
    }
  }
}
</style>
