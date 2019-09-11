<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <nuxt-link class="site-footer__logo" to="/" @click.native="scrollToTop()">
          <svg><use xlink:href="#logo"></use></svg>
        </nuxt-link>
        <nav>
          <ul>
            <li v-if="!navitem.cta" :key="index" v-for="(navitem, index) in $store.state.settings.footer_navi">
              <nuxt-link class="site-footer__link" :to="'/' + navitem.link.cached_url">
                {{ navitem.name }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="site-footer__bottom">
        <p>Mit dem Rucksack durch Lateinamerika</p>
        <nav class="social">
          <ul>
            <li v-if="!navitem.cta" :key="index" v-for="(navitem, index) in $store.state.settings.social_navi">
              <nuxt-link class="site-footer__link" :to="'/' + navitem.link.cached_url">
                <svg><use :xlink:href="getIconName(navitem.name)"></use></svg>
                <span>{{ navitem.name }}</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    getIconName: function (name) {
      return "#" + name.toLowerCase();
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss">
.site-footer {
  @include bg-pattern($tint,darken($tint-inv,55%));

  color: $tint-inv;
  padding: 30px 0;
  text-align: center;

  .site-footer__top {
    border-bottom: 1px solid rgba($tint-inv,.4);
    margin-bottom: 20px;
  }

  .site-footer__logo {
    display: block;
    line-height: 0;

    svg {
      fill: $tint-inv;
      height: 60px;
      width: 150px;
    }
  }

  p {
    color: $tint-inv;
    margin: 0;

    a {
      border-bottom: 2px solid transparent;
      text-decoration: none;
      transition: border-color .2s ease;

      &:hover {
        border-color: $cta;
        text-decoration: none;
      }
    }
  }

  nav {
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      list-style: none;
      margin: 0;
      padding: 20px 0;

      li {
        a {
          display: block;
          color: $tint-inv;
          font-size: 1.6rem;
          font-weight: 400;
          text-align: center;
          text-decoration: none;
          transition: all .2s ease;
          opacity: 0.6;
          padding: 10px 10px;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }

  .social {
    ul {
      flex-direction: row;

      li {
        margin: 0 5px;

        a {
          line-height: 0;
          opacity: 1;

          span {
            display: none;
          }

          svg {
            height: 24px;
            width: 35px;
            fill: $tint-inv;
            transition: fill .2s ease;
          }

          &:hover {
            svg {
              fill: lighten($tint-inv,15%);
            }
          }
        }
      }
    }
  }

  @include breakpoint(m) {
    text-align: left;

    .site-footer__top, .site-footer__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .site-footer__top {
      padding-bottom: 30px;
    }

    nav {
      ul {
        flex-direction: row;
        margin: 0 -10px;
        padding: 0;
      }
    }
  }
}
</style>
