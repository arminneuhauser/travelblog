<template>
  <header class="site-header" :data-mobile-menu="showMobileMenu" :data-scrolled="scrolled" :data-transition="transition">
    <div class="container">
      <nuxt-link class="site-header__logo" to="/" @click.native="showMobileMenu = false; scrollToTop();" aria-label="Solmates.at" title="Solmates.at">
        <span>Solmates.at</span>
        <svg><use xlink:href="#logo"></use></svg>
      </nuxt-link>
      <button @click="showMobileMenu = !showMobileMenu" title="Menü">
        <div class="site-header__icon"><div></div><div></div><div></div></div><span>Menü öffnen</span>
      </button>
      <nav>
        <ul>
          <li :key="index" v-for="(navitem, index) in $store.state.settings.main_navi" :class="{ 'cta': navitem.cta === true }">
            <svg v-if="navitem.cta" xmlns="http://www.w3.org/2000/svg" width="52.5" height="33.4" viewBox="0 0 52.5 33.4"><path d="M6,18-2.3-.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M22,16.1V-11.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M37.9,18,46.2-1.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path></svg>
            <nuxt-link class="site-header__link" :to="'/' + navitem.link.cached_url" @click.native="showMobileMenu = false" :title="navitem.name">
              {{ navitem.name }}
            </nuxt-link>
            <svg v-if="navitem.cta" xmlns="http://www.w3.org/2000/svg" width="52.5" height="33.4" viewBox="0 0 52.5 33.4"><path d="M6,18-2.3-.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M22,16.1V-11.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M37.9,18,46.2-1.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path></svg>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      showMobileMenu: false,
      lastScrollTop: 0,
      scrolled: false,
      transition: false,
      scrollTimer: null
    }
  },
  watch: {
    showMobileMenu: function () {
      document.body.style.overflow = this.showMobileMenu ? 'hidden' : ''
    }
  },
  methods: {
    handleScroll () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      let threshold1 = window.innerWidth < 768 ? 0 : 30;
      let threshold2 = window.innerWidth < 768 ? 10 : 150;

      if (st <= threshold1) {
        this.scrolled = false;
        this.transition = false;
      } else if (st > threshold2) {
        if ( st > this.lastScrollTop) {
          this.scrolled = "down";
        } else {
          this.scrolled = "up";
          this.transition = "transform";
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll, {capture: true,passive: true});
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss">
.site-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  height: 90px;
  background-color: transparent;
  //border-bottom: 1px solid transparent;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
  transition: background-color .2s ease, border-color .2s ease;

  .page-blog &,
  .page-category & {
    &:not([data-scrolled]) {
      box-shadow: none;
    }
  }

  .page-category & {
    --site-header-tint: #fff;
  }

  &[data-scrolled] {
    position: fixed;
    height: 70px;
    backdrop-filter: blur(8px);
    background-color: rgba(#fff,0.94);
    //border-color: #dbd9d2;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);

    @media (max-width: map-get($breakpoints, 'm') - 1) and (orientation: landscape) {
      position: absolute;
    }

    .site-header__logo {
      svg {
        fill: $tint;
        height: 60px;
        width: 150px;
      }
    }

    // menu button
    button {
      .site-header__icon {
        div {
          background-color: $tint;
        }
      }
    }
  }

  .container {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0 20px;

    > a:not(.site-header__logo) {
      color: $tint;
      text-decoration: none;
      font-size: 1.4rem;
    }
  }

  // menu button
  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;

    .site-header__icon {
      height: 28px;
      position: relative;
      width: 28px;
      z-index: 3;

      div {
        background-color: var(--site-header-tint, $tint);
        border-radius: 2px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-2px, -2px);
        transform-origin: center center;
        transition: all .2s cubic-bezier(.77,0,.175,1);
        height: 4px;
        width: 4px;

        &:first-child, &:last-child {
          transition-duration: .4s;
        }

        &:first-child {
          transform: translate(-2px, -10px);
        }

        &:last-child {
          transform: translate(-2px, 6px);
        }
      }
    }

    // button text "menü öffnen"
    span {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }

  &[data-mobile-menu="true"] {
    z-index: 5;

    button {
      .site-header__icon {
        div {
          &:not(:first-child):not(:last-child) {
            opacity: 0;
          }

          &:first-child, &:last-child {
            background-color: $tint-inv;
            left: 0;
            height: 2px;
            width: 100%;
          }

          &:first-child {
            transform: translateY(-1px) rotate(-45deg);
          }

          &:last-child {
            transform: translateY(-1px) rotate(45deg);
          }
        }
      }
    }
  }

  .site-header__logo {
    line-height: 0;
    z-index: 2;

    > span {
      display: none;
    }

    svg {
      fill: var(--site-header-tint, $tint);
      height: 72px;
      width: 180px;
      transition: all .2s ease-out;
    }
  }

  &[data-mobile-menu="true"] {
    .site-header__logo {
      svg {
        fill: $tint-inv;
      }
    }
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    background-color: #17181a; //#373a47;
    display: flex;
    opacity: 0;
    pointer-events: none;
    transition: opacity .4s cubic-bezier(0.7,0,0.3,1);
    z-index: 1;
    height: 100vh;

    ul {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      list-style: none;
      margin: 0;
      padding: 100px 20px;
      height: 100%;
      flex-basis: 80%;

      li {
        opacity: 0;
        position: relative;
        transform: translateY(500px);

        &::before {
          border-bottom: 1px solid $tint-inv;
          content: '';
          left: 40%;
          opacity: 0.3;
          position: absolute;;
          width: 20%;
        }

        a {
          display: block;
          color: $tint-inv;
          font-size: 2rem;
          font-weight: 500;
          text-align: center;
          text-decoration: none;
          padding: 20px 0;

          &.nuxt-link-active {
            //color: $cta-inv;
          }
        }

        &.cta {
          margin-top: 20px;

          &::before {
            display: none;
          }

          a {
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          svg {
            height: 18px;
            left: 50%;
            pointer-events: none;
            position: absolute;
            stroke: $tint-inv;
            width: 28px;

            &:first-of-type {
              top: 0;
              transform: translateX(-50%) translateY(-3px);
            }

            &:last-of-type {
                bottom: 0;
                transform: translateX(-50%) translateY(8px) rotate(180deg);
            }
          }
        }

        &:first-child {
          &::before {
            display: none;
          }
        }
      }
    }
  }

  &[data-mobile-menu="true"] {
    nav {
      opacity: 1;
      pointer-events: all;

      ul {
        li {
          opacity: 1;
          transform: translateY(0);
          transition: all .3s cubic-bezier(0.7,0,0.3,1);

          @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
              transition-delay: .05s + $i/20;
            }
          }
        }
      }
    }
  }

  @include breakpoint(m) {
    .page-home & {
      &:not([data-scrolled]) {
        box-shadow: none;
      }
    }
  }

  @include breakpoint(l) {
    height: 150px;
    opacity: 1;
    //top: 30px;

    &[data-scrolled] {
      height: 90px;
      top: 0;
      transform: translateY(-110%);

      .site-header__logo {
        svg {
          height: 84px;
          width: 210px;
        }
      }

      nav {
        ul {
          li {
            a {
              color: $tint;
            }
            &:not(.cta) {
              &::after {
                border-color: $tint;
              }
            }
            &.cta {
              svg {
                stroke: $tint;
              }
            }
          }
        }
      }
    }

    &[data-scrolled="up"] {
      transform: translateY(0);
    }

    &[data-transition="transform"] {
      transition: transform .2s ease, background-color .2s ease, border-color .2s ease;
    }

    .container {
      padding: 0 30px 0 20px;
    }

    .site-header__logo {
      svg {
        height: 120px;
        width: 300px;
      }
    }

    // hide menu button
    button {
      display: none;
    }

    nav {
      display: block;
      background-color: transparent;
      transform: none;
      opacity: 1;
      overflow: visible;
      pointer-events: all;
      position: static;
      height: auto;
      width: auto;
      top: auto;
      left: auto;

      ul {
        background-color: transparent;
        box-shadow: none;
        flex-direction: row;
        padding: 0;

        li {
          opacity: 0.94;
          transform: translateY(0) !important;

          &::before {
            display: none;
          }

          a {
            color: var(--site-header-tint, $tint);
            font-size: 1.5rem;
            font-weight: normal;
            margin-right: 10px;
            //opacity: 0.86;
            padding: 15px;
            margin-right: 0;
            position: relative;
            transition: all 0.2s ease;
          }

          &:hover {
            opacity: 1;
          }

          &:not(.cta) {
            &::after {
              content: '';
              display: block;
              position: absolute;
              bottom: 13px;
              left: 15px;
              border-bottom: 2px solid var(--site-header-tint, $tint);
              border-radius: 1px;
              opacity: 0;
              transform: scaleX(0);
              transition: all 0.3s cubic-bezier(.12,.845,.305,1);
              visibility: hidden;
              width: 1px;
            }

            &:hover {
              &::after {
                opacity: 1;
                transform: scaleX(1);
                visibility: visible;
                width: calc(100% - 30px);
                pointer-events: none;
              }
            }
          }

          &.cta {
            margin: 0 -15px 0 0;

            svg {
              stroke: var(--site-header-tint, $tint);
              opacity: 0.25;
              transition: all 0.2s ease;

              &:first-of-type {
                transform: translateX(-50%) translateY(-8px);
              }

              &:last-of-type {
                transform: translateX(-50%) translateY(8px) rotate(180deg);
              }
            }

            &:hover {
              svg {
                opacity: 1;

                &:first-of-type {
                  transform: translateX(-50%) translateY(-10px);
                }

                &:last-of-type {
                  transform: translateX(-50%) translateY(10px) rotate(180deg);
                }
              }
            }
          }

          &:last-child {
            a {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
