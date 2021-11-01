const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");
const fs = require("fs");

async function app() {
  //get stock price
  const urlRes = await fetch(
    "https://www.moneycontrol.com/india/stockpricequote/financeinvestments/adityabirlacapital/ABC9"
  );

  const text = await urlRes.text();
  const $ = cheerio.load(text);
  const name = $("#stockName > h1").text();
  const nsePrice = $("#nsespotval").attr("value");
  const nseChange = $("#nsechange").text();
  const bsePrice = $("#bsespotval").attr("value");
  const bseChange = $(
    "#inp_bse_display > div.inindi_price > div > div.indimprice > div.pricupdn.bsechange.red"
  ).text();
  console.log(name);
  console.log("Nse Price: ");
  console.log(nsePrice, nseChange);
  console.log("Bse Price");
  console.log(bsePrice, bseChange);

  //await getAllFunds();
}

async function getAllFunds() {
  let allFunds = [];
  for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(65 + i);
    let fund = await getFundForLetter(letter);
    allFunds = [...allFunds, ...fund];
  }
  fs.writeFileSync("./data.json", JSON.stringify(allFunds, null, 2), "utf8");
  //console.log(allFunds);
}

async function getFundForLetter(letter) {
  const res = await fetch(
    `https://www.moneycontrol.com/india/stockpricequote/${letter}`
  );
  const text = await res.text();
  const $ = cheerio.load(text);
  const length = $(
    "#mc_mainWrapper > div.PA10 > div.FL > div.PT15 > table > tbody > tr"
  ).length;

  const funds = [];
  for (let i = 2; i <= length; i++) {
    // let row = $(
    //   `#mc_mainWrapper > div.PA10 > div.FL > div.PT15 > table > tbody > tr:nth-child(${i})`
    // ).html();
    for (let col = 1; col <= 3; col++) {
      let fund = $(
        `#mc_mainWrapper > div.PA10 > div.FL > div.PT15 > table > tbody > tr:nth-child(${i}) > td:nth-child(${col}) > a`
      ).text();
      let colData = $(
        `#mc_mainWrapper > div.PA10 > div.FL > div.PT15 > table > tbody > tr:nth-child(${i}) > td:nth-child(${col}) > a`
      ).attr("href");
      funds.push({ name: fund, link: colData });
    }
  }
  return funds;
}

app();
