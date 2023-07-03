import * as React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import DirectoryRootGrid from "../components/DirectoryRootGrid";
import Favicon from "../assets/images/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";

var currentUrl = "";

export const config: TemplateConfig = {
  stream: {
    $id: "root-stream",
    filter: {
      entityTypes: ["ce_root"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.c_addressRegionDisplayName",
      "dm_directoryChildren.dm_childEntityIds",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = "/" + document.slug.toString() + ".html";
  // console.log('currenturl', currentUrl)
  return "/" + document.slug.toString() + ".html";
  
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos directory home page.",
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

const Index: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const { name,
    slug,
    _site,
    address,
    c_locatorBannerImage,
    dm_directoryParents,
    dm_directoryChildren} = document;

    const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
      let detlslug;
  
      if (typeof entity.dm_directoryChildren != "undefined") {
        if (entity.dm_baseEntityCount == 1) {
          entity.dm_directoryChildren.map((res: any) => {
            // console.log('res', res)
            let detlslug1 = "";
            if (res.slug) {
              let slugString = res.slug ;
              let slug = slugString;
              let slugs = res.address;
              // for long url changes in this line ----
              detlslug1 =  document.slug + "/" + entity.slug + "/" + res.slug + "/" + `${slug}.html`;
              // console.log(detlslug1,"firstslug")
            } else {
              detlslug1 = `${res.slug.toString()}.html`;
              // console.log(detlslug1,"secondslug")
            }          
              detlslug = detlslug1;
            })
        }
        else {
          detlslug = slug + "/" + entity.slug + ".html";
          // console.log(detlslug,"naman145371")
        }
      }
      return (
        <li className=" storelocation-category">
          <a
            key={entity.slug}
            href={detlslug}>
            {entity.name} ({entity.dm_baseEntityCount})
          </a>
        </li>
      )
    }) : null;

  return (
    <>
      <PageLayout  _site={_site}>
        <Banner name={"Turtlehead Tacos"} />
        <div className="centered-container">
          <div className="section space-y-14 px-10">
          
            <DirectoryRootGrid
              name={"Store Directory Name"}
              directoryChildren={dm_directoryChildren}
              relativePrefixToRoot={relativePrefixToRoot}
            />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Index;
