import "./css/styles.css";
import getRefs from './js/get-refs';
import imagesTpl from './templates/image-card.hbs';
import ImagesApiSevise from './js/images-servise';
import onOpenModal from './js/modal';
const debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import pnotify from './js/pnotife-error';

const refs = getRefs();

const imagesApiSevise = new ImagesApiSevise();

refs.searchForm.addEventListener('input', debounce(onSearchForm, 500));
refs.galleryContainer.addEventListener('click', onOpenModal);

infinityScroll();

async function onSearchForm(event) {
    event.preventDefault();

    imagesApiSevise.query = event.target.value;

    try {
        if (imagesApiSevise.query === '') {
            clearImagesContainer();
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

    try {
        imagesApiSevise.fetchImages()
        .then(images => {
            appendImagesMarkup(images);
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

async function searchError(images) {
    try {
        const numberOfImages = images.hits.length;
        if (numberOfImages === 0) {
            pnotify.Error();
        }
    } catch (error) {
        console.log(error);
        console.log("Не удалось загрузить pnotify-ошибку при поиске изображений");
    }
}

async function infinityScroll() {
    try {
        const onEntry = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && imagesApiSevise.query !== '') {
                    imagesApiSevise.fetchImages()
                    .then(images => {
                        appendImagesMarkup(images);
                        searchError(images);
                    });
                }
            })
        }

        const options = {
            roorMargin: '200px',
        }

        const observer = new IntersectionObserver(onEntry, options);

        observer.observe(refs.sentinal);
    } catch (error) {
        console.log(error);
        console.log("Не удалось запустить бесконечную загрузку");
    }
}
