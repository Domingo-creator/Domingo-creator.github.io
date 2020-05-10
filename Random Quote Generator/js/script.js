/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes= [
  
  {
  quote: "A face without freckles is like a night without stars", 
  source: "Tina Schmidt",
  tags: ""
  },

  {
  quote: "F*ck it, Dude. Let's go bowling.",
  source: "Walter Sobchak",
  citation: "The Big Lebowski",
  year: "1998",
  tags: ""
  },

  {
  quote: "I think Pringles' original intention was to make tennis balls... But on the day the rubber was supposed to show up, a truckload of potatoes came. Pringles is a laid-back company, so they just said 'F*ck it, cut em up!'",
  source: "Mitch Hedberg",
  year: "1998",
  tags: ""
  },
  
  {
  quote: "I have no special talent.  I am only passionately curious",
  source: "Albert Einstein",
  tags: ""
  },

  {
  quote: "CONSEQUENCES WILL NEVER BE THE SAME!!!",
  source: "Gene Leonhardt",
  year:"2010",
  tags: ""
  },

  {
  quote: "All your base are belong to us",
  source: "CATS",
  citation: "Zero Wing",
  year: "1989",
  tags: ""
  },

  {
  quote: "I think I am actually humble. I think i'm more humble than you would understand.",
  source: "Donald Trump",
  citation: "60 Minutes",
  year: "2016",
  tags:  "Funny, Trump"
  },

  {
  quote: "My father gave me a small loan of a million dollars.",
  source: "Donald Trump",
  year: "2015",
  tags: "Funny, Trump" 
  },

  {
  quote: "I know words.  I have the best words.",
  source: "Donald Trump",
  year: "2016",
  tags: "Funny, Trump"
  }


];


/***
 * `getRandomQuote` function
 * 
 * This function picks a random number between 0 and the number of elements in 'quotes' - 1.
 * The function then returns the quote object at the index of randomNumber
***/
function getRandomQuote() {           //const getRandomQuote = () => {}
  const randomNumber = Math.floor(Math.random() * (quotes.length));
  return quotes[randomNumber]; 
}

/***
 * 'isSameQuote' function
 * 
 * This function reads through the HTML file and compares it to quotes[randomNumber]. If 
 * the new quote matches the current quote, it will return true. Otherwise
 * returns false.
 */

 function isSameQuote(quoteString) {  //const isSameQuote = quoteString => {}
   if(document.getElementById("quote-box").innerHTML == quoteString) {
     return true;
   }
   else {
     return false;
   }
 }

/***
 * `printQuote` function
***/
function printQuote() {                 //const printQuote = () => {}

  var randomQuote = getRandomQuote();   //let randomQuote =  getRandomQuote();
  var quoteString = '';                 //let quoteString = '';
  
  do {
    quoteString = quoteString.concat("<p class='quote'>\"" + randomQuote.quote + "\"</p>");
    quoteString = quoteString.concat("<p class='source'>" + randomQuote.source);
    if(randomQuote.citation != undefined) {
      quoteString = quoteString.concat("<span class='citation'>" + randomQuote.citation + "</span>");
    }
    if(randomQuote.year != undefined) {
      quoteString = quoteString.concat("<span class='year'>" + randomQuote.year + "</span>");
    }
    /* *** different format.  must test ****
    quoteString = quoteString.concat(`
      <p class='quote'>"${randomQuote.quote}"</p>
      <p class='source'>${randomQuote.source}
    `);

    if (randomQuote.citation != undefined) {
      quoteString = quoteString.concat(`
        <span class='year'>${randomQuote.citation}</span>
      `);
    }

    if (randomQuote.year != undefined) {
      quoteString = quoteString.concat(`
        <span class='year'>${randomQuote.year}</span>
      `);
    }
    */
    quoteString = quoteString.concat("</p>");
  }
  while (isSameQuote(quoteString) == true);
  

  document.getElementById("quote-box").innerHTML = quoteString;
  document.body.style.background = getRandomColor();
}

    
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = "rgb(" + r + "," + g + "," + b + ")";
    
    return rgb;
}
/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
var intervalID = setInterval(printQuote, 20000);