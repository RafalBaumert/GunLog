<template>
  <nav>
    <Menubar :model="items"></Menubar>
  </nav>
</template>

<script>
import service from '../services/gunbook.service';
import Menubar from 'primevue/menubar';

export default {
  components: { Menubar },

  data() {
    return {
      items: [
        // {
        //   label: 'Główna',
        //   icon: 'pi pi-fw pi-home',
        //   command: () => {
        //     this.$router.replace('/dashboard');
        //   },
        // },
        {
          label: 'Szafa',
          icon: 'pi pi-fw pi-box',
          items: [
            {
              label: 'Broń',
              icon: 'pi pi-fw pi-list',
              command: () => {
                this.$router.replace('/gunlog');
              },
            },
            // {
            //   label: 'Amunicja',
            //   icon: 'pi pi-fw pi-list',
            //   command: () => {
            //     this.$router.replace('/gunlog');
            //   },
            // },
            {
              label: 'Dodaj nową broń',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.$router.replace('/addgun');
              },
            },
            // {
            //   label: 'Dodaj amunicję',
            //   icon: 'pi pi-fw pi-plus',
            //   command: () => {
            //     this.$router.replace('/addgun');
            //   },
            // },
          ],
        },
        // {
        //   label: 'Strzelcy',
        //   icon: 'pi pi-fw pi-users',
        //   command: () => {
        //     this.$router.replace('/shooters');
        //   },
        // },
        // {
        //   label: 'Ustawienia',
        //   icon: 'pi pi-fw pi-cog',
        //   command: () => {
        //     this.$router.replace('/settings');
        //   },
        // },
        {
          label: 'Wyloguj',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            service.logout();
            this.$router.replace('/');
          },
        },
      ],
    };
  },
};
</script>
