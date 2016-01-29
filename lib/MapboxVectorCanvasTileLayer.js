'use strict';

/*global require*/
var L = require('leaflet');
var defined = require('terriajs-cesium/Source/Core/defined');

var CesiumEvent = require('terriajs-cesium/Source/Core/Event');
var Cartographic = require('terriajs-cesium/Source/Core/Cartographic');
var pollToPromise = require('./Core/pollToPromise');

var MapboxVectorCanvasTileLayer = L.TileLayer.Canvas.extend({
    initialize: function(imageryProvider, options) {
        this.imageryProvider = imageryProvider;
        this.tileSize = 256;
        this.errorEvent = new CesiumEvent();

        this.initialized = false;
        this._usable = false;

        this._delayedUpdate = undefined;
        this._zSubtract = 0;
        this._previousCredits = [];

        var that = this;
        this._ipReady = pollToPromise(function() { return that.imageryProvider.ready; });

        L.TileLayer.Canvas.prototype.initialize.call(this, undefined, options);
    },

    drawTile: function (canvas, tilePoint, zoom) {
        var that = this;
        this._ipReady.then(function() {
            function mod(x, n) { return ((x % n) + n) % n; } // Fix JS weird modulo operator
            // Modulo the x by number number of x tiles so that negative x tiles are properly drawn
            var n = that.imageryProvider.tilingScheme.getNumberOfXTilesAtLevel(zoom);
            return that.imageryProvider._requestImage(mod(tilePoint.x, n), tilePoint.y, zoom, canvas);
        }).then(function (canvas) {
            that.tileDrawn(canvas);
        });


    },

    pickFeatures: function(map, longitudeRadians, latitudeRadians) {
        function mod(x, n) { return ((x % n) + n) % n; } // Fix JS weird modulo operator
        longitudeRadians = mod(longitudeRadians + Math.PI/2, Math.PI) - Math.PI;

        var point = new Cartographic(longitudeRadians, latitudeRadians, 0.0);

        var level = map.getZoom();

        var that = this;
        return this._ipReady.then(function() {
            var tilingScheme = that.imageryProvider.tilingScheme;
            var tileCoordinates = tilingScheme.positionToTileXY(point, level);
            if (!defined(tileCoordinates)) {
                return undefined;
            }

            return that.imageryProvider.pickFeatures(tileCoordinates.x, tileCoordinates.y, level, longitudeRadians, latitudeRadians);
        });
    }
});

module.exports = MapboxVectorCanvasTileLayer;