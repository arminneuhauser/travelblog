<template>
  <section class="newsletter-signup">
    <div class="container">
      <h2>
        Gefallen dir unsere Beiträge?<br>
        Melde dich für unseren Newsletter an
      </h2>
      <!-- Begin Mailchimp Signup Form -->
      <div id="mc_embed_signup">
        <form action="https://solmates.us4.list-manage.com/subscribe/post?u=0da2999b05bab86e1496beaa8&amp;id=747fd43d15" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
              <div class="text-field">
                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="E-Mail-Adresse" required>
                <label for="mce-EMAIL">Deine E-Mail-Adresse</label>
              </div>
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0da2999b05bab86e1496beaa8_747fd43d15" tabindex="-1" value=""></div>
              <button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button">
                <span>Anmelden</span>
                <svg class="rotate-270"><use xlink:href="#down"></use></svg>
              </button>
            </div>
        </form>
      </div>

      <!--End mc_embed_signup-->
    </div>
  </section>
</template>

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

    .text-field {
      margin: 0;

      input {
        border: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        height: 42px;
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
      padding: 0 5px;
      background: #fff;
      height: 50px;
      border-radius: 25px;
      justify-content: space-between;

      .text-field {
        input {
          background: none;
        }
      }

      button {
        background: none;
        padding: 0;
        display: flex;

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
