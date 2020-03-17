<template>
  <modal name="corona-modal" class="corona-modal" :adaptive="true" scrollable="true" width="90%" maxWidth="1136" height="auto">
    <button @click="$modal.hide('corona-modal')">
      <svg><use xlink:href="#close"></use></svg>
    </button>
    <div class="corona-modal-content">
      <h1>Coronavirus in Peru</h1>
      <p>
        Wir sitzen hier fest, abgeschottet vom Rest.
      </p>
      <p>
        Seit Freitag überschlagen sich die Ereignisse in Peru. Da hieß es Freitag noch, dass ab Montag keine Flüge mehr nach und von Europa genehmigt werden und am Montag wird plötzlich der Notstand ausgerufen – keine Sehenswürdigkeiten, keine Geschäfte, nur noch Lebensmittelgeschäfte, Banken und Apotheken haben geöffnet, niemand soll sich ohne Grund nach draußen begeben.
      </p>
      <p>
        Jeder Europäer weiß genau wovon wir reden und wie sich das anfühlt. Es macht allerdings schon einen Unterschied, ob man diese Maßnahmen in gewohnter Umgebung erlebt. Als wir die Neuigkeiten gehört haben, waren wir wahnsinnig überfordert und wussten für einen Moment nicht weiter. Am Montag Morgen gingen wir zum Konsulat in Cusco und stellten fest, dass wir nicht die einzigen sind, denen es so geht. Es hilft einem immens, wenn man nicht mehr das Gefühl hat, alleine zu sein. Für uns alle gingen diese Maßnahmen zu schnell.
      </p>
      <p>
        Uns wurde keine Zeit gegeben eine Lösung zu finden, die leistbar wäre. Denn ja, man konnte auch am Montag noch einen Direktflug finden, zumindest nach Deutschland. Wir haben zwar Geld für unsere Reise gespart, aber zigtausende Euro für einen Flug haben wir dann doch nicht.
        Natürlich, wir hätten es kommen sehen können, mögen sich jetzt einige denken. Naja, ein wenig haben wir das wohl auch, die Möglichkeit, dass es auch hier zu solchen Maßnahmen kommen könnte, stand immer im Raum. Wir hätten nur nicht damit gerechnet, dass wir keine Möglichkeit mehr haben würden, unsere Reise kurzfristig zu beenden.
      </p>
      <p>
        Durch ein deutsches Paar, das wir beim Konsulat kennenlernten, fanden wir ein wunderschönes Hotel, das uns zu einem leistbaren Preis ein Doppelzimmer mit privatem Bad zur Verfügung stellte. Und nicht nur das: Uns und einigen anderen Gestrandeten wird eine Küche aufgebaut, ein leckeres Frühstück bereitet, eine Spielkonsole und Brettspiele besorgt... es wird alles versucht, um uns den (mindestens) 14-tägigen Aufenthalt hier so angenehm wie möglich zu gestalten. Wir sind also wirklich gut aufgehoben. <strong>Macht euch keine Sorgen!</strong>
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
    font-size: 1.5rem;

    &:last-of-type {
      margin: 0;
    }
  }
}
</style>
