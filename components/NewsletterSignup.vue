<template>
  <section class="newsletter-signup">
    <div class="container">
      <h1>
        Gefallen dir unsere Beiträge?<br>
        Melde dich für unseren Newsletter an
      </h1>
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
              <div class="clear"><input type="submit" value="Jetzt anmelden" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
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

  h1 {
    color: #fff;
    margin-top: 0;
    font-weight: normal;
  }

  .text-field {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
