<template>
  <Toast position="top-center" />

  <div class="auth-container">
    <div class="auth-form">
      <Card>
        <template #title> {{ submitButtonCaption }} </template>
        <template #content>
          <form @submit.prevent="submitFormHandler">
            <div v-if="mode === 'signup'">
              <span class="auth-form-input p-float-label">
                <InputText
                  class="auth-form-input-text"
                  id="firstName"
                  type="text"
                  v-model="firstName"
                />
                <label for="firstName">Imię</label>
              </span>
              <span class="auth-form-input p-float-label">
                <InputText
                  class="auth-form-input-text"
                  id="lastName"
                  type="text"
                  v-model="lastName"
                />
                <label for="lastName">Nazwisko</label>
              </span>
            </div>
            <span class="auth-form-input p-float-label">
              <InputText
                class="auth-form-input-text"
                id="email"
                type="text"
                v-model="email"
              />
              <label for="email">e-mail</label>
            </span>
            <span class="auth-form-input p-float-label">
              <Password
                class="auth-form-input-text"
                id="password"
                v-model="password"
                :feedback="false"
              />
              <label for="password">Hasło</label>
            </span>

            <div class="auth-form-btns">
              <Button
                :label="switchModeButtonCaption"
                class="p-button-link"
                @click.prevent="switchAuthMode"
              />
              <Button
                :label="submitButtonCaption"
                class="p-button"
                type="submit"
              />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import service from '../services/gunbook.service';

import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

export default {
  components: { Card, InputText, Password, Button, Toast },

  data() {
    return {
      mode: 'login',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Zaloguj się';
      } else {
        return 'Zarejestruj się';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Załóż konto';
      } else {
        return 'Masz już konto? Zaloguj się';
      }
    },
  },

  methods: {
    async submitFormHandler() {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await service.login(userData);
          // await this.$store.dispatch('login', {
          //   email: this.userName,
          //   password: this.password,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          // });
          this.$router.replace('/gunlog');
        } else {
          await service.signup(userData);

          //   this.$store.dispatch('signup', {
          //     email: this.userName,
          //     password: this.password,
          //     firstName: this.firstName,
          //     lastName: this.lastName,
          //     readAuthors: this.readAuthors,
          //   });
        }
        this.$router.replace('/gunlog');
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
        this.showError();
      }

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    showError() {
      this.$toast.add({
        severity: 'error',
        summary: 'Błąd logowania',
        detail:
          'Wystąpił problem. Wprowadź poprawny adres, hasło i spróbuj ponownie.',
        life: 3000,
      });
    },
  },
};
</script>

<style scoped>
.auth-container {
  margin: 0 auto;
}

.auth-form {
  width: 25rem;
}

.auth-form-input {
  margin-bottom: 2rem;
  width: 100%;
}

.auth-form-input-text {
  width: 100%;
}

::v-deep(.p-password input) {
  width: 100%;
}

.auth-form-btns {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
