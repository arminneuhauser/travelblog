<template>
  <header class="site-header" :data-mobile-menu="showMobileMenu">
    <div class="container">
      <a href="/" class="site-header__logo">
        <svg><use xlink:href="#logo"></use></svg>
      </a>
      <button @click="showMobileMenu = !showMobileMenu">
        <div class="site-header__icon"><div></div><div></div><div></div></div><span>Menü öffnen</span>
      </button>
      <nav>
        <ul>
          <li :key="index" v-for="(navitem, index) in $store.state.settings.main_navi" :class="{ 'cta': navitem.cta === true }">
            <svg v-if="navitem.cta" xmlns="http://www.w3.org/2000/svg" width="52.5" height="33.4" viewBox="0 0 52.5 33.4"><path d="M6,18-2.3-.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M22,16.1V-11.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path><path d="M37.9,18,46.2-1.4" transform="translate(4.3 13.4)" style="stroke-linecap: round;stroke-miterlimit: 10" fill="none" stroke-width="4"></path></svg>
            <nuxt-link class="site-header__link" :to="navitem.link.cached_url">
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
      showMobileMenu : false
    }
  }
}
</script>

<style lang="scss">
.site-header {
  display: flex;
  align-items: center;
  height: 100px;

  .container {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-grow: 1;

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
        background-color: #000;
        //border-radius: 1px;
        border-radius: 2px;
        //height: 2px;
        height: 4px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-2px, -2px);
        transform-origin: center center;
        transition: all .4s cubic-bezier(.77,0,.175,1);
        //width: 100%;
        width: 4px;

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
    button {
      .site-header__icon {
        div {
          background-color: #fff;
          left: 0;
          height: 2px;
          width: 100%;

          &:not(:first-child):not(:last-child) {
            opacity: 0;
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
    z-index: 2;

    svg {
      fill: $tint;
      height: 70px;
      width: 110px;
    }
  }

  &[data-mobile-menu="true"] {
    .site-header__logo {
      svg {
        fill: #fff;
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
    background-color: #373a47;
    display: flex;
    opacity: 0;
    pointer-events: none;
    transition: opacity .4s cubic-bezier(.165,.84,.44,1);
    transition: opacity .4s cubic-bezier(0.7,0,0.3,1);
    z-index: 1;

    ul {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      list-style: none;
      margin: 0;
      padding: 120px 20px;
      height: 100%;
      flex-basis: 80%;

      li {
        opacity: 0;
        position: relative;
        transform: translateY(500px);

        &::before {
          border-bottom: 1px solid #D1D0CB;
          content: '';
          left: 30%;
          opacity: 0.3;
          position: absolute;;
          width: 40%;
        }

        a {
          display: block;
          color: #D1D0CB;
          font-size: 2rem;
          font-weight: 500;
          text-align: center;
          text-decoration: none;
          padding: 20px 0;
        }

        &.cta {
          margin-top: 20px;

          &::before {
            display: none;
          }

          a {
            font-weight: 600;
            letter-spacing: 0.5px;
            //text-transform: uppercase;
          }

          svg {
            height: 18px;
            left: 50%;
            pointer-events: none;
            position: absolute;
            stroke: #D1D0CB;
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
          transition: all .4s cubic-bezier(0.7,0,0.3,1);

          &:nth-child(1) {
            transition-delay: .3s;
          }
          &:nth-child(2) {
          	transition-delay: .4s;
          }
          &:nth-child(3) {
          	transition-delay: .45s;
          }
          &:nth-child(4) {
          	transition-delay: .5s;
          }
        }
      }
    }
  }

  @include breakpoint(m) {
    height: 150px;

    .site-header__logo {
      svg {
        fill: $tint !important;
        height: 97px;
        width: 152px;
      }
    }

    // hide menu button
    button {
      display: none;
    }

    nav {
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
          opacity: 1;
          transform: translateY(0) !important;

          &::before {
            display: none;
          }

          a {
            color: $tint;
            font-size: 1.5rem;
            font-weight: normal;
          }

          &:not(.cta) {
            a {
              margin-right: 10px;
              opacity: 0.8;
              padding: 7px 15px;
              margin-right: 10px;
              position: relative;
              transition: all 0.2s ease;

              &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 5px;
                left: 15px;
                border-bottom: 2px solid $tint;
                border-radius: 1px;
                opacity: 0;
                transform: scaleX(0);
                transition: all 0.3s cubic-bezier(.12,.845,.305,1);
                visibility: hidden;
                width: 1px;
              }

              &:hover {
                opacity: 1;

                &::after {
                  opacity: 1;
                  transform: scaleX(1);
                  visibility: visible;
                  width: calc(100% - 30px);
                }
              }
            }
          }

          &.cta {
            margin: 0;

            a {
              @include button();

              margin-left: 15px;
            }

            svg {
              display: none;
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
