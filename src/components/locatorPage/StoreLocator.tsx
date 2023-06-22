import * as React from "react";
import { useState, useEffect } from "react";
import {
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  PinComponent,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  Result,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { styles } from "../constant/GlobalConstant";
import marker from "../../assets/svgs/google-marker.svg";
import LocationCard from "./Locationcard";
import { googleMapsApiKey } from "../constant/GlobalConstant";



// import google map marker
const containerStyle = {
  width: "100%",
  height: "100%",
};

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

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
        <div className="flex w-1/2 flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "builtin.location",
              },
            ]}
          />
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={LocationCard}
          />
        </div>
        <div className="w-2/3">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: 48.87204499764726,
                lng: 2.331561404249414,
              }}
              zoom={15}
              options={{
                styles,
              }}
            >
              <Marker
                position={{
                  lat: 48.87204499764726,
                  lng: 2.331561404249414,
                }}
                icon={marker}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default StoreLocator;
