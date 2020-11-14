import "./css/styles.css";
import getRefs from './js/get-refs';
import imagesTpl from './templates/image-card.hbs';
import ImagesApiSevise from './js/images-servise';
import LoadMoreBtn from './js/load-more-btn';
import onOpenModal from './js/modal';
const debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import pnotify from './js/pnotife-error';

const refs = getRefs();

const imagesApiSevise = new ImagesApiSevise();
const loadMoreBtn = new LoadMoreBtn({
    selector: 'load-more-btn',
    hidden: true,
});

refs.searchForm.addEventListener('input', debounce(onSearchForm, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.galleryContainer.addEventListener('click', onOpenModal);

let currentCoord = 0;

async function onSearchForm(event) {
    event.preventDefault();

    imagesApiSevise.query = event.target.value;

    try {
        if (imagesApiSevise.query === '') {
            clearImagesContainer();
            loadMoreBtn.hide();
            return;
        }

        imagesApiSevise.resetPage();
        clearImagesContainer();
        fetchImages();
    } catch (error) {
        console.log(error);
    }
}

async function fetchImages() {
    currentCoord = refs.galleryContainer.offsetHeight;

    try {
        loadMoreBtn.show();
        loadMoreBtn.disable();

        imagesApiSevise.fetchImages()
        .then(images => {
            appendImagesMarkup(images);
            loadMoreBtn.enable();
            scrollingPage();
            searchError(images);
        });
    } catch (error) {
        console.log(error);
    }
}

function appendImagesMarkup(images) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
    refs.galleryContainer.innerHTML = '';
}

async function scrollingPage() {
    try {
        window.scrollTo({
            top: currentCoord,
            left: 0,
            behavior: 'smooth',
        });
    } catch (error) {
        console.log(error);
        console.log('Не удалось загрузить скроллинг страницы найденных изображений');
    }
}

async function searchError(images) {
    try {
        const numberOfImages = images.hits.length;
        if (numberOfImages === 0) {
            pnotify.Error();
            loadMoreBtn.hide();
        }
    } catch (error) {
        console.log(error);
        console.log("Не удалось загрузить pnotify-ошибку при поиске изображений");
    }
}


// НА ПРОМИСАХ
// import "./css/styles.css";
// import getRefs from './js/get-refs';
// import imagesTpl from './templates/image-card.hbs';
// import ImagesApiSevise from './js/images-servise';
// import LoadMoreBtn from './js/load-more-btn';
// const debounce = require('lodash.debounce');
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import pnotify from './js/pnotife-error';

// const refs = getRefs();

// const imagesApiSevise = new ImagesApiSevise();
// const loadMoreBtn = new LoadMoreBtn({
//     selector: 'load-more-btn',
//     hidden: true,
// });

// refs.searchForm.addEventListener('input', debounce(onSearchForm, 500));
// loadMoreBtn.refs.button.addEventListener('click', fetchImages);

// let currentCoord = 0;

// function onSearchForm(event) {
//     event.preventDefault();

//     imagesApiSevise.query = event.target.value;

//     if (imagesApiSevise.query === '') {
//         clearImagesContainer();
//         loadMoreBtn.hide();
//         return;
//     }

//     imagesApiSevise.resetPage();
//     clearImagesContainer();
//     fetchImages();
// }

// function fetchImages() {
//     loadMoreBtn.show();
//     loadMoreBtn.disable();

//     currentCoord = refs.galleryContainer.offsetHeight;
//     imagesApiSevise.fetchImages()
//         .then(images => {
//             appendImagesMarkup(images);
//             loadMoreBtn.enable();
//             scrollingPage();
//             searchError(images);
//         });
// }

// function appendImagesMarkup(images) {
//     refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
// }

// function clearImagesContainer() {
//     refs.galleryContainer.innerHTML = '';
// }

// function scrollingPage() {
//     window.scrollTo({
//         top: currentCoord,
//         left: 0,
//         behavior: 'smooth',
//     });
// }

// function searchError(images) {
//     const numberOfImages = images.hits.length;
//     if (numberOfImages === 0) {
//         pnotify.Error();
//         loadMoreBtn.hide();
//     }
// }