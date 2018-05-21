const postPhoto = (title, url) => {
  fetch('/api/v1/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, url }),
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
};

const savePhoto = event => {
  const { title, url } = event.target;
  event.preventDefault();
  postPhoto(title.value, url.value);
};

document
  .querySelector('#add-photos-form')
  .addEventListener('submit', savePhoto);
