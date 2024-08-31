const mongoose = require('mongoose');

const MapDataSchema = new mongoose.Schema({
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 }
});

const MapSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mapData: MapDataSchema  // Embedded MapData schema
});

const Map = mongoose.model('Map', MapSchema);
module.exports = Map;
