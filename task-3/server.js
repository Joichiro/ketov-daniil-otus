const http = require('http');

const host = '127.0.0.1';
const port = 3000;

let prevRequestTime = new Date().getTime();
let newRequestTime;
let requestInterval,
	serverDelay = 0;

const server = http.createServer((req, res) => {
	newRequestTime = new Date().getTime();
	requestInterval = newRequestTime - prevRequestTime;
	if (requestInterval < 100) {
		serverDelay += 100 - requestInterval;
	} else serverDelay = 0;
	prevRequestTime = newRequestTime;
	setTimeout(
		res => {
			res.statusCode = 200;
			res.end();
		},
		serverDelay,
		res
	);
});

server.listen(port, host, () => {
	console.log(`Server is running at http://${host}:${port}/`);
});
