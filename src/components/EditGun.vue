<template>
  <div class="editgun">
    <div><MoreOptions /></div>

    <form @submit.prevent="editSubmitHandler">
      <Card style="width: 50em">
        <template #title> Edycja </template>
        <template #content>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="manufacturer"
              type="text"
              v-model="gunDetailsEdited.manufacturer"
            />
            <label for="manufacturer">Producent</label>
          </span>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="model"
              type="text"
              v-model="gunDetailsEdited.model"
            />
            <label for="model">Model</label>
          </span>
          <div class="form-field radio-fields">
            <div class="field-radiobutton">
              <RadioButton
                id="pistol"
                name="pistol"
                value="pistolet"
                v-model="gunDetailsEdited.category"
              />
              <label for="pistol">pistolet</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="rifle"
                name="used"
                value="karabin"
                v-model="gunDetailsEdited.category"
              />
              <label for="rifle">karabin</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="shotgun"
                name="shotgun"
                value="strzelba"
                v-model="gunDetailsEdited.category"
              />
              <label for="shotgun">strzelba</label>
            </div>
          </div>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="caliber"
              type="text"
              v-model="gunDetailsEdited.caliber"
            />
            <label for="model">Kaliber</label>
          </span>
          <span class="form-field p-float-label">
            <Calendar
              class="input-field"
              id="date"
              v-model="gunDetailsEdited.date"
              autocomplete="off"
            />
            <label for="date">Data zakupu</label>
          </span>
          <span class="form-field p-float-label">
            <InputNumber
              class="input-field"
              id="price"
              v-model="gunDetailsEdited.price"
              mode="decimal"
              :minFractionDigits="2"
              :maxFractionDigits="10"
            />
            <label for="price">Cena</label>
          </span>
          <div class="form-field radio-fields">
            <div class="field-radiobutton">
              <RadioButton
                id="new"
                name="new"
                value="nowa"
                v-model="gunDetailsEdited.state"
              />
              <label for="new">nowa</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="used"
                name="used"
                value="używana"
                v-model="gunDetailsEdited.state"
              />
              <label for="used">używana</label>
            </div>
          </div>
          <div class="gunedit-more-info form-field">
            <label>Dodatkowe informacje</label>
            <Textarea v-model="gunDetailsEdited.info" rows="5" cols="77" />
          </div>
          <transition>
            <span
              class="form-field p-float-label"
              v-if="
                this.$store.state.gunDetailsEdited.nextCleanDate !== undefined
              "
            >
              <Calendar
                class="input-field"
                id="date"
                v-model="gunDetailsEdited.nextCleanDate"
                autocomplete="off"
              />
              <label for="date">Data czyszczenia</label>
            </span>
          </transition>
        </template>
        <template #footer>
          <div class="editgun-card-btns">
            <Button
              label="Anuluj"
              icon="pi pi-times"
              class="p-button-outlined p-button-secondary"
              iconPos="right"
              @click="cancelHandler"
            />
            <Button
              type="submit"
              label="Zapisz"
              icon="pi pi-check"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script>
import service from '../services/gunbook.service';

import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';

import MoreOptions from './MoreOprions.vue';

export default {
  components: {
    Card,
    InputText,
    RadioButton,
    Button,
    Calendar,
    InputNumber,
    Textarea,
    MoreOptions,
  },

  data() {
    return {
      gunDetailsEdited: {},
    };
  },

  methods: {
    formatDate(timestamp) {
      const d = new Date(timestamp);

      return d.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },

    async cancelHandler() {
      await this.$router.replace('/gunlog');
      await this.$store.dispatch('clearGunDetailsEdited');
    },

    async editSubmitHandler() {
      this.gunDetailsEdited.modified = new Date();
      await this.$store.dispatch('loadGunDetails', this.gunDetailsEdited);
      await service.updateGun(this.gunDetailsEdited);
      this.$router.replace('/gunlog');
    },
  },

  beforeMount() {
    // create new object & copy content from gunDetails
    this.gunDetailsEdited = {
      ...this.$store.state.gunDetails,
      // date:
      //   this.$store.state.gunDetails.date === undefined ||
      //   this.$store.state.gunDetails.date === null ||
      //   this.$store.state.gunDetails.date === ''
      //     ? ''
      //     : this.formatDate(this.$store.state.gunDetails.date),
      ...(this.$store.state.gunDetails.nextCleanDate && {
        // nextCleanDate:
        //   this.$store.state.gunDetails.nextCleanDate === undefined ||
        //   this.$store.state.gunDetails.nextCleanDate === null ||
        //   this.$store.state.gunDetails.nextCleanDate === ''
        //     ? ''
        //     : // : this.formatDate(this.$store.state.gunDetails.nextCleanDate),
        //       this.$store.state.gunDetails.nextCleanDate,
        nextCleanDate: this.$store.state.gunDetails.nextCleanDate,
      }),
    };
    // add the object gunDetailsEdited to Vuex state
    this.$store.dispatch('updateGunDetailsEdited', this.gunDetailsEdited);
  },
};
</script>

<style scoped>
.editgun {
  width: 80%;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
}

.form-field {
  margin-bottom: 2rem;
}

.input-field {
  width: 100%;
}

.radio-fields {
  display: flex;
}

.field-radiobutton label {
  margin-left: 0.5rem;
  margin-right: 2rem;
}

.gunedit-more-info {
  display: flex;
  flex-direction: column;
}

.editgun-card-btns {
  margin-top: 0rem;
  display: flex;
  justify-content: space-between;
}

/* Animations */
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: all 0.3s ease-in;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 0.3s ease-out;
}
.v-leave-to {
  opacity: 0;
}
</style>
