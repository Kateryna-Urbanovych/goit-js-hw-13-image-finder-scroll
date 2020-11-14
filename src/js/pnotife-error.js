import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function Error() {
    return error({
            text: 'Sorry, no images found!',
            title: 'ERROR',
            delay: 2000,
            maxTextHeight: null,
            sticker: false,
        });
}

export default { Error };