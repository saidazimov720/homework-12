function generateRandomNumbers(count, min, max) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}
console.time("search");
function preprocessBadCharacterShift(pattern) {
    const m = pattern.length;
    const badCharShift = new Map();
    
    for (let i = 0; i < m - 1; i++) {
        badCharShift.set(pattern[i], m - i - 1);
    }

    return badCharShift;
}
function boyerMoore(array, pattern) {
    const n = array.length;
    const m = pattern.length;
    if (m === 0) {
        return [];
    }
    const badCharShift = preprocessBadCharacterShift(pattern);
    const matches = [];

    let s = 0;
    while (s <= n - m) {
        let j = m - 1;

        while (j >= 0 && pattern[j] === array[s + j]) {
            j--;
        }
        if (j < 0) {
            matches.push(s);
            s += (s + m < n) ? m - (badCharShift.get(array[s + m]) || m) : 1;
        } else {
            s += Math.max(1, j - (badCharShift.get(array[s + j]) || m));
        }
    }
    return matches;
}
console.timeEnd("search");
const randomNumbers = generateRandomNumbers(1000000, 0, 1000000);
console.log("Generated Random Numbers:", randomNumbers);
const userInput ="98";
const pattern = userInput.split(",").map(Number);
const result = boyerMoore(randomNumbers, pattern);
if (result.length > 0) {
    console.log(`Pattern found at positions: ${result}`);
} else {
    console.log("Pattern not found in the array.");
}
