function playGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    let attempts = 0;
    let guessedNumbers = [];
    alert("Máy đã chọn ngẫu nhiên 1 số từ 1 đến 100. Bạn có tối đa 7 lượt đoán!");

    while (attempts < maxAttempts) {
        let input = prompt(`Lượt đoán thứ ${attempts + 1}/${maxAttempts}. Nhập số của bạn:`);
        if (input === null) {
            alert("Bạn đã thoát trò chơi.");
            return;
        }

        let guess = parseInt(input);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng nhập một số hợp lệ từ 1 đến 100!");
            continue;
        }
        let alreadyGuessed = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === guess) {
                alreadyGuessed = true;
                break;
            }
        }
        if (alreadyGuessed) {
            alert(`Cảnh báo: Bạn đã đoán số ${guess} này rồi! Vui lòng thử số khác.`);
            continue;
        }
        guessedNumbers.push(guess);
        attempts++;
        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần! 🎉`);
            return;
        } else if (guess > targetNumber) {
            alert("Thấp hơn!");
        } else {
            alert("Cao hơn!");
        }
    }
    alert(`Bạn đã hết lượt đoán! Bạn thua rồi. Đáp án chính xác là: ${targetNumber}`);
}
playGame();