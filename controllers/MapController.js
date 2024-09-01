const Map = require("../schemas/mapModel")

class MapController {
    async saveMapData(req, res) {
        const { imageUrl, latitude, longitude } = req.body;
        const userId = req.userId;
        try {
            const mapData = new Map({
                userId,
                imageUrl,
                mapData: { latitude, longitude }
            });
            await mapData.save();
            return res.status(201).json({ status: 201, data: { mapData: mapData }, message: 'Map Saved Successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMapData(req, res) {
        const userId = req.userId;
        try {
            const maps = await Map.find({ userId });
            return res.status(200).json({ status: 200, data: maps, message: 'Map Details' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTopFrequentReg(req, res) {
        const userId = req.userId;
        try {
            const topRegions = await Map.aggregate([
                { $match: { userId } },
                {
                    $group: {
                        _id: {
                            latitude: "$mapData.latitude",
                            longitude: "$mapData.longitude"
                        },
                        imageUrl: { $first: "$imageUrl" },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { count: -1 } },
                { $limit: 3 }
            ]);
    
            const result = topRegions.map(region => ({
                mapData: {
                    latitude: region._id.latitude,
                    longitude: region._id.longitude,
                },
                count: region.count,
                imageUrl: region.imageUrl
            }));
    
            return res.status(200).json({ status: 200, data: result, message: 'Top Frequent Regions' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = new MapController();
