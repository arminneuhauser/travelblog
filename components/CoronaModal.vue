<template>
  <modal name="corona-modal" class="corona-modal" :adaptive="true" :scrollable="true" width="90%" :maxWidth="800" height="auto">
    <button @click="$modal.hide('corona-modal')">
      <svg><use xlink:href="#close"></use></svg>
    </button>
    <div class="corona-modal-content">
      <h1>Coronavirus in Peru</h1>
      <p>
        Wir sind noch immer gestrandet.
      </p>
      <p>
        Heute, am 27. März, bringt ein Flugzeug der Austrian Airlines die ersten österreichischen Touristen von Lima nach Wien. Wir hatten aber bisher keine Möglichkeit, von Cusco nach Lima zu kommen, weil seit 16. März in Peru striktes Reiseverbot gilt.
      </p>
      <p>
        Da aber einige Touristen aus anderen Ländern bereits ihre Heimreise von Cusco aus antreten konnten, sind wir optimistisch, dass es auch für uns bald soweit ist. <strong>Macht euch keine Sorgen!</strong>
      </p>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'CoronaModal'
}
</script>

<style lang="scss">
.corona-modal {

  button {
    @include reset-button;
    display: flex;
    margin: 0;
    padding: 12px;
    position: absolute;
    right: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.corona-modal-content {
  padding: 16px;

  @include breakpoint(m) {
    padding: 20px;
  }

  @include breakpoint(l) {
    padding: 24px;
  }

  h1 {
    font-family: $fs-sans;
    font-size: 2rem;
    margin: 0 0 15px;
  }

  p {
    &:last-of-type {
      margin: 0;
    }
  }
}
</style>
