
export const AnswerExperienceConfig = {
    limit:3,
    locale: "en",
    apiKey : "91668f04c11784f0756d634d0dd154a2",
    verticalKey : "locations",
    experienceKey : "divier",
    experienceVersion: "STAGING",
    locationRadius: 804672,
    sessionTrackingEnabled: true,
    endpoints: {
      universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
      verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
      questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
      universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
      verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
      filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  
    }
  }