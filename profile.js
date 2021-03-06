//Use Node.js to connect to API to get profile information to print out

//Require https module
const https = require('https');
//Require http module for status codes 
const http = require('http');

//Print Error Messages
function printError(error) {console.error(error.message);
  }

//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function get(username) {
  try {
  // Connect to the API URL 
  const request = https.get(`https://website-example.com/${username}.json`, response => {
                            if (response.statusCode === 200) {
                          let body = "";
                          // Read the data
                          response.on('data', data => {
                            body += data.toString();
                          });

                          response.on('end', () => {
                            try {
                            
                            // Parse the data
                            const profile = JSON.parse(body);                            
                            // Print the data
                            printMessage(username, profile.badges.length, profile.points);
                          } catch (error) {
                            printError(error);
                          }
                          });
                              
   //Users access get method for get(username) function 
module.exports.get = get;                             
                              
                              
                              
                              
                              
                          
                          } else {
                            const msg = 'There was an error getting Profile for ${username} (${response.statusCode})';
                            const statusCodeError = new Error(msg);
                            printError(statusCodeError)
                          }
                      });
//Error
request.on('error', error => console.error('Problem with request : ${error.message}' ));
} catch (error) {
  printError(error);
  }
}
