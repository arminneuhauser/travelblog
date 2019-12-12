<template>
  <div class="timeline__item">
    <p class="city">{{ blok.city }}</p>
    <p><small>{{ blok.accomodation }}</small></p>
    <p><small>{{ formatDate(blok.from, 'DD.MM.YY') }} – {{ formatDate(blok.to, 'DD.MM.YY') }}</small></p>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/helper'

export default {
  props: ['blok'],
  methods: {
    formatDate
  }
}
</script>

<style lang="scss">
.timeline {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;

  &::before,
  &::after {
    content: '';
    width: 80px;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }

  @include breakpoint(xl) {
    &::before {
      left: 0;
      background: linear-gradient(to left, rgba(#F2F6FA, 0) 0%, rgba(#F2F6FA, 0.6) 50%, #F2F6FA 100%);
    }
  }

  &::after {
    right: 0;
    background: linear-gradient(to right, rgba(#F2F6FA, 0) 0%, rgba(#F2F6FA, 0.6) 50%, #F2F6FA 100%);
  }

  > div {
    margin: 50px auto 0 auto;
    max-width: 1436px;
    text-align: left;
    display: flex;
  }

  .timeline__item {
    flex-basis: 170px;
    flex-shrink: 0;
    scroll-snap-align: start;
    position: relative;
    padding: 0 0 50px 20px;
    margin: 0 0 0 30px;

    @include breakpoint(xl) {
      &:first-child {
        margin-left: 86px;
      }
    }

    &:last-child {
      p:first-child::after {
        content: "";
        display: block;
        position: absolute;
        right: -80px;
        width: 80px;
        height: 1px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: calc(100% - 20px);
      top: 20px;
      left: 0;
      background: linear-gradient(rgba(#2398AB,0.3) 60%, rgba(#2398AB,0));
    }

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 6px;
      left: -6px;
      border: 4px solid #2398AB;
      border-radius: 100%;
      background: rgba(#2398AB, 0.1);
      box-sizing: border-box;
    }

    p {
      margin: 0;

      &:not(.city) {
        opacity: 0.8;
      }
    }

    .city {
      font-family: $fs-serif;
      font-weight: 600;
      font-size: 2rem;
    }
  }
}
</style>
