import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  HeadConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
// import StoreLocator from "../components/StoreLocator";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Banner from "../components/Banner";
import NewLocator from "../components/NewLocator";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  stagingBaseurl,
  favicon,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
// import { FilterSearch } from "@yext/search-ui-react";

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
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

const Locator: Template<TemplateRenderProps> = ({ document, __meta }) => {
  const { _site } = document;
  let templateData = { document: document, __meta: __meta };
  const endpoints = {
    universalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  };
  var Api = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";

  return (
    <>
    <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MGM ",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
    <PageLayout _site={_site}>
      <Banner />
      <h1 className="store-heading">Store Locator</h1>
      <SearchHeadlessProvider searcher={searcher}
       experienceKey={AnswerExperienceConfig.experienceKey}
       locale={AnswerExperienceConfig.locale}
       apiKey={AnswerExperienceConfig.apiKey}
       verticalKey={AnswerExperienceConfig.verticalKey}
       experienceVersion="STAGING"
       sessionTrackingEnabled={true}
       endpoints={AnswerExperienceConfig.endpoints}>
        <div className="mx-auto max-w-7xl px-4">
          {/* <StoreLocator /> */}
          <NewLocator />
        </div>
      </SearchHeadlessProvider>
    </PageLayout>
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
      </>
  );
};

export default Locator;