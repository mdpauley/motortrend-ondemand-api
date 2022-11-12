const chrome = require("chrome-cookies-secure");
const MotortrendOnDemand = require("../index.js");
const _ = require("lodash");
const zeroPad = require("zero-pad");

(async () => {
  const mtod = new MotortrendOnDemand({
    cookies: await chrome.getCookiesPromised(
      "https://us1-prod-direct.motortrendondemand.com",
      "header"
    ),
  });

  // Using the previous search for `garage squad`
  // 593 - Garage Squad : garage-squad : 1,2,3,4,5,6,7,8 : A team of mechanics turn half-done project vehicles into dream cars.
  episodes = await mtod.episodesBySeason(593, 1);

  _.each(episodes, async (episode) => {
    console.info(`${episode.attributes.name} - S${zeroPad(
        episode.attributes.seasonNumber
      )}E${zeroPad(episode.attributes.episodeNumber)} - ${
        episode.attributes.description
      } (${episode.attributes.videoDuration} ms)`)
      console.info(`    link: https://www.motortrendondemand.com/detail/${episode.attributes.alternateId}/${episode.id}`)
    });
})();
