import * as React from "react";
import { Address } from "@yext/pages/components";
import { Link } from "@yext/pages/components";
import { formatPhoneNumber } from "react-phone-number-input";
import { Coordinate } from "../../types/locations";

// interface distance {
//   id: string;
//   distanceKilometers: number;
//   distanceMiles: number;
// }
const getGoogleMapsLink = (coordinate: Coordinate): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
};

export default function NearBy(props: any) {

  const [nearbyLocation, setNearbyLocation] = React.useState(props.externalApiData.response.results);

  return (
    <>
      <div className="nearBy-contenar mt-16">
        <h2 className="text-center font-bold text-3xl pt-8">
          NearBy Store in Open Location
        </h2>
        <div className="grid gap-x-4 gap-y-4  grid-cols-3">
          {nearbyLocation?.map((location: any, index: number) => {
            if (index > 0) {
              return (
                <>
                  <div className="nearby-section border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6 mt-16">
                    <div className="location-name flex ">
                      <div className="w-1/2">
                        <h2 className="location-name-text-size text-xl font-semibold text-green-600">
                          {location.data.name}
                        </h2></div>
                      <div className="w-1/2 text-right">
                        {/* {typeof nearbyLocation?.distances != "undefined"
                        ? nearbyLocation?.distances?.map((res: distance) => {
                            if (res.id == location.meta.id) {
                              return (
                                <>
                                  <span className="distance">
                                    {res.distanceMiles.toFixed(2)} mi
                                  </span>
                                </>
                              );
                            }
                          })
                        : ""} */}
                      </div>
                    </div>

                    <div className="flex">
                      <span>&#128204;&#160;</span>
                      <Address
                        address={location.data.address}
                        lines={[
                          ["line1"],
                          ["line2"],
                          ["city", ",", "postalCode"],
                          ["region", "countryCode"]
                        ]}
                      />
                    </div>
                    <div className="mt-2">
                      <span>&#128222; </span>
                      <a
                        id="address"
                        className=""
                        href={`tel:${formatPhoneNumber(location.data.mainPhone)}`}
                      >
                        {formatPhoneNumber(location.data.mainPhone)}
                      </a>
                    </div>

                    <div className="button-view-more h-10 w-30 bg-green-400 mt-4 text-center">
                      <Link
                        className="btn font-bold"
                        href={`/${location.data.slug}`}
                        data-ya-track={`viewstore-${location.data.name}`}
                        eventName={`viewstore-${location.data.name}`}
                        rel="noopener noreferrer"
                      >
                        STORE DETAILS
                      </Link>
                    </div>
                    <div className="button-view-more h-10 w-30 bg-green-400 mt-2">
                      {location.data.yextDisplayCoordinate && (
                        <a
                          target={"_blank"}
                          className="flex flex-col items-center text-ml text-green font-bold"
                          href={getGoogleMapsLink(location.data.yextDisplayCoordinate)}
                          rel="noreferrer"
                        >
                          <p>Get Directions</p>
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
