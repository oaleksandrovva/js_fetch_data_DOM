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

function displayPhones(phones) {
  const phonesList = document.createElement('ul');

  phones.forEach(phone => {
    const itemOfPhoneName = document.createElement('li');

    itemOfPhoneName.textContent = phone.name;
    phonesList.append(itemOfPhoneName);
  });

  document.body.append(phonesList);

  return phones;
}

getPhones(LIST_URL)
  .then(displayPhones)
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails);
