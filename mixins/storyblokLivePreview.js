export default {
  mounted() {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        // Inject content on the input event
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (!event.slugChanged) {
        // Reload the page on save events
        window.location.reload()
      }
    })
  }
}
