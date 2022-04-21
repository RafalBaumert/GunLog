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
          </div>
          <div v-else>
            <p>
              Brak broni.
              <router-link to="/addgun" class="router-link">Dodaj</router-link>
              nową broń.
            </p>
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

export default {
  components: { Card, DataTable, Column },

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
  },

  beforeMount() {
    this.loadGunsStorage();
  },

  expandNode(node) {
    if (node.items && node.items.length) {
      this.expandedKeys[node.key] = true;

      for (let child of node.items) {
        this.expandNode(child);
      }
    }
    console.log(node);
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
</style>
