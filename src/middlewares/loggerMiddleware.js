const fs = require('fs');
const path = require('path');

const logRequests = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile(path.join(__dirname, '../logs/requests.log'), log, (err) => {
    if (err) console.error('Error logging request:', err);
  });
  next();
};

module.exports = logRequests;