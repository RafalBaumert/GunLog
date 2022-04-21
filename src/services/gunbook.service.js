export const DATABASE_LINK = 'https://myguns-dev-default-rtdb.firebaseio.com/'; // e2e
const WEB_API_KEY = 'AIzaSyDih3HXZBE7zvqSnKUjtAeEmQiRzmTykDQ'; // e2e

import store from '../store';

const service = {
  async signup(userData) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          'Błąd autoryzacji. Sprawdź poprawność loginu i hasła.'
      );
      throw error;
    }

    store.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      tokenExpiration: responseData.exiresIn,
    });

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    // Dispatch the action for adding new user data to firebase.
    await this.addNewUser({
      userId: responseData.localId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
  },

  async addNewUser(userData) {
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      userId: userData.userId,
    };

    const response = await fetch(
      `${DATABASE_LINK}users/${userData.userId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }
    );

    if (!response.ok) {
      //error
    }

    // Update the state from main index.js.
    // Caanot change state directly.
    // Needs to be changed (e.g. by mutations)
    // store.state.firstName = payload.firstName;
    // store.state.lastName = payload.lastName;
    // store.state.email = payload.email;
  },

  async login(userData) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Błąd autoryzacji. Sprawdź swój login i hasło.'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 10000;
    // const expiresIn = 5000; // logout after 5 seconds
    const expirationDate = new Date().getTime() + expiresIn;

    // timer = setTimeout(function () {
    //   context.dispatch('autoLogout');
    // }, expiresIn);

    // Store token into local storage to avoid lost data while page is refreshed
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    store.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    // clearTimeout(timer);

    store.commit('setUser', {});
  },

  async sendNewGunToFirebase(details) {
    const userId = store.state.user.userId;

    const newGunDetails = {
      id: details.id,
      timestamp: details.timestamp,
      category: details.category,
      manufacturer: details.manufacturer,
      model: details.model,
      caliber: details.caliber,
      date: details.date,
      price: details.price,
      state: details.state,
      info: details.info,
    };

    const response = await fetch(`${DATABASE_LINK}${userId}/gunStorage.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGunDetails),
    });

    if (!response.ok) {
      //error
    }
  },

  async fetchGunsStorageFromFirebase() {
    //  const token = context.rootGetters.token;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const response = await fetch(
      `${DATABASE_LINK}${userId}/gunStorage.json?auth=` + token
    );

    const responseData = await response.json();

    // For error handling
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const guns = [];

    for (const userUID in responseData) {
      const gun = {
        firebaseKey: userUID,
        id: responseData[userUID].id,
        timestamp: responseData[userUID].timestamp,
        category: responseData[userUID].category,
        manufacturer: responseData[userUID].manufacturer,
        model: responseData[userUID].model,
        caliber: responseData[userUID].caliber,
        date: responseData[userUID].date,
        price: responseData[userUID].price,
        state: responseData[userUID].state,
        info: responseData[userUID].info,
      };

      guns.push(gun);
    }

    store.commit('setGunsStorage', guns);

    return guns;
  },

  async deleteGun(gunId) {
    const userId = localStorage.getItem('userId');

    const response = await fetch(
      `${DATABASE_LINK}${userId}/gunStorage/${gunId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // For error handling
    }
  },
};

export default service;
