import asyncHandler from 'express-async-handler';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';

const getPlaces = asyncHandler(async (req, res) => {
   const mapBoxToken = process.env.MAPBOX_TOKEN;
   const geocoder = mbxGeocoding({accessToken: mapBoxToken});

   const geoData = await geocoder.forwardGeocode({
      query: req.body.location,
      types: ["country", "region", "district", "place"],
      language: ['pt'],
      limit: 3
   }).send();

   let results = [];
   geoData.body.features.map(place => {
      let result = {
         place_name: place.place_name,
         geometry: place.geometry
      }
      results.push(result);
   });

         console.log(results)
         res.json( geoData.body.features);
});

export { getPlaces }