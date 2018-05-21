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

const createPhotoDisplay = photoObj => {
  return `
    <article class="photo-display" id="${photoObj.id}">
      <a href="${photoObj.url}"><img class="photo" src=${photoObj.url}></a>
      <h6 class="photo-title">${photoObj.title}</h6>
      <button 
        class="delete-photo-button" 
        onclick="deletePhoto(${photoObj.id})">
        X
      </button>
    </article>
  `;
};

const displaySavedPhotos = photosArr => {
  const photosHTML = photosArr.map(photo => createPhotoDisplay(photo));
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
  getSavedPhotos();
};

document
  .querySelector('#add-photos-form')
  .addEventListener('submit', savePhoto);
