import * as React from "react";
import { FilterSearch, MapboxMap, VerticalResults } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import LocationCard from "./LocationCard";
import { Link } from "@yext/pages/components";
import "mapbox-gl/dist/mapbox-gl.css";
import MapPin from "./MapPin";
import "../index.css";
import { GoogleMaps } from "./GoogleMaps";
import { center_latitude, center_longitude, googleApikey } from "../../sites-global/global";


const NewLocator = (): JSX.Element => {
  const searchActions = useSearchActions();
  const [inputValue, setInputValue] = React.useState("");
  
  // This state is used to manage the loading state and display a loader

  const [loading, setLoading] = useState(true);
  const locationData = useSearchState((state) => state.vertical.results) || [];

  const useMyLocation = () => {

    // Check if geolocation and access to the device's location are available
    if (navigator.geolocation) {
      // If it is available, set up an error handler
      (error: any) => {
        console.log("error", error);
      };
    }
    // Call the geolocation API to get the user's current position
    navigator.geolocation.getCurrentPosition(function (position) {
      // Update the user's location in global state
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      // Execute a search query based on the user's location
      searchActions.executeVerticalQuery();
      searchActions.setVerticalLimit(5);
    });
  };

  // Function to fetch results on button click
  const FindInput = () => {
    // Get the search input element
    const searchKey: any = document.getElementsByClassName("FilterSearchInput");
    // Get the value of the search input
    const Search = searchKey[0].value;
    // Reset the input value
    setInputValue("");

    // Check if the search input is not empty
    if (searchKey[0].value !== "") {
      setInputValue(""); // Reset the input value
      searchActions.setQuery(Search); // Set the query value for the search
      searchActions.executeVerticalQuery(); // Execute the vertical query
    }
  };

  // Function to execute a search query and then set the loading state back to false after 1 second
  const loaderHandle = () => {
    // Set a timeout to simulate loading time
    setTimeout(() => {
      setLoading(false); // Set loading state to false after 1000ms (1 second)
    }, 1000);

    // Execute vertical query
    searchActions.executeVerticalQuery();
    // Set vertical limit using AnswerExperienceConfig limit
  };

  useEffect(() => {
    // Set user location using latitude and longitude values from GoogleMapData
    searchActions.setUserLocation({
      latitude: 22.7196,
      longitude: 75.8577,
    });
    searchActions.setVerticalLimit(5);
    //call the loaderHandle function when page rendering
    loaderHandle();
  }, []);

  // Display the loader when loading is true
  const loader = loading ? (
    <BiLoaderAlt className="animate-spin " size={64} />
  ) : (
    ""
  );

  return (
    <>
      <div className="flex border">
        {/* <button onClick={useMyLocation}>use my location </button>
         */}
        <div className="relative flex border">
          {loader}
          <div className="flex flex-col">
            <div className="location-with-filter">
              <h2 className="font-semibold text-slate-900 uppercase">Find a Store near me</h2>
              <button className="useMyLocation flex" title="Search using your current location!" id="useLocation" onClick={useMyLocation}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <path d="M8.5,5.955A2.545,2.545,0,1,0,11.045,8.5,2.545,2.545,0,0,0,8.5,5.955Zm5.689,1.909A5.724,5.724,0,0,0,9.136,2.811V1.5H7.864V2.811A5.724,5.724,0,0,0,2.811,7.864H1.5V9.136H2.811a5.724,5.724,0,0,0,5.053,5.053V15.5H9.136V14.189a5.724,5.724,0,0,0,5.053-5.053H15.5V7.864ZM8.5,12.955A4.455,4.455,0,1,1,12.955,8.5,4.451,4.451,0,0,1,8.5,12.955Z" transform="translate(-1.5 -1.5)" fill="#333">
                    </path>
                  </svg>
                </span>Use my location</button>
            </div>
            <div className="search-field flex">
              {/* FilterSearch component used for displaying results when an entity is searched in the searchBar
          and also shows suggestions when any keyword related to the entity is searched */}
              <FilterSearch
                customCssClasses={{
                  filterSearchContainer: "m-2 w-full",
                  inputElement: "FilterSearchInput pr-[90px]",
                  optionsContainer: "options",
                }}
                inputvalue={inputValue}
                searchOnSelect={true}
                placeholder="Find Locations Near You"
                searchFields={[
                  {
                    entityType: "location",
                    fieldApiName: "address.countryCode",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.line1",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "name",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.line2",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.region",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.postalCode",
                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.city",
                  }
                ]}
              />
              <button
                className=""
                aria-label="Search bar icon"
                id="search-location-button"
                onClick={FindInput}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30.938 30.579">
                  <g transform="translate(-3 -3)">
                    <path d="M24.691,14.6A10.1,10.1,0,1,1,14.6,4.5,10.1,10.1,0,0,1,24.691,14.6Z" transform="translate(0 0)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                    </path>
                    <path d="M35.066,34.707,24.975,24.975" transform="translate(-3.249 -3.249)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                    </path>
                  </g>
                </svg>
                <span>
                </span>
              </button>
            </div>

            {locationData && locationData?.length > 0 ? (
              <VerticalResults
                customCssClasses={{
                  verticalResultsContainer: "overflow-y-auto",
                }}
                displayAllOnNoResults={false}
                CardComponent={LocationCard}
              />
            ) : (
              <div className="font-extrabold p-4">
                <p>{"No result found please enter valid input"}</p>
              </div>
            )}

          </div>
        </div>
        <div className="w-2/3" style={{ marginLeft: "5rem" }}>
          {/* <MapboxMap
            mapboxAccessToken={'pk.eyJ1Ijoic2h1YmhhbXNoYXJtYWRzIiwiYSI6ImNsZnFzdDF3YjAxbzczd2xkemF5aTU4bnEifQ.akdWeB5U30Rnk10mIwEdYQ'|| ""}
          PinComponent={MapPin} 
          /> */}
          <GoogleMaps
            apiKey={googleApikey}
            centerLatitude={center_latitude}
            centerLongitude={center_longitude}
            check={true}
            defaultZoom={8}
            showEmptyMap={true}
          />
        </div>
      </div>
    </>
  );
};
export default NewLocator;
