//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
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
                            printMessage(username, profile.badges.length, profile.points.JavaScript);
                          } catch (error) {
                            printError(error);
                          }
                          });
                          
                          
                      });
//Error
request.on('error', error => console.error('Problem with request : ${error.message}' ));
} catch (error) {
  printError(error);
  }
}

const users = process.argv.slice(2);
users.forEach(getProfile);