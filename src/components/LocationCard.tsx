// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../types/locations";
import { RiDirectionFill } from "react-icons/ri";
import { StaticData } from "../../sites-global/staticData";
import "../index.css";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};
const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result.rawData;

  // function that takes coordinates and returns a google maps link for directions
  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };
  var url="";
  const { address, hours, additionalHoursText, timezone, mainPhone } = result.rawData;
  console.log('result.rawData', result.rawData)
  var name: any = result.rawData.name?.toLowerCase();
  var country: any = result.rawData.address.countryCode?.toLowerCase();
  var initialcountry: any = country.toString();
  var finalcountry: any = initialcountry.replaceAll(" ", "-");
  var region: any = result.rawData.address.region?.toLowerCase();
  var initialregion: any = region.toString();
  var finalregion: any = initialregion.replaceAll(" ", "-");
  var city: any = result.rawData.address.city?.toLowerCase();
  var initialrcity: any = city.toString();
  var finalcity: any = initialrcity.replaceAll(" ", "-");
  var string: any = name.toString();
  let result1: any = string.replaceAll(" ", "-");
  let result2 : any = result.rawData.slug.toString();
  let newurl = finalcountry + "/" + finalregion + "/" + finalcity + "/" + result2 + ".html";
  if (!result.rawData.slug) {
    //  url= `/${result.rawData.id}-${result1}.html`;
    url = newurl;
    console.log('url', url)
  } else {
    // url = `/${result.rawData.slug.toString()}.html`;
    url = newurl ;
  }

  return (
    <div
      className={`location result-list-inner-${result.id} result`}
      id={`result-${result.id}`}
      key={`result-${result.rawData.id}`}
    > 
      <div className="flex">
        <div>
          <a
            target={"_blank"}
            href={url}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {location.name}
          </a>
          <p className="text-sm">{location.address.line1}</p>  
          <p className="text-sm">{`${location.address.city}, 
          ${location.address.region} 
          ${location.address.postalCode}`}</p>
          {typeof result.distance != "undefined" ? (
                <div className="distance">
                  {metersToMiles(result.distance)}{" "}
                  <span>{StaticData.miles}</span>
                </div>
              ) : (
                ""
              )}
        </div>
      </div>
      <div className="flex items-center">
        {location.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex flex-col items-center text-sm text-orange"
            href={getGoogleMapsLink(location.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;