import { GOOGLE_MAPS_API_KEY, USING_MAP_ZONES } from '@/config/map/mapSettings.js';
import axios from 'axios';

export const getCoordsByStreet = async (address) => {
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address,
      key: GOOGLE_MAPS_API_KEY,
    },
  });

  const { status, results } = data;

  if (status !== 'OK') {
    return false;
  }

  const [resultRow] = results;

  return resultRow.geometry.location;
};

export const getZoneId = async (point) => {
  const polygons = await Promise.all(USING_MAP_ZONES.map(async (zone) => await createMapPolygon(zone)));

  const result = USING_MAP_ZONES
    .find((zone, idx) => {
      const polygon = polygons[idx];
      const pointG = new google.maps.LatLng(point.lat, point.lng);
      return google.maps.geometry.poly.containsLocation(pointG, polygon);
    });

  return result?.zoneId || 0;
};

export const getZone = async (point) => {
  const polygons = await Promise.all(USING_MAP_ZONES.map(async (zone) => await createMapPolygon(zone)));

  return USING_MAP_ZONES
    .find((zone, idx) => {
      const polygon = polygons[idx];
      const pointG = new google.maps.LatLng(point.lat, point.lng);
      return google.maps.geometry.poly.containsLocation(pointG, polygon);
    });
};

export const createMapPolygon = async (zone) => {
  const zoneCoords = zone.coords.map((obj) => new google.maps.LatLng(obj.lat, obj.lng));
  return new google.maps.Polygon({
    paths: zoneCoords,
    draggable: false,
    editable: false,
    strokeColor: zone.borderColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: zone.fillColor,
    fillOpacity: 0.35,
  });
};
