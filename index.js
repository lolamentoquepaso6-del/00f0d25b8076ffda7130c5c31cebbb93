// index.js - Ultra minimal para Render
const http = require("http");

const manifest = {
  id: "org.lolamento.cointv.static",
  version: "1.0.0",
  name: "Cointv Static ARG",
  description: "Canales deportivos ARG (externalUrl).",
  resources: ["meta", "stream"],
  types: ["channel"],
  catalogs: []
};

const channels = {
  "cointv:espn_arg": {
    name: "ESPN ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=RVNQTjJIRA"
  },
  "cointv:espn2_arg": {
    name: "ESPN 2 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=RVNQTjJfQXJn"
  },
  "cointv:espn3_arg": {
    name: "ESPN 3 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=RVNQTjM"
  },
  "cointv:espn4_arg": {
    name: "ESPN 4 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=RVNQTkhE"
  },
  "cointv:espn5_arg": {
    name: "ESPN 5 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=RVNQTjQ="
  },
  "cointv:espn6_arg": {
    name: "ESPN 6 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94U3BvcnRzM19VWQ=="
  },
  "cointv:espn7_arg": {
    name: "ESPN 7 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94U3BvcnRzMl9VWQ=="
  },
  "cointv:espn_deportes": {
    name: "ESPN Deportes",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_Deportes.svg",
    url: "https://cointv.site/canales/espn-deportes/"
  },
  "cointv:espn_premium": {
    name: "ESPN Premium",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_Premium_logo.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94X1Nwb3J0c19QcmVtaXVuX0hE"
  },
  "cointv:tnt_sport_premium": {
    name: "TNT Sport Premium",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/TNT_Sports_Logo.svg",
    url: "https://cointv.site/cvattde.html?get=VE5UX1Nwb3J0c19IRA"
  },
  "cointv:tyc_sport": {
    name: "TyC Sport",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/TyC_Sports_logo.svg",
    url: "https://cointv.site/cvattde.html?get=VHlDU3BvcnQ"
  },
  "cointv:foxsport_arg": {
    name: "Fox Sport ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94U3BvcnRz"
  },
  "cointv:foxsport2_arg": {
    name: "Fox Sport 2 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94U3BvcnRzMkhE"
  },
  "cointv:foxsport3_arg": {
    name: "Fox Sport 3 ARG",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg",
    url: "https://cointv.site/cvattde.html?get=Rm94U3BvcnRzM0hE"
  },
  "cointv:dsport": {
    name: "Ds Sport",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg",
    url: "https://cointv.site/canales.php?id=directv"
  },
  "cointv:dsport2": {
    name: "Ds Sport 2",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg",
    url: "https://cointv.site/canales.php?id=directv2"
  },
  "cointv:dsport_plus": {
    name: "Ds Sport Plus",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg",
    url: "https://cointv.site/canales.php?id=directvplus"
  }
};

http.createServer((req, res) => {
  const url = req.url.replace(/\/+$/, ""); // normalize
  if (url === "/manifest.json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(manifest));
  }

  // /meta/channel/<id>.json
  if (url.startsWith("/meta/channel/")) {
    const id = decodeURIComponent(url.split("/")[3] || "");
    const ch = channels[id];
    res.writeHead(200, { "Content-Type": "application/json" });
    if (!ch) return res.end(JSON.stringify({ meta: null }));
    return res.end(JSON.stringify({
      meta: {
        id,
        type: "channel",
        name: ch.name,
        poster: ch.logo,
        logo: ch.logo
      }
    }));
  }

  // /stream/channel/<id>.json
  if (url.startsWith("/stream/channel/")) {
    const id = decodeURIComponent(url.split("/")[3] || "");
    const ch = channels[id];
    res.writeHead(200, { "Content-Type": "application/json" });
    if (!ch) return res.end(JSON.stringify({ streams: [] }));
    return res.end(JSON.stringify({
      streams: [
        {
          title: ch.name,
          externalUrl: ch.url
        }
      ]
    }));
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
}).listen(process.env.PORT || 7000, () => {
  console.log("Listening on port", process.env.PORT || 7000);
});
