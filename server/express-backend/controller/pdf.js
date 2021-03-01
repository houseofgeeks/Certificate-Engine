const puppeteer = require('puppeteer');
var Promise = require('bluebird');
const hb = require('handlebars')

module.exports
async function generatePdf(file, options, callback) {

  const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: [
      "--incognito",
      "--no-sandbox",
      "--single-process",
      "--no-zygote"
    ],
  };

  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  if(file.content) {
    console.log("Compiling the template with handlebars")
    // we have compile our code with handlebars
    const template = hb.compile(file.content, { strict: true });
    const result = template(file.content);
    const html = result;

    // We set the page content as the generated html by handlebars
    await page.setContent(html);
  } else {
    await page.goto(file.url, {
      waitUntil: 'networkidle0', // wait for page to load completely
    });
  }

  return Promise.props(page.pdf(options))
    .then(async function(data) {
       await browser.close();

       return Buffer.from(Object.values(data));
    }).asCallback(callback);
}

module.exports.generatePdf = generatePdf;
