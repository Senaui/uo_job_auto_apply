import otplib from "otplib";
import puppeteer, { Page } from "puppeteer";
import 'dotenv/config';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const pageTitles = new Map();

async function login(email, password, authkey) {
    const page = await browser.newPage();

    const recorder = await page.screencast({ path: 'recording.webm' });

    // Navigate the page to a URL.
    await page.goto('https://uozone2.uottawa.ca/en/apps');

    await page.waitForNavigation();

    await page.screenshot('login_Shot.png');

    // Set screen size.
    // await page.setViewport({width: 1080, height: 1024});

    // Type into search box.
    await page.locator('#i0116').fill(email);

    console.log('enter email');

    await page.locator('#idSIButton9').click();
    //await page.locator('#idSIButton9').click(), // Clicking the link will indirectly cause a navigation

    // await page.waitForSelector('#idSIButton9', { visible: true }); // Clicking the link will indirectly cause a navigation

    // try {
    //     await page.click('#idSIButton9');
    // } catch (error) {
    //     console.error(error);
    // }

    console.log('press next button');

    await page.locator('#i0118').fill(password);

    console.log('password enter');

    const sleepTime = 2000;
    await sleep(sleepTime);
    await page.locator('#idSIButton9').click();
    console.log('press sign in button');

    await page.locator('#signInAnotherWay').click();

    console.log('press another way');

    await page.locator("::-p-xpath(//body/div/form[@name='form']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1])").click();
    await page.locator('#idTxtBx_SAOTCC_OTC').fill(otplib.authenticator.generate(key));


    await sleep(sleepTime);
    await page.locator('#idSubmit_SAOTCC_Continue').click();

    await sleep(sleepTime);

    await Promise.all([page.locator('#idSIButton9').click(), page.waitForNavigation()]);

    await sleep(15000);
    await recorder.stop();
    return page;
}

/**
 * 
 * @param {Page} page 
 */
async function takeScreenShot(page) {

    const title = await page.title();
    if (!pageTitles.has(title)) {
        pageTitles.set(title, 1);
    } else {
        pageTitles.set(title, pageTitles.get(title) + 1);
    }
    const filename = title + pageTitles.get(title) + '.png';
    console.log('takeScreenshot called');
    await page.screenshot({ path: filename });
    return;
}


const email = process.env.email;
const password = process.env.password;
const authkey = process.env.authkey;

let loginPage = await login(email, password, authkey);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 
 * @param {Page} page 
 * @param {string} filename 
 */
async function startApply(page, filename) {
    await Promise.all([page.goto('https://nav-rte-ws-sso.uottawa.ca/WorkStudyNav.NET/LoginSSO.aspx?culture=en-CA'), page.waitForNavigation()]);
    
}

console.log(pageTitles);

//await sleep(5000)
//await takeScreenShot(loginPage);
await browser.close();
