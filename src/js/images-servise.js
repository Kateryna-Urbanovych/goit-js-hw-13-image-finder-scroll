const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiSevise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=18986249-8b68234fd669e826bdba5acf0`;

        const response = await fetch(url);
        const images = await response.json();
        this.page += 1;
        return images;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



// НА ПРОМИСАХ
// const BASE_URL = 'https://pixabay.com/api/';

// export default class ImagesApiSevise {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImages() {
//         const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=18986249-8b68234fd669e826bdba5acf0`;

//         return fetch(url)
//             .then(response => response.json())
//             .then(images => {
//                 this.page += 1;
//                 return images;
//         });
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }