// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../types/locations";
import { RiDirectionFill } from "react-icons/ri";
import { StaticData } from "../../sites-global/staticData";
import { useState } from "react";
import "../index.css";
import Hours from "./common/hours";
import OpenClose from "./common/openClose";
import GetDirection from "./common/GetDirection";
import timer from "../images/timer.png";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};
let array = [];
const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }
  const location = result.rawData;
  const [hoursopen, setHoursopen] = React.useState(false);

  function opentime(e: any) {
    //console.log(e.target);
    var closethis = e.target.closest(".lp-param-results");
    if (closethis.querySelector('.storelocation-openCloseTime').classList.contains("hidden")) {
      closethis.querySelector('.storelocation-openCloseTime').classList.remove("hidden")
      setHoursopen(true);
    }
    else {
      closethis.querySelector('.storelocation-openCloseTime').classList.add("hidden")
      setHoursopen(false);
    }
  }


  // function that takes coordinates and returns a google maps link for directions
  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };
  var url="";
  const { address, hours, additionalHoursText, timezone, mainPhone } = result.rawData;
  var name: any = result.rawData.id?.toLowerCase();
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
  let result2 : any = result?.rawData?.slug?.toString();
  let newurl = finalcountry + "/" + finalregion + "/" + finalcity + "/" + name + ".html";


  // let result2 : any = result.rawData.slug.toString();
  // let newurl = finalcountry + "/" + finalregion + "/" + finalcity + "/" + result2 + ".html";
  if (!result.rawData.slug) {
    //  url= `/${result.rawData.id}-${result1}.html`;
    url = `${newurl}`;
    console.log('url', url)
  } else {
    url = `${newurl}`;
    // url = `/${result.rawData.slug.toString()}.html`;
     }

  return (
    <div
      className={`location result-list-inner-${result.id} result`}
      id={`result-${result.id}`}
      key={`result-${result.rawData.id}`}
    > 
      <div className="flex" id="innerDataa">
        <div>
          <a
            target={"_blank"}
            href={`/${url}`}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {location.name}
          </a>
          <p className="text-sm" id="textLine1">{location.address.line1}</p>  
          <p className="text-sm" id="textLine1">{`${location.address.city}, 
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
      <div className="pt-2 pb-2 ">
                <div className="open-close ">
                  <div className="hours-sec">
                    <div className="OpenCloseStatus notHighlight">
                      <div className="hours-labels">
                        <div className="flex notHighlight">
                          <span className="icon notHighlight mr-1">
                            <img src={timer} alt="time" />
                          </span>
                          <OpenClose
                            timezone={timezone}
                            hours={hours}
                            deliveryHours={hours}
                          ></OpenClose>
                          <div className="notHighlight"><button className="ml-2">
                            {" "}
                            <svg
                              onClick={onOpenHide}
                              className="openclose notHighlight"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20.585"
                              height="8.793"
                              viewBox="0 0 9.585 4.793">
                              <path
                                id="hrd-drop"
                                d="M9,13.5l4.793,4.793L18.585,13.5Z"
                                transform="translate(-9 -13.5)"
                                fill="#004990">
                              </path>
                            </svg>
                          </button>
                          </div>
                        </div>
                      </div>
                      <div className={timeStatus + " daylist"}>
                        <div className="notHighlight">
                          <Hours
                            key={result.rawData.id}
                            hours={hours}
                            additionalHoursText={additionalHoursText}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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