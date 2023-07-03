/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import BreadCrumbs from "../components/Breadcrumbs";
import CustomMap from "../components/locationDetails/CustomMap";
import { nearByLocation } from "../types/nearByLocation";
import NearBy from "../components/locationDetails/NearBy";
import "../index.css";
import Sqssection from "../components/Sqssection";
import Sqssection2 from "../components/Sqssection2";
import Sqssection3 from "../components/Sqssection3";
import FAQ from "../components/Faqs";
import SwiperDemo from "../components/SwiperDemo";

// import Faq from "../components/Faqs";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location-stream",
    // Defines the scope of entities that qualify for this stream.
    // You can use entityTypes, savedFilterIds, and/or entityIds
    filter: {
      entityTypes: ["location"],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "yextDisplayCoordinate",
      "services",
      "photoGallery",
      "c_faqs.question",
      "c_faqs.answer",
      // "c_featuredFAQs.question",
      // "c_featuredFAQs.answer",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "c_imageBanner",
      "c_sqssectioSec",
      "c_sqsSectionThird",
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
    transform: {
      replaceOptionValuesWithDisplayNames: ["paymentOptions"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // return document.slug
  //   ? document.slug
  //   : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.line1
  //   }-${document.id.toString()}`;
  var url = "";
  var name: any = document.id.toLowerCase();
  var string: any = name.toString();
  let result: any = string.replaceAll(" ", "-");
  document?.dm_directoryParents?.map((result: any, i: number) => {


    if (i > 0) {
      url += result.slug + "/"
    }
  })
  if (!document.slug) {
    url += `${result}.html`;

  } else {
    url += `${document.id.toString()}.html`;
  }

  // return document.id+".html";

  return url;

};



/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.locale}/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */




export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
// export const transformProps: TransformProps<any> = async (data) => {
//   const { dm_directoryParents, name } = data.document;

//   (dm_directoryParents || []).push({ name: name, slug: "" });

//   return {
//     ...data,
//     document: {
//       ...data.document,
//       dm_directoryParents: dm_directoryParents,
//     },
//   };
// };

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */

// That is a near by data section
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };

export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query?experienceKey=divier&api_key=ded1aa9eae96ab1f99c0d7e4611cec31&v=20220511&version=STAGING&locale=en&verticalKey=locations&retrieveFacets=true&facetFilters=%7B%7D&skipSpellCheck=false&session_id=2ac0eae3-77dc-4f29-b42e-7956c52f44b0&locationRadius=4023360&sessionTrackingEnabled=true&sortBys=[]&source=STANDARD`;
  // console.log('url', url)
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });
  return {
    ...data, externalApiData,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};
type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  document,
  externalApiData,
}) => {
  const {
    _site,
    name,
    address,
    hours,
    mainPhone,
    services,
    // c_featuredFAQs,
    c_faqs,
    props,
    geocodedCoordinate,
    displayCoordinate,
    cityCoordinate,
    yextDisplayCoordinate,
    siteDomain,
    dm_directoryParents,
    c_imageBanner,
    c_sqsSectionThird,
    c_sqssectioSec,

  } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <Banner name={name} address={address} />
        <div className="centered-container">
          <BreadCrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-3">
            <Details address={address} phone={mainPhone} services={services} />
            {hours && <Hours title={"Store Hours"} hours={hours} />}
            <CustomMap
              prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate}
            />
          </div>
          <div>
          </div>

          <div className="sqs-block-content"><hr /></div>
          <div className="main-container1">
            <div className="text-outer">
              <h1 className="text-inner">the difference is design+build</h1>
            </div>
            <div className="text-second-outer">
              <p className="desc-para">
                You love where you live: the location, the schools, your friends and neighbors…but maybe your home hasn’t reached its potential, needs to be modernized or expanded. We’re here to make your dream remodel a reality.
              </p>
              <br />
              <p className="desc-para"> Divine is Boston’s premier design+build firm, offering turn-key remodeling solutions. We provide one-stop design and remodeling services for a stress-free renovation.
                You’ll work with an award-winning designer who will oversee your entire project from start-to-finish, including all the contractors. And the best part? It will all be done on-time, while you remain in full control of the budget, so that you and your family can get back to enjoying your life, and the gorgeous new rooms within it.</p>
              <br />
              <div className="image-button-wrapper">
                <div className="image-button sqs-dynamic-text" data-width-percentage="35.8" style={{ fontSize: "max(0.75rem, 35.8%)" }}>
                  <div className="image-button-inner">
                    <a href="/kitchen-design-boston-wellesley" className="sqs-button-element--secondary">a divine story</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sqs-block-content"><hr /></div>
          <Sqssection c_imageBanner={c_imageBanner} />
          <Sqssection2 c_sqssectioSec={c_sqssectioSec} />
          <Sqssection3 c_sqsSectionThird={c_sqsSectionThird} />
          <br />
          <FAQ faqs={c_faqs} />

          <div className="nearBy-sec-inner grid gap-x-4 gap-y-4 ">
            {yextDisplayCoordinate ||
              cityCoordinate ||
              displayCoordinate ||
              geocodedCoordinate ? (
              <NearBy externalApiData={externalApiData} />
            ) : (
              ""
            )}
          </div>
          <div className="text-heading1">
            <a href="#" className="text-inner1"> @divinedesignbuild</a>
          </div>
          <br />
          {/* <SwiperDemo /> */}
          <div className="image-button-wrapper">
            <div className="image-button sqs-dynamic-text22" data-width-percentage="35.8" style={{ fontSize: "max(0.75rem, 35.8%)" }}>
              <div className="image-button-inner">
                <a href="/kitchen-design-boston-wellesley" className="sqss-button-element--secondary">
                  Follow us on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default Location;
