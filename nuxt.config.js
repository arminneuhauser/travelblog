const pkg = require('./package')
const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    //titleTemplate: '%s - ' + pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#241E15' },
      { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#241E15' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:type', propery: 'og:type', content: 'website' },
      { hid: 'og:title', propery: 'og:title', content: pkg.name },
      { hid: 'og:description', propery: 'og:description', content: pkg.description },
      { hid: 'og:image', propery: 'og:image', content: 'http://img2.storyblok.com/1200x630/f/54536/2048x1365/306b0b6caf/12034365_10205045344112624_7076641627775926331_o.jpg' },
      { hid: 'og:site_name', propery: 'og:site_name', content: pkg.name },
      { hid: 'og:url', property: 'og:url', content: 'https://www.solmates.at' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@solmates' }, // TODO: add Twitter Account @solmates
      { hid: 'twitter:title', name: 'twitter:title', content: pkg.name },
      { hid: 'twitter:description', name: 'twitter:description', content: pkg.description },
      { hid: 'twitter:image', name: 'twitter:image', content: 'http://img2.storyblok.com/1200x630/f/54536/2048x1365/306b0b6caf/12034365_10205045344112624_7076641627775926331_o.jpg' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,600|Work+Sans:300,400,500,600' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#087E8B' },

  /*
  ** Global CSS
  */
  /*css: [
    '~/assets/scss/styles.scss'
  ],*/

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/gtm.js', ssr: false },
    '@/plugins/components',
    '@/plugins/filters',
    '@/plugins/helper',
    '@/plugins/vue-lazysizes.client.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['storyblok-nuxt', {accessToken: 'k5Y8ixzNl1kB4Vq6F5ufBQtt', cacheProvider: 'memory', excludeHeaderScript: false}],
    ['@nuxtjs/style-resources'],
    ['vue-scrollto/nuxt', { duration: 300, offset: -70 }],
    ['@bazzite/nuxt-optimized-images']
  ],

  styleResources: {
      scss: [
        './assets/scss/_variables.scss',
        './assets/scss/_mixins.scss'
      ]
  },

  optimizedImages: {
    inlineImageLimit: -1,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 85
    },
    optipng: false,
    pngquant: {
      speed: 7,
      quality: [0.65, 0.8]
    },
    webp: {
      quality: 85
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    ** https://dev.to/ignore_you/minify-generate-webp-and-lazyload-images-in-your-vue-nuxt-application-1ilm
    */
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    },
    /*
    ** Prevents multiple styles (https://github.com/nuxt/nuxt.js/issues/3877)
    */
    splitChunks: {
      layouts: true
    }
  },

  /*
  ** Generate Routes via Storybloks Links API.
  */
  generate: {
    routes: function (callback) {
      const token = `k5Y8ixzNl1kB4Vq6F5ufBQtt`
      const per_page = 100
      const version = `draft`

      let page = 1
      let routes = []

      // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
      axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`).then((res) => {
        Object.keys(res.data.links).forEach((key) => {
          if (res.data.links[key].slug != 'home') {
            routes.push('/' + res.data.links[key].slug)
          }
        })

        // Check if there are more pages available otherwise execute callback with current routes.
        const total = res.headers.total
        const maxPage = Math.ceil(total / per_page)
        if(maxPage <= 1) {
          callback(null, routes)
        }

        // Since we know the total we now can pregenerate all requests we need to get all Links
        let contentRequests = []
        for (let page = 2; page <= maxPage; page++) {
          contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
        }

        // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
        axios.all(contentRequests).then(axios.spread((...requests) => {
          requests.forEach((request) => {
            Object.keys(request.data.links).forEach((key) => {
              if (request.data.links[key].slug != 'home') {
                routes.push('/' + request.data.links[key].slug)
              }
            })
          })

          callback(null, routes)
        })).catch(callback)
      })
    },
    fallback: "404.html"
  }
}
