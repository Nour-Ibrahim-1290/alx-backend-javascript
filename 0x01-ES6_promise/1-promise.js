export default function getFullResponseFromAPI(success) {
  return new Promise((resolve, reject) => {
      if (success) {
          resolve({
              body: 'Success',
              status: 200
          });
      } else {
          reject(new Error('The fake API is not working currently'));
      }
  });
}