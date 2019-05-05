import { requireRaw } from '../loader.macro';
import Handlebars from 'handlebars/runtime';

const icons = {
    'google-drive': requireRaw('resources/svg/google-drive.svg'),
    'onedrive': requireRaw('resources/svg/onedrive.svg'),
    'usb-token': requireRaw('resources/svg/usb-token.svg'),
}

Handlebars.registerHelper('svg', (name, cls) => {
    const icon = icons[name];
    if (typeof cls === 'string') {
        return `<svg class="${cls}"` + icon.substr(4);
    }
    return icon;
});
