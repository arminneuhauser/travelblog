import crypto from 'crypto'
import marked from 'marked'
import moment from 'moment'
import readingTime from 'reading-time'

export function readTime(text) {
  let read_text = readingTime(text).minutes;
  return Math.ceil(read_text);
}

export function formatDate(string, format = 'DD.MM.YYYY') {
  require('moment/locale/de')
  return moment(String(string)).format(format)
}

export function markdown(string, param) {
  return marked(resize(string, param))
}

export function resize(str, param) {
  return typeof str === 'undefined' ? '' : str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
}

export function isEditMode(app) {
  // Want to know more about this? https://www.storyblok.com/docs/Guides/storyblok-latest-js

  // Check if app.$storyblok is available, it is not required to be available since it is only
  // used for the editMode initialization. Use the `excludeHeaderScript` plugin option to
  // disable the loading of the script tag in your head for your production build.
  // Read more about why this might be a good idea: https://github.com/storyblok/storyblok-nuxt/issues/1
  if(typeof app.$storyblok !== 'undefined') {
    // Get query params added by the Storyblok Live-Preview iframe
    // Needs to be url encode, since nuxt url encodes "[" and "]"
    const space_id = app.$storyblok.getParam(encodeURI('_storyblok_tk[space_id]'))
    const timestamp = app.$storyblok.getParam(encodeURI('_storyblok_tk[timestamp]'))

    // build control token by using the local accessToken and params
    const controlString = `${space_id}:${app.$storyapi.accessToken}:${timestamp}`

    // hash it using sha1
    const controlToken = crypto.createHash('sha1').update(`${space_id}:${app.$storyapi.accessToken}:${timestamp}`).digest('hex')

    // check if the controlToken is equal to the validation token passed as param
    // and if timestamp is in the lates 60 minutes.
    if (app.$storyblok.getParam(encodeURI('_storyblok_tk[token]')) == controlToken &&
      app.$storyblok.getParam(encodeURI('_storyblok_tk[timestamp]')) > Math.floor(Date.now()/1000)-3600) {

      // here we know it's an valid edit mode so lets initialize it and register events.
      app.$storyblok.init()
      app.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  }
}
