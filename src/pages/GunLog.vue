<template>
  <!-- <dev-box>state: {{ $store.state }}</dev-box> -->

  <ConfirmDialog></ConfirmDialog>
  <Toast />

  <div class="gunlog-container">
    <div class="gunlog-list">
      <GunList />
    </div>

    <div class="gunlog-content">
      <Card style="width: 100%" v-if="this.$store.state.gunDetails">
        <!-- <template #header>
          <div class="card-image">
            <img
              src="../assets/glock.png"
              style="height: 10rem; width: 13rem; margin: 0 auto"
            />
          </div>
        </template> -->
        <template #title>
          Model: {{ this.$store.state.gunDetails.model }}
        </template>
        <template #subtitle>
          Producent: {{ this.$store.state.gunDetails.manufacturer }}
        </template>
        <template #content>
          <div class="details">
            <ul>
              <li>
                <div class="gd-li-header">Kategoria</div>
                <div class="gd-li-body">
                  <Chip>
                    {{ this.$store.state.gunDetails.category }}
                  </Chip>
                </div>
              </li>
              <li>
                <div class="gd-li-header">Data zakupu</div>
                <div class="gd-li-body">
                  {{ formatDate(this.$store.state.gunDetails.date) }}
                </div>
              </li>
              <li>
                <div class="gd-li-header">Kaliber</div>
                <div class="gd-li-body">
                  {{ this.$store.state.gunDetails.caliber }}
                </div>
              </li>

              <li>
                <div class="gd-li-header">Stan</div>
                <div class="gd-li-body">
                  <Chip>
                    {{ this.$store.state.gunDetails.state }}
                  </Chip>
                </div>
              </li>
              <li>
                <div class="gd-li-header">Dodatkowe informacje</div>
                <div class="gd-li-body">
                  {{ this.$store.state.gunDetails.info }}
                </div>
              </li>
              <li>
                <div class="gd-li-header">Cena</div>
                <div class="gd-li-body">
                  {{ this.$store.state.gunDetails.price }} zł
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="card-footer">
            <div class="gunlog-footer-created">
              Utworzono:
              {{ formatDateFull(this.$store.state.gunDetails.timestamp) }}
            </div>
            <div class="card-footer-btns">
              <Button icon="pi pi-pencil" label="Edytuj" @click="editHandler" />
              <Button
                label="Usuń"
                icon="pi pi-trash"
                class="p-button-outlined p-button-danger card-footer-btn-delete"
                @click="deleteGun"
              />
            </div>
          </div>
        </template>
      </Card>
      <div v-else>
        <p>Wybierz broń z listy aby wyświetlić szczegóły.</p>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../services/gunbook.service';

// import DevBox from '../components/DevBox.vue';
import GunList from '../components/GunList.vue';

import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';

export default {
  components: {
    GunList,
    Card,
    Chip,
    Button,
    ConfirmDialog,
    Toast,
  },

  data() {
    return {};
  },

  methods: {
    formatDate(timestamp) {
      const d = new Date(timestamp);
      // const time = d.toLocaleTimeString('pl-PL', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });

      return d.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      // ' ' +
      // time.substr(0, 5)
    },

    formatDateFull(timestamp) {
      const d = new Date(timestamp);
      const time = d.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        d.toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }) +
        ' ' +
        time.substr(0, 5)
      );
    },

    deleteGun() {
      // Check if gun details object has firebase proprty with id to find it in Firebase. The gun has to be selected on the list
      const checkGunDetails = this.$store.state.gunDetails;

      if (checkGunDetails.firebaseKey) {
        this.$confirm.require({
          message: 'Jesteś pewien, że chcesz usunąć tę broń ze swojej szafy?',
          header: 'Usuń broń',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          acceptLabel: 'Tak',
          rejectLabel: 'Nie',
          accept: async () => {
            await service.deleteGun(this.$store.state.gunDetails.firebaseKey);
            await this.$store.commit('deleteGunLogDetails');
            await service.fetchGunsStorageFromFirebase(); // reload the gun storage on Vuex
            this.$toast.add({
              severity: 'info',
              summary: 'Usunięto',
              detail: 'Broń została pomyślnie usunięta.',
              life: 3000,
            });
          },
          reject: () => {
            // this.$toast.add({
            //   severity: 'error',
            //   summary: 'Rejected',
            //   detail: 'You have rejected',
            //   life: 3000,
            // });
          },
        });
      } else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Uwaga!',
          detail:
            'Aby usunąc broń, należy podświetlić ją na liście jednostek broni, znajdującej się po lewej stronie.',
          life: 3000,
        });
      }
    },

    editHandler() {
      this.$router.replace('/edit');
    },
  },
};
</script>

<style scoped>
.gunlog-container {
  /* width: 100%; */
  margin: 2rem 2rem;
  display: grid;
  grid-column-gap: 2rem;
  grid-template-rows: 1fr;
  grid-template-columns: 500px 1fr;
}

.gunlog-content {
  /* width: 100%; */
  display: flex;
  justify-content: center;
}

.gunlog-list {
}

.card-image {
  display: flex;
  justify-content: center;
}

.gun-detail-info {
  color: #a0a6ae;
}

.details {
}

ul {
  list-style: none;
}

li {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid#304562;
  display: flex;
}

li:last-child {
  border-bottom: none;
}

.gd-li-header {
  width: 300px;
  color: #a0a6ae;
  font-weight: 500;
}

.gd-li-body {
  width: 100%;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.gunlog-footer-created {
  color: #a0a6ae;
  font-size: 0.8rem;
}

.card-footer-btn-delete {
  margin-left: 1rem;
}
</style>
