<template>
  <header class="site-header" :data-mobile-menu="showMobileMenu">
    <div class="container">
      <a href="/" class="site-header__logo">
        <svg><use xlink:href="#logo"></use></svg>
      </a>
      <button @click="showMobileMenu = !showMobileMenu">
        <div class="site-header__icon"><div></div><div></div></div><span>Menü öffnen</span>
      </button>
      <nav>
        <ul>
          <li :key="index" v-for="(navitem, index) in $store.state.settings.main_navi">
            <nuxt-link class="site-header__link" :to="navitem.link.cached_url" :class="{ 'cta': navitem.cta === true }">
              {{ navitem.name }}
            </nuxt-link>
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
        border-radius: 1px;
        height: 2px;
        left: 0;
        position: absolute;
        top: 50%;
        transform-origin: center center;
        transition: background-color .4s,transform .4s cubic-bezier(.77,0,.175,1);
        width: 100%;

        &:first-child {
          transform: translateY(-5px);
        }

        &:last-child {
          transform: translateY(3px);
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

          &:first-child {
            transform: translateY(-.2rem) rotate(-45deg);
          }

          &:last-child {
            transform: translateY(-.2rem) rotate(45deg);
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

        &::after {
          border-bottom: 1px solid #b8b7ad;
          content: '';
          left: 30%;
          opacity: 0.3;
          position: absolute;;
          width: 40%;
        }

        &:last-child {
          &::after {
            display: none;
          }
        }

        a {
          display: block;
          color: #b8b7ad;
          font-size: 2rem;
          font-weight: 500;
          text-align: center;
          text-decoration: none;
          padding: 20px 0;
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

          &::after {
            display: none;
          }

          a {
            color: $tint;
            font-size: 1.5rem;
            font-weight: normal;

            &:not(.cta) {
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
                width: calc(100% - 30px);
                visibility: hidden;
                opacity: 0;
                transition: all 0.2s ease;
              }

              &:hover {
                opacity: 1;

                &::after {
                  visibility: visible;
                  opacity: 1;
                }
              }
            }

            &.cta {
              @include button();

              margin-left: 15px;
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
