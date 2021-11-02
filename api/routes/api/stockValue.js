const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");

router.get("/", async (req, res) => {
  try {
    const linkTest =
      "https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/abbottindia/AI51";
    const urlRes = await fetch(linkTest);
    const text = await urlRes.text();
    const $ = cheerio.load(text);
    const name = $("#stockName > h1").text();
    const nsePrice = $("#nsespotval").attr("value");
    const nseChange = $("#nsechange").text();
    const bsePrice = $("#bsespotval").attr("value");
    const bseChange = $(
      "#inp_bse_display > div.inindi_price > div > div.indimprice > div.pricupdn.bsechange.grn"
    ).text();
    const changeAsOn = $(
      "#inp_nse > div > div.inindi_price > div > div.indimprice > p"
    ).text();
    return res.json({
      name,
      nsePrice,
      nseChange,
      bsePrice,
      bseChange,
      changeAsOn,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

module.exports = router;
