import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
  getUserLocation,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";  
import { BiLoaderAlt } from "react-icons/bi"; 
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";
import MapPin from "./MapPin";   
import "../index.css";

type InitialSearchState = "not started" | "started" | "complete";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

  const [initialSearchState, setInitialSearchState] =
  useState<InitialSearchState>("not started");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Current Location",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: 22.7196,
                lng: 75.8577,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .catch(() => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "New York City, New York, NY",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: 22.7196,
                lng: 75.8577,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .then(() => {
        searchActions.executeVerticalQuery();
        setInitialSearchState("started");
      });
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);


  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      <div className="flex h-[calc(100vh-242px)] border">
      {initialSearchState !== "complete" && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center bg-white opacity-70">
            <BiLoaderAlt className="animate-spin " size={44} />
          </div>
        )}
        <div className="flex w-1/3 flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
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
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={LocationCard} 
          />
        </div>
        <div className="w-2/3">
          <MapboxMap
            mapboxAccessToken={'pk.eyJ1Ijoic2h1YmhhbXNoYXJtYWRzIiwiYSI6ImNsZnFzdDF3YjAxbzczd2xkemF5aTU4bnEifQ.akdWeB5U30Rnk10mIwEdYQ'|| ""}
          PinComponent={MapPin} 
          />
        </div>
      </div>
    </>
  );
};

export default StoreLocator;