import * as React from "react";
import "../index.css";
import {
  Facebook,
  GitHub,
  Instagram,
  Twitter,
  YouTube,
} from "../assets/svgs/SocialIcons";

export interface FooterProps {
  _site?: any;
  logo?: string;
  paragraph?: string;
}
type props = {
  _site: any,
  //  c_mainMenu:Array<string>,
};
const currentTime = new Date();
const year = currentTime.getFullYear();


const Footer = (props: props) => {
  const { _site } = props;
  console.log('_site', _site)
  return (
    <>

      <footer id="footer">
        <div className="container clear">
          <div className="abt">
            <h3>{_site?.c_footData?.footerHeading}</h3>
            <div className="desc">
              {_site?.c_footData?.fAddress.map((item: any) => {
                return (
                  <p id="desc-p">{item}</p>
                );
              }
              )}

            </div>
          </div>
          <div className="mnu">
            <h3>Social Sites</h3>
            <ul>
              <li>
                <span title="-- Sections --"></span>
                <ul className="sub-sub">
                  {/* <li>
                    <a title="Best WordPress Plugins" href="#">Best WordPress Plugins</a>
                  </li>
                  <li>
                    <a title="Best WordPress Hosting Reviews" href="#/">Best WordPress Hosting Reviews</a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
          <div className="cmp">
            <h3>{_site?.c_footData?.linksHeading}</h3>
            <div className="desc">
              {_site?.c_footData?.quickLinks.map((index: any) => {

                return (
                  <>
                    <a href={index.link}>{index.label}</a>                 
                  </>

                );
              }

              )}
            </div>
          </div>
          <div className="os">
            <h3>Our Sites</h3>
            <div className="desc">
              <button><a rel="noopener noreferrer" target="_blank" href="#">Contact Us</a></button>
              <button><a rel="noopener noreferrer" target="_blank" href="#">About Us</a></button>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-4" style={{marginLeft: "26rem"}}>
            <p className="text-xs leading-5 text-gray-500">
              &copy; {year} Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
