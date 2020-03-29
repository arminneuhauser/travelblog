<template>
  <modal name="corona-modal" class="corona-modal" :adaptive="true" :scrollable="true" width="90%" :maxWidth="800" height="auto">
    <button @click="$modal.hide('corona-modal')">
      <svg><use xlink:href="#close"></use></svg>
    </button>
    <div class="corona-modal-content">
      <h1>Coronavirus in Peru</h1>
      <p>
        Heute, am 29. März, fahren wir mit einem von der Schweiz organisierten Buskonvoi nach Lima. Das wird etwa 25 Stunden dauern.
      </p>
      <p>
        Am Dienstag können wir dann hoffentlich in die Schweiz fliegen. Wir haben leider kaum Informationen von der österreichischen Botschaft bekommen und wissen nicht wann und wie wir nach Österreich kommen. Aber es ist immerhin ein Anfang.
      </p>
      <p>
        <strong>Lasst die Odyssee beginnen!</strong>
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
