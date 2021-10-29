const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");
const fs = require("fs");

async function app() {
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
