// import { AxiosError } from 'axios';
// import actions from '@/store/actions';
// import Vue from 'vue';

// export interface CustomError {
//   isError: boolean;
//   message: string;
//   description: string;
//   error: AxiosError | Error;
//   status: number;
// }

// export default function errorHandler(error: AxiosError, description: string): CustomError {
//   const customError = {
//     isError: true,
//     message: '',
//     description: '',
//     status: 0,
//     error,
//   };

//   if (error.response) {
//     // destructure response from error
//     const { response } = error;

//     // extract status from response
//     customError.status = response.status;

//     // extract message from response
//     if (typeof response.data === 'string') {
//       customError.message = response.data;
//     } else {
//       customError.message = response.data.message || response.data.error || response.statusText;
//     }
//   } else if (error.request) {
//     // server did not respond
//     customError.message = 'Error contacting server';
//   } else {
//     // no request was sent due to axios error
//     customError.message = 'Could not send request';
//   }

//   // logout on expired token error
//   if (customError.message.includes('JWT expired')) {
//     // eslint-disable-next-line no-alert
//     alert('Sesja użytkownika wygasła, zaloguj sie ponownie.');
//     actions.logout();
//   }

//   if (description) customError.description = description;

//   Vue.notify({
//     title: customError.description,
//     text: customError.message,
//     type: 'error',
//     duration: 5000,
//   });

//   console.warn(
//     customError.description, customError,
//   );
//   return customError;
// }
