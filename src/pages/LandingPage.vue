<template>
  <!-- <dev-box>state: {{ $store.state }}</dev-box> -->

  <div class="laning-page-container">
    <div class="landing-page-content">
      <div class="laning-page-description">
        <h1>My Guns</h1>
        <div class="laning-page-description-text">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
            expedita velit soluta? Nostrum blanditiis vero alias consequatur
            deserunt sint, nemo rerum. Cum quas provident deleniti maxime
            consectetur doloremque, magni temporibus.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            quas harum reprehenderit mollitia!
          </p>
          <!-- <p>
            My Guns pomaga nie tylko rejestrować zawartość własnej szafy na
            broń, zapasów amunicji ale również logować wyniki z zawodów czy
            pobytów na strzelnicy.
          </p>
          <p>
            I tym wszystkim możesz dzielić się z innymi użytkownikami, których
            pasją jest strzelectwo.
          </p> -->
        </div>
      </div>
      <div class="laning-page-form"><Authorization /></div>
    </div>
    <div class="landing-page-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
// import DevBox from '../components/DevBox.vue';
import Authorization from '../components/Authorization.vue';
import Footer from '../components/Footer.vue';

export default {
  components: { Authorization, Footer },
};
</script>

<style scoped>
.laning-page-container {
  display: grid;
  grid-template-rows: 70% 30%;
  grid-template-columns: 1fr;
  height: 100vh;
  /* background: yellow; */
}

.landing-page-content {
  margin: 6rem auto;
  /* width: 980px; */
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: minmax(500px, min-content) max-content;
  grid-column-gap: 2rem;
  /* display: flex;
  flex-direction: row; */
  /* background: plum; */
}

.laning-page-description {
  display: flex;
  flex-direction: column;
  align-self: center;
  /* width: 50%; */
  /* margin: 2rem 5rem; */
  /* background: orangered; */
}

h1 {
  /* margin-bottom: 3rem; */
  color: #81c784;
}

p {
  margin-top: 2rem;
}

.laning-page-form {
  margin: 0 auto;
  /* width: 50%; */
  display: flex;
  flex-direction: column;
  align-self: center;
  /* background: hotpink; */
}

.landing-page-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
