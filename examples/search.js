const chrome = require("chrome-cookies-secure");
const MotortrendOnDemand = require("../index.js");
const _ = require("lodash");

(async () => {
  const mtod = new MotortrendOnDemand({
    cookies: await chrome.getCookiesPromised(
      "https://us1-prod-direct.motortrendondemand.com",
      "header"
    ),
  });

  // search for `garage squad`
  shows = await mtod.search(`garage squad`);

  _.each(shows.data, async (show) => {
    console.info(
      `${show.id} - ${show.attributes.name} : ${show.attributes.alternateId} : ${show.attributes.seasonNumbers} : ${show.attributes.description}`
    );
  });
})();
