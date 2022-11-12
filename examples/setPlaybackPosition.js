const chrome = require("chrome-cookies-secure");
const MotortrendOnDemand = require("../index.js");

(async () => {
  const mtod = new MotortrendOnDemand({
    cookies: await chrome.getCookiesPromised(
      "https://us1-prod-direct.motortrendondemand.com",
      "header"
    ),
  });

  // Using the previous search for `garage squad`
  // 593 - Garage Squad : garage-squad : 1,2,3,4,5,6,7,8 : A team of mechanics turn half-done project vehicles into dream cars.
  // Flood of Fords - S01E01 - The Garage Squad rescues two classic American cars at once. (2615615 ms)
    // link: https://www.motortrendondemand.com/detail/flood-of-fords/108295

  const setPlayback = await mtod.setPlaybackPosition(108295, 2615615);

  // { meta: { message: 'report received' } } 
  console.log(setPlayback)
})();
