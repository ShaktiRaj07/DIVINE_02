import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as React from "react";
import marker from "../../assets/svgs/google-marker.svg";
import { styles } from "../../components/constant/GlobalConstant";
import { googleMapsApiKey } from "../../components/constant/GlobalConstant";




export type cordinateProps = {
  latitude: number;
  longitude: number;
};
interface mainprops {
  prop: cordinateProps;
}
const containerStyle = {
  width: "400px",
  height: "400px",
};

let center = {
    lat: 22.7196,
    lng: 75.8577,
}

/**
 *
 * @param cordinate custom google map
 * @returns
 */

function CustomMap(cordinate: mainprops) {
  console.log(cordinate,"cordinate")
    React.useEffect(() => {
        center = {
          lat: cordinate.prop && cordinate.prop.latitude,
          lng: cordinate.prop && cordinate.prop.longitude,
        };
      });
  return (
    <div className="shadow-md">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        {cordinate.prop.latitude && cordinate.prop.longitude ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: cordinate.prop && cordinate.prop.latitude,
                lng: cordinate.prop && cordinate.prop.longitude,
            }}
            zoom={10}
            options={{
              styles
            }}
          >
            <Marker
              position={{
                lat: cordinate.prop && cordinate.prop.latitude,
                lng: cordinate.prop && cordinate.prop.longitude,
              }}
              icon={marker}
              
            />
          </GoogleMap>
        ) : (
          <></>
        )}
      </LoadScript>
    </div>
  );
}
export default CustomMap;
