import * as React from "react";
import "../index.css";

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
            <h3 id="text-1">{_site?.c_footData?.footerHeading}</h3>
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
            <ul className="sub-sub">
              {_site?.c_footData?.iconLogo?.map((key: any) => {
                return (
                  <>
                    <li className="li-01">
                      <img className="img-01" src={key.url} alt="logo" />
                    </li>
                  </>
                )
              })}
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
              <button id="butn-01"><a rel="noopener noreferrer" target="_blank" href="#" className="btn-01">Contact Us</a></button>
              <button id="butn-02"><a rel="noopener noreferrer" target="_blank" href="#" className="btn-01">About Us</a></button>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-4" style={{ marginLeft: "26rem" }}>
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
