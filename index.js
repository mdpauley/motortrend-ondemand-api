const fetch = require("node-fetch");
const _ = require("lodash");

class MotortrendOnDemand {
  constructor(opt) {
    this.baseUrl =
      opt.baseUrl || "https://us1-prod-direct.motortrendondemand.com";
    this.cookies = opt.cookies || "";
    this.fetchOpts = {
      headers: {
        accept: "application/json, text/plain, */*",
        "x-disco-client": "WEB:10:MTOD:4.40.2-gi1",
        "x-disco-params": "realm=motortrend",
        cookie: this.cookies,
        Referer: "https://www.motortrendondemand.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    };
  }

  search = async (query) => {
    const url = `${
      this.baseUrl
    }/content/shows?include=images&page%5Bsize%5D=20&query=${encodeURI(query)}`;
    const res = await fetch(url, this.fetchOpts);

    return await res.json();
  };

  showSeasonInfo = async (showId, seasonNumber) => {
    const url = `${this.baseUrl}/content/videos/?filter[seasonNumber]=${seasonNumber}&filter[show.id]=${showId}&filter[videoType]=EPISODE&include=primaryChannel%2Cshow%2Cimages%2Cseason&page[number]=1&page[size]=100`;
    const res = await fetch(url, this.fetchOpts);

    return await res.json();
  };

  episodesBySeason = async (showId, seasonNumber) => {
    const season = await this.showSeasonInfo(showId, seasonNumber);

    const sortedEpisodes = _.chain(season.data)
      .sortBy("attributes.episodeNumber")
      .filter({ attributes: { videoType: "EPISODE" } })
      .value();

    return sortedEpisodes;
  };

  setPlaybackPosition = async (videoId, position) => {
    const url = `${this.baseUrl}/playback/v2/report/video/${videoId}?position=${position}`;
    const res = await fetch(url, {
      ...this.fetchOpts,
      method: "POST",
      body: null,
    });

    return await res.json();
  }
}

module.exports = MotortrendOnDemand;
