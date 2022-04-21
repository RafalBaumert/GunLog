<template>
  <Toast position="top-center" />
  <ConfirmDialog></ConfirmDialog>

  <div class="new-gun">
    <form @submit.prevent="submitHandler">
      <Card style="width: 50em">
        <template #title> Nowa broń </template>
        <template #subtitle>
          Wypełnij poniższy formularz aby dodać broń.
        </template>
        <template #content>
          <div class="form-field radio-fields">
            <div class="field-radiobutton">
              <RadioButton
                id="pistol"
                name="pistol"
                value="pistolet"
                v-model="category"
              />
              <label for="pistol">pistolet</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="rifle"
                name="used"
                value="karabin"
                v-model="category"
              />
              <label for="rifle">karabin</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="shotgun"
                name="shotgun"
                value="strzelba"
                v-model="category"
              />
              <label for="shotgun">strzelba</label>
            </div>
          </div>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="manufacturer"
              type="text"
              v-model="manufacturer"
            />
            <label for="manufacturer">Producent</label>
          </span>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="model"
              type="text"
              v-model="model"
            />
            <label for="model">Model</label>
          </span>
          <span class="form-field p-float-label">
            <InputText
              class="input-field"
              id="caliber"
              type="text"
              v-model="caliber"
            />
            <label for="model">Kaliber</label>
          </span>
          <span class="form-field p-float-label">
            <Calendar
              class="input-field"
              id="date"
              v-model="date"
              autocomplete="off"
            />
            <label for="date">Data zakupu</label>
          </span>
          <span class="form-field p-float-label">
            <InputNumber
              class="input-field"
              id="price"
              v-model="price"
              mode="decimal"
              :minFractionDigits="2"
              :maxFractionDigits="10"
            />
            <label for="price">Cena</label>
          </span>
          <div class="form-field radio-fields">
            <div class="field-radiobutton">
              <RadioButton id="new" name="new" value="nowa" v-model="state" />
              <label for="new">nowa</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="used"
                name="used"
                value="używana"
                v-model="state"
              />
              <label for="used">używana</label>
            </div>
          </div>
          <div class="newgun-more-info">
            <label>Dodatkowe informacje</label>
            <Textarea v-model="info" rows="5" cols="77" />
          </div>
        </template>
        <template #footer>
          <div class="form-btns">
            <Button
              label="Anuluj"
              icon="pi pi-times"
              class="p-button-outlined p-button-secondary"
              iconPos="right"
              @click="clearForm"
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

    <!-- <h2>Dodaj nową broń</h2>
    <div class="form-field radio-fields">
      <div class="field-radiobutton">
        <RadioButton
          id="pistol"
          name="pistol"
          value="pistolet"
          v-model="category"
        />
        <label for="pistol">pistolet</label>
      </div>
      <div class="field-radiobutton">
        <RadioButton
          id="rifle"
          name="used"
          value="karabin"
          v-model="category"
        />
        <label for="rifle">karabin</label>
      </div>
      <div class="field-radiobutton">
        <RadioButton
          id="shotgun"
          name="shotgun"
          value="strzelba"
          v-model="category"
        />
        <label for="shotgun">strzelba</label>
      </div>
    </div>
    <span class="form-field p-float-label">
      <InputText
        class="input-field"
        id="manufacturer"
        type="text"
        v-model="manufacturer"
      />
      <label for="manufacturer">Producent</label>
    </span>
    <span class="form-field p-float-label">
      <InputText class="input-field" id="model" type="text" v-model="model" />
      <label for="model">Model</label>
    </span>
    <span class="form-field p-float-label">
      <InputText
        class="input-field"
        id="caliber"
        type="text"
        v-model="caliber"
      />
      <label for="model">Kaliber</label>
    </span>
    <span class="form-field p-float-label">
      <Calendar
        class="input-field"
        id="date"
        v-model="date"
        autocomplete="off"
      />
      <label for="date">Data zakupu</label>
    </span>
    <span class="form-field p-float-label">
      <InputNumber
        class="input-field"
        id="price"
        v-model="price"
        mode="decimal"
        :minFractionDigits="2"
        :maxFractionDigits="10"
      />
      <label for="price">Cena</label>
    </span>
    <div class="form-field radio-fields">
      <div class="field-radiobutton">
        <RadioButton id="new" name="new" value="nowa" v-model="state" />
        <label for="new">nowa</label>
      </div>
      <div class="field-radiobutton">
        <RadioButton id="used" name="used" value="używana" v-model="state" />
        <label for="used">używana</label>
      </div>
    </div>
    <div>
      <label>Dodatkowe informacje</label>
      <Textarea v-model="info" rows="5" cols="77" />
    </div>

    <div class="form-btns">
      <Button
        label="Anuluj"
        icon="pi pi-times"
        class="p-button-outlined p-button-secondary"
        iconPos="right"
        @click="clearForm"
      />
      <Button type="submit" label="Zapisz" icon="pi pi-check" iconPos="right" />
    </div> -->
  </div>
</template>

<script>
import service from '../services/gunbook.service';

import Card from 'primevue/card';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  components: {
    Card,
    Toast,
    InputText,
    Calendar,
    InputNumber,
    RadioButton,
    Button,
    Textarea,
    ConfirmDialog,
  },

  data() {
    return {
      timestamp: null,
      category: null,
      manufacturer: '',
      model: '',
      caliber: '',
      date: '',
      price: null,
      state: null,
      info: '',
    };
  },

  methods: {
    generateUID() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },

    submitHandler() {
      // this.$toast.add({
      //   severity: 'error',
      //   summary: 'Błąd logowania',
      //   detail:
      //     'Wystąpił problem. Wprowadź poprawny adres, hasło i spróbuj ponownie.',
      //   life: 3000,
      // });
      this.confirm();
    },

    clearForm() {
      this.timestamp = null;
      this.category = null;
      this.manufacturer = '';
      this.model = '';
      this.caliber = '';
      this.date = '';
      this.price = null;
      this.state = null;
      this.info = '';
    },

    confirm() {
      const gunDetails = {
        id: this.generateUID(),
        timestamp: new Date(),
        category: this.category,
        manufacturer: this.manufacturer,
        model: this.model,
        caliber: this.caliber,
        date: this.date,
        price: this.price,
        state: this.state,
        info: this.info,
      };

      this.$confirm.require({
        message: 'Na pewno dodać tę broń do twojej szafy?',
        header: 'Nowa broń',
        icon: 'pi pi-question',
        acceptLabel: 'Tak',
        rejectLabel: 'Nie',
        accept: async () => {
          //callback to execute when user confirms the action
          await this.$store.dispatch('loadGunDetails', gunDetails);
          await service.sendNewGunToFirebase(gunDetails);
          this.clearForm();
          this.$router.replace('/gunlog');
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
  },
};
</script>

<style scoped>
.new-gun {
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

.newgun-more-info {
  display: flex;
  flex-direction: column;
}

.form-btns {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
