/* eslint-disable import/no-commonjs */

const Libs = {
    kdbxweb: require('kdbxweb'),
    hbs: require('handlebars/runtime'),
    pikaday: require('pikaday'),
    qrcode: require('jsqrcode')
};

const basePath = '../';

const PluginApi = {
    require(module) {
        return Libs[module] || require(basePath + module);
    }
};

export { PluginApi };
