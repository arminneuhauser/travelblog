<template>
  <div>
    <!-- stolen from https://github.com/EvodiaAut/vue-cookieconsent-component -->
    <div class="cookie-banner" v-if="show" role="dialog">
      <p>
        <strong>Wir alle lieben Cookies</strong> 🍪<br>
        Surfst du weiterhin auf unserer Seite, stimmst du unserer Cookie-Nutzung und unserer <nuxt-link to="/impressum-datenschutz">Datenschutzrichtlinie</nuxt-link> zu.<br>
      </p>
      <div>
        <button @click="dismiss">
          <svg><use xlink:href="#close"></use></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: undefined,
      cookieName: 'cookieconsent_status',
      cookiePath: '/',
      cookieDomain: '',
      cookieExpiryDays: 365
    }
  },
  computed: {
    cookie() {
      return !this.getCookie(this.cookieName)
    }
  },
  beforeMount () {
    this.show = this.cookie
  },
  methods: {
    dismiss () {
      this.show = false
      this.setCookie(this.cookieName, 1, this.cookieExpiryDays, this.cookieDomain, this.cookiePath)
    },
    getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)

      return parts.length !== 2 ?
        undefined :
        parts.pop().split(';').shift()
    },
    setCookie(name, value, expiryDays, domain, path) {
      const exdate = new Date()
      exdate.setDate(exdate.getDate() + (expiryDays || 365))

      const cookie = [
        `${name}=${value}`,
        `expires=${exdate.toUTCString()}`,
        `path=${(path || '/')}`
      ]

      if (domain) {
        cookie.push(`domain=${domain}`)
      }

      document.cookie = cookie.join(';')
    }
  }
}
</script>

<style lang="scss">
.cookie-banner {
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  border: 1px solid rgba($tint,0.1);
  box-shadow: 0 2px 8px rgba($tint,.05);
  border-radius: 4px;
  display: flex;
  padding: 20px;
  margin: 10px;
  max-width: 430px;
  z-index: 2;

  p {
    margin: 0;
  }

  button {
    @include reset-button;
    display: flex;
    margin: -20px -20px 0 0;
    padding: 12px;
  }

  svg {
    width: 24px;
    height: 24px;
  }
}
</style>
