import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
const url = 'https://tw.linovelib.com/novel/3095/catalog';
const rootUrl = 'https://tw.linovelib.com'

const token = otplib.authenticator.generate('dw5kfzxscvwxlqgt');
console.log(token);

function arraysAreEqual(arr1, arr2) {
    // Check if they are the same length
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Compare each element
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


async function getHtml(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const str = await response.text();
    fs.writeFile('htmls/chrome.html', str, (err) => {
        if (err)
            console.log(err);
        else {

        }
    });
}
//getHtml(url)
/**
 * 
 * @param {string} url url of the website to scrap
 * @param {string} element element to select
 * @returns 
 */
async function getElement(url, element) {
    const links = [];
    try {

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $(element).each((index, e) => {
            const link = $(e).attr('href');
            links.push(rootUrl+link);
        });

        fs.writeFile('links.txt', JSON.stringify(links, null, 1), (err) => {
            if (err)
                console.log(err);
            else {

            }
        });
        //console.log(links);
    }

    catch (error) {
        console.error(error);
    }

    return links
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const newUrl = "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html";


const equalArray = [];
let temp = await getElement(url, '#volumes a');
//console.log(temp)

// for (let i = 0; i < 8; i++) {
//     const temp2 = await getElement(url, '#volumes a');
//     sleep(1000);
//     equalArray.push(arraysAreEqual(temp, temp2));
//     temp = temp2;
// }

console.log(equalArray);
//console.log(a)
//getHtml('https://developer.chrome.com/')