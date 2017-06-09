'use strict';

const childProcess = require('child_process');

function isObjectInstance(value) {
    return value !== null && typeof value === 'object';
}

function isArray(value) {
    return isObjectInstance(value) &&
        Object.prototype.toString.call(value) === '[object Array]';
}

module.exports = {
    beforeEach: function (config) {
        let pluginConfig = isObjectInstance(config['quokka-prerun']) ? config['quokka-prerun'] : {};
        let prerunCommands = isArray(pluginConfig.prerunCommands) ? pluginConfig.prerunCommands : [];

        prerunCommands.forEach(function (command) {
            childProcess.execSync(command);
        });
    }
};