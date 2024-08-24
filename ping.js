const https = require('https');
const http = require('http');
const cron = require('node-cron');

const pingUrl = 'https://temis-dev.onrender.com/'; // Replace with the URL you want to ping

function pingWebsite() {
  https.get(pingUrl, (res) => {
    console.log(`Pinged ${pingUrl} - Status Code: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Error pinging ${pingUrl}: ${err.message}`);
  });
}

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running task every 5 minutes');
  pingWebsite();
});

// Create an HTTP server that listens on a random port
const PORT = process.env.PORT || 3000; // Render will set the PORT environment variable
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running\n');
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
