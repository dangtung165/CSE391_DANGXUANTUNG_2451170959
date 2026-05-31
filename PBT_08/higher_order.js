function pipe(...fns) {
    return (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);
}

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function retry(fn, maxAttempts = 3) {
    return async function(...args) {
        let lastError;
        for (let i = 0; i < maxAttempts; i++) {
            try {
                return await fn(...args);
            } catch (err) {
                console.log(`Lỗi lần ${i + 1}, đang thử lại...`);
                lastError = err;
            }
        }
        throw lastError;
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(process(5));

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

async function retry(fn, maxAttempts = 3) { /* ... */ }