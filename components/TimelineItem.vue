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
  padding-left: 15px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
  scrollbar-color: #B9BBBD #F2F6FA;

  @include breakpoint(xl) {
    padding-left: 0;
  }

  &::-webkit-scrollbar {
    height: 11px;
  }
  &::-webkit-scrollbar-track {
    background: #F2F6FA;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #B9BBBD;
    border-radius: 6px;
    border: 3px solid #F2F6FA;
  }

  &::before,
  &::after {
    content: '';
    width: 80px;
    height: 122px;
    position: absolute;
    bottom: 11px;
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
    flex-basis: 185px;
    flex-shrink: 0;
    scroll-snap-align: start;
    position: relative;
    padding: 0 0 50px 20px;
    margin: 0 0 0 15px;

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
      top: 20px;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 100px 2px 0 2px;
      border-color: rgba(#2398AB,0.3) transparent transparent transparent;
    }

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 8px;
      left: -6px;
      border: 4px solid #2398AB;
      border-radius: 100%;
      background: rgba(#2398AB, 0.1);
      box-shadow: 0 2px 3px 0 rgba(#2398AB, 0.35);
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
