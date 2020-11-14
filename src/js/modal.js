import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onOpenModal(event) {
    // event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    // console.log(event.target);
    // console.log(event.target.dataset.src);
    const instance = basicLightbox.create(`<img src="${event.target.dataset.src}" alt="" />`);
    instance.show();
}