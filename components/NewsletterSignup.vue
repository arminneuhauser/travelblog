<template>
  <section class="newsletter-signup">
    <div class="container">
      <h2>
        {{ blok.headline }}<br>
        {{ blok.subheadline }}
      </h2>
      <!-- Begin Mailchimp Signup Form -->
      <div id="mc_embed_signup">
        <form action="https://solmates.us4.list-manage.com/subscribe/post?u=0da2999b05bab86e1496beaa8&amp;id=747fd43d15" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" :placeholder="blok.placeholder" required>
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0da2999b05bab86e1496beaa8_747fd43d15" tabindex="-1" value=""></div>
              <button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button">
                <span>{{ blok.button_text }}</span>
                <svg class="rotate-270"><use xlink:href="#down"></use></svg>
              </button>
            </div>
        </form>
      </div>

      <!--End mc_embed_signup-->
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.newsletter-signup {
  background: #2b3858;
  text-align: center;
  padding: 70px 0;

  @include breakpoint(l) {
    padding: 100px 0;
  }

  h2 {
    color: #fff;
    margin-top: 0;
    font-weight: normal;
  }

  #mc_embed_signup_scroll {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    input {
      border: 0;
      border-radius: 4px 0 0 4px;
      height: 42px;
      padding: 10px 15px;
      font-size: 1.6rem;
      font-weight: 400;
      font-family: $fs-sans;
      flex-grow: 1;
      max-width: 300px;

      &:focus {
        outline: none;
      }
    }

    button {
      border: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      svg {
        display: none;
      }
    }

    @include breakpoint(s, max) {
      background: #fff;
      padding: 0 5px;
      height: 50px;
      border-radius: 25px;
      justify-content: space-between;

      input {
        background: none;
      }

      button {
        background: none;
        padding: 0;
        display: flex;
        border-radius: 100%;

        &:hover {
          background: $cta;

          svg {
            fill: #fff;
          }
        }

        svg {
          display: block;
          fill: $tint;
          width: 41px;
          height: 41px;
        }

        span {
          display: none;
        }
      }
    }
  }
}
</style>
