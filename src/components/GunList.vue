<template>
  <div class="gun-list">
    <div class="gun-list-card">
      <Card>
        <template #subtitle>Lista jednostek broni</template>
        <template #content>
          <div v-if="guns.length > 0">
            <DataTable
              class="p-datatable-sm"
              :value="guns"
              v-model:selection="selectedProduct"
              selectionMode="single"
              dataKey="id"
              @rowSelect="onRowSelect"
              @rowUnselect="onRowUnselect"
              responsiveLayout="scroll"
            >
              <Column field="manufacturer" header="Producent"></Column>
              <Column field="model" header="Model"></Column>
              <Column
                field="category"
                header="Kategoria"
                :sortable="true"
              ></Column>
            </DataTable>
            <div class="gunlist-add-btn">
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-outlined p-button-sm"
                @click="addBtnHandler"
              />
            </div>
          </div>
          <div v-else>
            <p>
              Brak broni.
              <router-link to="/addgun" class="router-link">Dodaj</router-link>
              nową broń.
            </p>
            <div class="gunlist-add-btn">
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-outlined p-button-sm"
                @click="addBtnHandler"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import service from '../services/gunbook.service';
import store from '../store';

import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

export default {
  components: { Card, DataTable, Column, Button },

  data() {
    return {
      guns: [],
      selectedProduct: null,
    };
  },

  watch: {
    async gunsChange() {
      this.guns = await service.fetchGunsStorageFromFirebase();
    },
  },

  computed: {
    // with watcher we see if there is a change on Vuex gunsStorage
    gunsChange() {
      if (store.state.gunsStorage !== undefined) {
        return store.state.gunsStorage.length;
      }
      return false;
    },
  },

  methods: {
    onRowSelect(event) {
      this.$store.dispatch('loadGunDetails', event.data);
    },
    onRowUnselect(event) {
      console.log(event);
    },
    async loadGunsStorage() {
      this.guns = await service.fetchGunsStorageFromFirebase();
    },
    addBtnHandler() {
      this.$router.replace('/addgun');
    },
  },

  beforeMount() {
    this.loadGunsStorage();
  },
};
</script>

<style scoped>
.gun-list-card {
  width: 100%;
  /* margin-left: 2rem; */
}

.router-link {
  color: #81c784;
  text-decoration: none;
}

.gunlist-add-btn {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>
