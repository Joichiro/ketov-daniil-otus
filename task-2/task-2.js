const fn1 = () => {
	console.log('fn1');
	return Promise.resolve(2);
};

const fn2 = () =>
	new Promise(resolve => {
		console.log('fn2');
		setTimeout(() => resolve(2), 1000);
	});

const reducer = (memo, value) => {
	console.log('reduce');
	return memo * value;
};

function promiseReduce(asyncFunctions, reduce, initialValue) {
	if (!asyncFunctions.length) {
		return initialValue;
	}

	const fn1 = asyncFunctions.shift();
	const promise = fn1();

	return promise.then(res => {
		const result = reduce(initialValue, res);

		if (!asyncFunctions.length) {
			return Promise.resolve(result);
		} else {
			return promiseReduce(asyncFunctions, reduce, result);
		}
	});
}

promiseReduce([fn1, fn2], reducer, 1).then(console.log);
