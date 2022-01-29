import React, { useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "AIzaSyBM2bb5s0UElBjGTcI-yHcPG32xJHliJUA";

const Routemap = ({ origin, destination }) => {
  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };
  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  const mapRef = useRef();

  return (
    <MapView
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: origin.details.geometry.location.lat,
        longitude: destination.details.geometry.location.lng,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor={"#669cf7"}
        optimizeWaypoints={true}
        onReady={result => {
          mapRef.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: 100,
              bottom: 100,
              left: 100,
              top: 100,
            },
          });
        }}
      />
      <Marker coordinate={originLoc} title={"Origin"} />
      <Marker coordinate={destinationLoc} title={"Destination"} />
    </MapView>
  );
};
export default Routemap;
