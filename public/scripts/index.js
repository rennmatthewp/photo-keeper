const deletePhotoDisplay = id => {
  document.getElementById(id).remove();
};

// eslint-disable-next-line
const deletePhoto = id => {
  fetch(`/api/v1/photos/${id}`, {
    method: 'DELETE',
  });
  deletePhotoDisplay(id);
};

const displaySavedPhotos = photosArr => {
  const photosHTML = photosArr.map(photo => {
    const photoDisplay = `
      <article class="photo-display" id="${photo.id}">
        <a href="${photo.url}"><img class="photo" src=${photo.url}></a>
        <h6 class="photo-title">${photo.title}</h6>
        <button class="delete-photo-button" onclick="deletePhoto(${photo.id})">X</button>
      </article>
    `;
    return photoDisplay;
  });

  document.querySelector('#photos-display').innerHTML = photosHTML.join('');
};

const getSavedPhotos = () => {
  fetch('/api/v1/photos')
    .then(response => response.json())
    .then(result => displaySavedPhotos(result))
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', getSavedPhotos);

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
  title.value = '';
  url.value = '';
};

document
  .querySelector('#add-photos-form')
  .addEventListener('submit', savePhoto);
