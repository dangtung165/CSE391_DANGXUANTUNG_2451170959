const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;
let maxStudent = null;
let minStudent = null;
let totalMath = 0, totalPhysics = 0, totalCs = 0;
let totalMaleScore = 0, countMale = 0;
let totalFemaleScore = 0, countFemale = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let sv = students[i];
    let dtb = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    dtb = Math.round(dtb * 10) / 10;
    sv.dtb = dtb;
    let xepLoai = "";
    if (dtb >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (dtb >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (dtb >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }
    let paddedName = sv.name.padEnd(6, ' ');
    let paddedDtb = dtb.toFixed(1).padEnd(4, ' ');
    console.log(`| ${i + 1}   | ${paddedName} | ${paddedDtb} | ${xepLoai.padEnd(11, ' ')} |`);
    if (maxStudent === null || dtb > maxStudent.dtb) maxStudent = sv;
    if (minStudent === null || dtb < minStudent.dtb) minStudent = sv;
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;
    if (sv.gender === "M") {
        totalMaleScore += dtb;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleScore += dtb;
        countFemale++;
    }
}

console.log("---------------------------------------------");
console.log(`\n* ĐẾM SỐ LƯỢNG XẾP LOẠI:`);
console.log(`- Giỏi: ${countGioi} | Khá: ${countKha} | Trung bình: ${countTB} | Yếu: ${countYeu}`);

console.log(`\n* THỦ KHOA & THỦ VĨ:`);
console.log(`- Cao nhất: ${maxStudent.name} (${maxStudent.dtb})`);
console.log(`- Thấp nhất: ${minStudent.name} (${minStudent.dtb})`);

console.log(`\n* ĐIỂM TRUNG BÌNH TOÀN LỚP THEO MÔN:`);
console.log(`- Toán: ${(totalMath / students.length).toFixed(2)}`);
console.log(`- Vật lý: ${(totalPhysics / students.length).toFixed(2)}`);
console.log(`- Tin học (CS): ${(totalCs / students.length).toFixed(2)}`);

console.log(`\n* BONUS: ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH:`);
console.log(`- Nam (M): ${(totalMaleScore / countMale).toFixed(2)}`);
console.log(`- Nữ (F): ${(totalFemaleScore / countFemale).toFixed(2)}`);