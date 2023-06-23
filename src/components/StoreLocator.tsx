import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";
import MapPin from "./MapPin";   
import "../index.css";

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