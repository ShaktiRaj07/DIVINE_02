import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import StoreLocator from "../components/StoreLocator";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
// import { FilterSearch } from "@yext/search-ui-react";

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Divine Design & Build",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: "ded1aa9eae96ab1f99c0d7e4611cec31",
  // make sure your experience key matches what you see in the platform
  experienceKey: "divier",
  locale: "en",
  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = ({document}) => {
  const {_site}=document;
  return (
    <PageLayout _site={_site}>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="mx-auto max-w-7xl px-4">
          <StoreLocator />
        </div>
      </SearchHeadlessProvider>
  </PageLayout>
  );
};

export default Locator;