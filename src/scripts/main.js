'use strict';

const LIST_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(
            `${response.status} - ${response.statusText}`
          ));
        }

        return response.json();
      })
      .then(result => {
        return resolve(result);
      });

    setTimeout(() => {
      reject(new Error('Error'));
    }, 5000);
  });
}

function getPhonesDetails(ids) {
  const phonesDetails = ids.map(id => (
    fetch(`${DETAILS_URL}${id}.json`)
  ));

  return Promise.all(phonesDetails);
}

getPhones(LIST_URL)
  .then(phones => {
    const listOfPhoneName = document.createElement('ul');

    phones.forEach(phone => {
      const itemOfPhoneName = document.createElement('li');

      itemOfPhoneName.textContent = phone.name;
      listOfPhoneName.append(itemOfPhoneName);
    });

    document.body.append(listOfPhoneName);
  })
  .then(result => {
    return getPhonesDetails(result);
  });
