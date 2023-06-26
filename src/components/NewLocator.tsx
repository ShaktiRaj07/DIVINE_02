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
        <div className="flex h-[calc(100vh-242px)] border">
          {/* <button onClick={useMyLocation}>use my location </button>
         */}
      
        <div className="relative flex h-[calc(100vh-210px)] border">
          {loader}
          <div className="flex flex-col">
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
                searchOnSelect={false}
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
                <span>
                  <b>GO</b>
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
        <div className="w-2/3" style={{marginLeft:"5rem"}}>
          <MapboxMap
            mapboxAccessToken={'pk.eyJ1Ijoic2h1YmhhbXNoYXJtYWRzIiwiYSI6ImNsZnFzdDF3YjAxbzczd2xkemF5aTU4bnEifQ.akdWeB5U30Rnk10mIwEdYQ'|| ""}
          PinComponent={MapPin} 
          />
        </div>
      </div>
    </>
  );
};
export default NewLocator;
