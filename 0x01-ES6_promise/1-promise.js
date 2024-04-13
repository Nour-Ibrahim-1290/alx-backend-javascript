export default function getFullResponseFromAPI(success) {
  return new Promise((resolve, reject) => {
    if (success === true) {
      resolve({ status: 200, body: 'Success' });
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(new Error('The fake API is not working currently'));
    }
  });
}
