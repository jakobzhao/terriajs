'use strict';

var defined = require('terriajs-cesium/Source/Core/defined');

/**
 * Gets the values from a Entity's properties object for the time on the current clock.
 *
 * @param properties An entity's property object
 * @param clock A clock with a current time
 * @returns {Object} a simple key-value object of properties.
 */
function propertyGetTimeValues(properties, clock) {
    // properties itself may be a time-varying "property" with a getValue function.
    // If not, check each of its properties for a getValue function; if it exists, use it to get the current value.
    if (!defined(properties)) {
        return;
    }
    var result = {};
    var currentTime = clock.currentTime;
    if (typeof properties.getValue === 'function') {
        return properties.getValue(currentTime);
    }
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            if (properties[key] && typeof properties[key].getValue === 'function') {
                result[key] = properties[key].getValue(currentTime);
            } else {
                result[key] = properties[key];
            }
        }
    }
    return result;
}

module.exports = propertyGetTimeValues;
