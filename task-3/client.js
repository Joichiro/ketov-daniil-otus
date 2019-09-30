const http = require('http');
const program = require('commander');
program
	.option('-l, --limit <requestLimit>', 'Define number of requests')
	.option('-t, --type <requestType>', 'Define type of requests: sequential or parallel')
	.parse(process.argv);

const PARALLEL_REQUESTS = 'parallel';
const SEQUENTIAL_REQUESTS = 'sequential';

const server = {
	host: '127.0.0.1',
	port: 3000,
};

const sequentialRequests = counter => {
	if (counter) {
		http.request(server, res => {
			console.log(res.statusMessage);
			sequentialRequests(--counter);
		}).end();
	} else return;
};

const parallelRequests = counter => {
	if (counter) {
		for (let i = 0; i < counter; i++) {
			http.request(server, res => {
				console.log(res.statusMessage);
			}).end();
		}
	} else return;
};

const start = (requestLimit, requestType) => {
	if (!/^\d+$/.test(requestLimit)) throw new TypeError('Limit of request must be defined as number');
	switch (requestType) {
		case PARALLEL_REQUESTS: {
			console.log('Running parallel requests!');
			return parallelRequests(requestLimit);
		}
		case SEQUENTIAL_REQUESTS: {
			console.log('Running sequential requests!');
			return sequentialRequests(requestLimit);
		}
		default:
			throw new TypeError('Type of request must be "sequential" or "parallel"');
	}
};

start(program.limit, program.type);
