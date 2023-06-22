import * as React from "react";
import { Address } from "../types/Address";
import Cta from "./Cta";

export interface BannerProps {
  name?: string;
  address?: Address;
}

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: BannerProps) => {
  const { name, address } = props;

  return (
    <>
      <div
        className={`relative z-10 w-full bg-cover bg-center h-96 bg-[url(/src/assets/images/cookbanner.jpg)] `}
      >
        <div className="absolute left-0 right-0 flex flex-col items-center">
          <div className="w-96 my-8 rounded-xl bg-white-500 border-8 shadow-xl border-white-600 px-4 py-2 text-center" style={{marginTop:"10rem"}}>
            <div>
              <h1 className="text-white text-3xl font-semibold">{name}</h1>
              {/* <p className="text-lg pt-2 text-white font-semibold">
                {renderPrettyAddress(address)}
              </p> */}
            </div>
            {/* <div className="flex py-3 justify-between">
              <Cta
                buttonText="Button One"
                url="#"
                style="text-green bg-white"
              ></Cta>
              <Cta
                buttonText="Button Two"
                url="#"
                style="text-green bg-white"
              ></Cta>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
