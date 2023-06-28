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
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import Breadcrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      entityTypes: ["ce_city"]
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url: any = ""
  document?.dm_directoryParents?.map((i: any) => {
    if (i.meta?.entityType?.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta?.entityType?.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  return url;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    _site,
    siteDomain,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  
  var address;
  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  let slugString = "";
  document.dm_directoryParents.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren?.map((entity: any) => {
    console.log(entity,"sdfjkaSFJOPslkj fslkf")
    var origin: any = null;
    if (entity.address.city) {
      origin = entity.address.city;
    } else if (entity.address.region) {
      origin = entity.address.region;
    } else {
      origin = entity.address.country;
    }
    // let key: any = Object.keys(entity.hours)[0];
    var url = "";
    var id : any = entity.id;
    var name: any = entity.name.toLowerCase();
    var country: any = entity.address.countryCode.toLowerCase();
    var initialcountry: any = country.toString();
    var finalcountry: any = initialcountry.replaceAll(" ", "-");
    var region: any = entity.address.region.toLowerCase();
    var initialregion: any = region.toString();
    var finalregion: any = initialregion.replaceAll(" ", "-");
    var city: any = entity.address.city.toLowerCase();
    var initialrcity: any = city.toString();
    var finalcity: any = initialrcity.replaceAll(" ", "-");
    var string: any = name.toString();;
    let result: any = string.replaceAll(" ", "-");

    const main_url = finalcountry + "/"+finalregion+"/"+finalcity+"/"+entity.id+".html"
    console.log(main_url,"mainiouwerywh")
    // let newlink: any =    
    if (!entity.slug) {
      url =  `${main_url}`;
      // console.log('citypage', url)
    } else {
      url = `${main_url}`;
      
    }
  });
  return (
    <>
      <PageLayout _site={_site}>
        <Banner name={name} />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default City;
