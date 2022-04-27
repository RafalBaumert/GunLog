<template>
  <div class="add-options">
    <h3>Dodaj więcej opcji:</h3>
    <div
      class="add-option-item"
      v-if="this.$store.state.gunDetailsEdited.nextCleanDate === undefined"
    >
      <Button
        id="nextGunCleanDate"
        icon="pi pi-plus"
        class="p-button-rounded p-button-text"
        @click="nextGunCleanDate"
      />
      <label for="nextGunCleanDate" class="option-label">
        <span class="add-option-desc">Data ostatniego czyszczenia</span>
      </label>
    </div>
    <div class="add-option-item" v-else>
      <Button
        id="nextGunCleanDate"
        icon="pi pi-minus"
        class="p-button-rounded p-button-text p-button-danger"
        @click="deleteOption('nextCleanDate')"
      />
      <label for="nextGunCleanDate" class="option-label">
        <span class="add-option-desc shadow">Data ostatniego czyszczenia</span>
      </label>
    </div>
    <div class="add-option-item">
      <Button icon="pi pi-plus" class="p-button-rounded p-button-text" />
      <span class="add-option-desc">Termin kolejnego czyszczenia</span>
    </div>
    <div class="add-option-item">
      <Button icon="pi pi-plus" class="p-button-rounded p-button-text" />
      <span class="add-option-desc">Ilość wystrzelonej amunicji</span>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  components: { Button },

  data() {
    return {
      gunDetailsEdited: {},
      isNextCleanDate: false,
    };
  },

  methods: {
    nextGunCleanDate() {
      this.$store.dispatch('updateGunDetailsEdited', { nextCleanDate: null });
    },

    deleteOption(optionName) {
      delete this.$store.state.gunDetailsEdited[`${optionName}`];
    },
  },

  async beforeMount() {
    this.gunDetailsEdited = await this.$store.state.gunDetailsEdited;
    this.gunDetailsEdited.nextCleanDate
      ? (this.isNextCleanDate = true)
      : (this.isNextCleanDate = false);
  },
};
</script>

<style scoped>
.add-options {
  margin-right: 3rem;
  font-size: 0.85rem;
}

h3 {
  margin-bottom: 1rem;
}

.add-option-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.add-option-desc {
  padding-left: 1rem;
}

.option-label {
  cursor: pointer;
}

.shadow {
  color: #9fa3a9;
  opacity: 0.4;
}
</style>
