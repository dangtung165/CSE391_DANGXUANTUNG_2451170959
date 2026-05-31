
console.log("=== BẮT ĐẦU KIỂM CHỨNG CÂU A1 ===\n");

console.log("--- Đoạn 1 --");
try {
    console.log("Output đoạn 1:");
    console.log(x);
    var x = 5;
} catch (error) {
    console.error(error.message);
}
console.log("\n------------------------------------------");


console.log("--- Đoạn 2 --");
try {
    console.log("Output đoạn 2:");
    console.log(y);
    let y = 10;
} catch (error) {
    console.error("Lỗi thực tế xảy ra:", error.message);
}
console.log("\n------------------------------------------");


console.log("--- Đoạn 3 --");
try {
    console.log("Output đoạn 3:");
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.error("Lỗi thực tế xảy ra:", error.message);
}
console.log("\n------------------------------------------");


console.log("--- Đoạn 4 --");
try {
    console.log("Output đoạn 4:");
    const arr = [1, 2, 3];
    arr.push(4);
    console.log(arr);
} catch (error) {
    console.error(error.message);
}
console.log("\n------------------------------------------");


console.log("--- Đoạn 5 --");
try {
    console.log("Output đoạn 5:");
    let a = 1;
    {
        let a = 2;
        console.log("Trong block:", a);
    }
    console.log("Ngoài block:", a);
} catch (error) {
    console.error(error.message);
}
console.log("\n=== KẾT THÚC KIỂM CHỨNG ===");