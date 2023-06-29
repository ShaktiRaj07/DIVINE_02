import * as React from "react";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber } from "react-phone-number-input";
import List from "../components/List";
import Hours from "./common/hours";
import OpenClose from "./common/openClose";

export interface DetailsProps {
  address: any;
  phone?: string;
  services?: string[];
}


const Details = ({ address, phone, services }: DetailsProps) => {

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="grid gap-y-3">
          <div className="text-xl font-semibold">Store Details</div>
          <div className="flex">
            <span>&#128204;&#160;&nbsp;</span>
            <Address
              address={address}
              lines={[
                ["line1"],
                ["line2"],
                ["city", ",", "postalCode"],
                ["region", ",", "countryCode"]
              ]}
            />
          </div>

          {phone && (
            <div className="space-x-2">
              <span>&#128222;&nbsp;</span>
              <a href={`tel:${phone}`} className="hover:underline">
                {formatPhoneNumber(phone)}
              </a>
            </div>
          )}
          {services && <List list={services} />}

              <OpenClose />
                    {/* <div className="icon-row">
            <div className="icon">
              <img src="/assets/images/watch-icn-4e5dce53.svg" width="20" height="20" alt="Clock" loading="lazy" />
            </div>
            <div className="openCloseStatus">
              <div className="closing-div">
                <div className="openDot green-dot">
                  <div className="location-icon notHighlight">
                    <div className="location-icon notHighlight">
                    </div>
                    <div className="hours-info">
                      <div className="cursor-default flex items-center notHighlight w-fit">
                        <span className="notHighlight currentStatus close2">Closed</span>
                      </div>
                      <span className="notHighlight">Opens at </span>
                      <span className="notHighlight">11 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Details;
