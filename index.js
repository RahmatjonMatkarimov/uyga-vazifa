// 1-masala
// function mostFrequent(arr) {
//   const map = {};
//   let maxCount = 0, element = null;
//   for (let num of arr) {
//     map[num] = (map[num] || 0) + 1;
//     if (map[num] > maxCount) {
//       maxCount = map[num];
//       element = num;
//     }
//   }
//   return { element, count: maxCount };
// }
// console.log(mostFrequent([3, 7, 3, 2, 3, 7, 8, 7]));

// 2-masala
// const countEvens = (arr) => arr.filter(x => x % 2 === 0).length;
// console.log(countEvens([2, 1, 2, 3, 4]));

// 3-masala
// const uniqueElements = (arr) => arr.filter(x => arr.indexOf(x) === arr.lastIndexOf(x));
// console.log(uniqueElements([1, 2, 2, 3, 4, 4, 5]));

// 4-masala
// const reverseWords = (str) => str.split(' ').reverse().join(' ');
// console.log(reverseWords("hello world"));

// 5-masala
// const isOnlyDigits = (str) => /^\d+$/.test(str);
// console.log(isOnlyDigits("12345"));

// 6-masala
// const filterByE = (arr) => arr.filter(word => (word.match(/e/g) || []).length >= 2);
// console.log(filterByE(["elephant", "apple", "tree", "cheese", "banana"]));

// 7-masala
// function onlyAlphabetical(arr) {
//   return arr.filter(word => {
//     for (let i = 1; i < word.length; i++) {
//       if (word[i] < word[i - 1]) return false;
//     }
//     return true;
//   });
// }
// console.log(onlyAlphabetical(["abs", "dog", "xyz", "apple"]));

// 8-masala
// const toArray = (num) => num === 0 ? [0] : String(num).split('').map(Number)
// const toNumber = (arr) => Number(arr.join(''))
// console.log(toArray(235));
// console.log(toNumber([2, 3, 5]));

// 9-masala
// function measureDepth(arr) {
//   if (!Array.isArray(arr)) return 0;
//   if (arr.length === 0) return 1;
//   return 1 + Math.max(...arr.map(measureDepth));
// }
// console.log(measureDepth([[[[[]]]]]));

// 10-masala
// const digitSum = (num) => String(num).split('').reduce((sum, d) => sum + Number(d), 0)
// console.log(digitSum(4567)); 
