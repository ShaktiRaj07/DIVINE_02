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
import DirectoryStateGrid from "../components/DirectoryStateGrid";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import Breadcrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "state-stream",
    filter: {
      entityTypes: ["ce_region"],
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
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_childEntityIds",
      "dm_childEntityIds",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta?.entityType?.id == "ce_country") {
      url += i.slug + "/";  
      console.log('url12', url)
    }
  });
  url += document.slug.toString();

  return url + ".html";

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

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    slug,
    _site,
    siteDomain,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  let newurl = "";
  const childrenDivs =
  dm_directoryChildren &&
  dm_directoryChildren?.map((entity: any) => {
    if (entity?.dm_baseEntityCount == 1) {
      newurl = entity.slug;
      entity.dm_directoryChildren?.map((detl: any) => {
     
        var string: any = detl.id.toString();          
        newurl =  slug +"/"+ entity.slug +"/"+string+".html";
        console.log('newurl', newurl)           
      })        
      return (
        <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
          <a key={entity.slug} href={newurl} className="hover:text-red">
            {entity.name} ({entity.dm_baseEntityCount})
          </a>
        </div>
      );
    } else {
      // console.log(dm_directoryParents&&dm_directoryParents[1]&&dm_directoryParents[1].slug,'jghhfhhhjhhhhh')
      let slug =
        "/" +
        dm_directoryParents[1]?.slug +
        "/" +
        document.slug +
        "/" +
        entity.slug +
        ".html";
      return (
        <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4 test">
          <a key={entity.slug} href={newurl} className="hover:text-red">
            {entity.name} ({entity.dm_baseEntityCount})
          </a>
        </div>
      );
    }
  });
  return (
    <>
      <PageLayout _site={_site}>
        <Banner
          name={c_addressRegionDisplayName ? c_addressRegionDisplayName : name}
        />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryStateGrid
            name={
              c_addressRegionDisplayName ? c_addressRegionDisplayName : name
            }
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default State;
