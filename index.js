const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8050;
const LOG_FILE = 'log.txt';
const PUBLIC_DIR = path.join(__dirname, 'public');

const products = [
    { id: 1, name: "Used Laptop", price: 300 },
    { id: 2, name: "Second-hand Bicycle", price: 50 },
];

const requestHandler = (req, res) => {
    const logMessage = [`${new Date().toISOString()}] ${req.method} ${req.url}\n`];

    fs.appendFile(LOG_FILE, logMessage, (err) => {
        if (err) console.error("Failed to write log:", err);
    });

    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the BarterX');
            break;

        case '/products':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Here are the products up for Sale in BarterX.');
            break;

        case '/login':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Login to the BarterX');
            break;

        case '/signup':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Sign up to the BarterX');
            break;

        case '/profile':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Trader Profile');
            break;

        case '/cart':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Shopping Cart is here');
            break;

        case '/checkout':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Let's start shipping");
            break;

        case '/orders':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Orders are here');
            break;

        case '/categories':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Browse Categories');
            break;

        case '/chat':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Chat with fellow Traders');
            break;

        case '/contact':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Contact Us at');
            break;

        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>About BarterX</title>
                    <link rel="stylesheet" href="/stylr.css">
                </head>
                <body>
                    <h1>About BarterX</h1>
                    <p>The modern approach to trading our commodities.</p>
                    <img src="/logo.png" alt="BarterX Logo">
                </body>
                </html>
            `);
            break;

        case '/api/products':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
            break;

        case '/logo.png':
            const logoPath = path.join(PUBLIC_DIR, 'logo.png');
            fs.readFile(logoPath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(data);
                }
            });
            break;

        case '/stylr.css':
            const cssPath = path.join(PUBLIC_DIR, 'stylr.css');
            fs.readFile(cssPath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('CSS file not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Page not found", statusCode: 404 }));
            break;
    }
};


const server = http.createServer(requestHandler);


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});