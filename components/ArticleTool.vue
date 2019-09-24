<template>
  <aside class="article-tool" :class="{ 'active': this.active }">
    <nav>
      <h3>Artikel teilen</h3>
      <ul>
        <li>
          <a @click="facebookLink()" title="Artikel auf Facebook teilen" class="facebook">
            <span>auf Facebook teilen</span>
            <svg><use xlink:href="#facebook"></use></svg>
          </a>
        </li>
        <li>
          <a @click="twitterLink()" title="Artikel auf Twitter teilen" class="twitter">
            <span>auf Twitter teilen</span>
            <svg><use xlink:href="#twitter"></use></svg>
          </a>
        </li>
        <li>
          <a @click="whatsappLink(title)" title="Artikel in WhatsApp senden" class="whatsapp">
            <span>in WhatsApp senden</span>
            <svg><use xlink:href="#whatsapp"></use></svg>
          </a>
        </li>
        <li class="copy-url" :class="{ 'active': this.active }">
          <input id="url" type="hidden" :value="this.url">
          <button @click.stop.prevent="copyURL" class="btn-copy" aria-label="Link kopieren">
            <span :class="{ 'active': this.active }">{{message}}</span>
            <svg><use xlink:href="#share"></use></svg>
          </button>
        </li>
      </ul>
    </nav>
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
    margin-bottom: 40px;

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
      margin: 0 -15px !important;
      padding: 0;
      position: relative;
    }

    li {
      box-sizing: border-box;
      display: flex;
      margin: 0 10px;

      @include breakpoint(360, max) {
        margin: 0 5px;
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

      > span {
        display: none;
        margin: 0 10px 0 5px;
      }

      svg {
        fill: rgba($tint,0.86);
        height: 30px;
        width: 30px;
        transition: fill 0.2s ease;
      }

      &:hover {
        background-color: transparent;
      }

      @include breakpoint(899, max) {
        &.facebook {
          svg {
            fill: #4267b2;
          }
        }

        &.twitter {
          svg {
            fill: #1DA1F2;
          }
        }

        &.whatsapp {
          svg {
            fill: #128C7E;
          }
        }
      }
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

      &:before {
        display: none;
      }

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
            border-color: rgba($tint,0.15);
            box-shadow: 0 5px 10px rgba($tint,.05), 0 1px 2px rgba($tint,.1);

            > span {
              display: inline;
            }

            &.facebook {
              svg {
                fill: #4267b2;
              }
              > span {
                color: #4267b2;
              }
            }

            &.twitter {
              svg {
                fill: #1DA1F2;
              }
              > span {
                color: #1DA1F2;
              }
            }

            &.whatsapp {
              svg {
                fill: #128C7E;
              }
              > span {
                color: #128C7E;
              }
            }
          }
        }
      }

      a, button {
        background: none;
        border: 1px solid transparent;
        justify-content: flex-start;
        padding: 10px;

        svg {
          height: 24px;
          width: 24px;
          transition: none;
        }
      }
    }
  }
}
</style>
