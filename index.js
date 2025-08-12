// 1-masala
// const countVowels = (str) => {
//     let res =  0
//     let unli = [
//         'a',
//         'e',
//         'u',
//         'o',
//         'o\'',
//         'i',
//     ]

//     for (const el in str) {
//         let element = str[el]
//         if (unli.includes(element)) {
//             res ++
//         }
//     }
//     console.log(res);
// }

// countVowels('salom')

// 2-masala
// const longestCommonPrefix = (arr) => {

// }

// 3-masala
// const minPairSum = (arr)=> `eng kichkina son ${Math.min(...arr)}, eng katta son ${Math.max(...arr)}`
// console.log(minPairSum([1,2,3,4,5,6,7]));

// 4-masala
// const func = (str) => {
//     let res = 0    
//     for (let i = 0; i < str.length; i++) {
//         if (!isNaN(parseInt(str[i]))) {
//             res += parseInt(str[i])
//         }        
//     }
//     console.log(res);
// }

// func('sadf243qefdfa3')

// 5-masala
// function isPalindrome(s) {
//   return s === s.split('').reverse().join('')
// }

// function allPalindromeSubstrings(str) {
//   let result = []

//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j <= str.length; j++) {
//       let substr = str.slice(i, j)
//       if (isPalindrome(substr)) {
//         result.push(substr)
//       }
//     }
//   }
//   return result
// }

// console.log(allPalindromeSubstrings("ababa"));

// 6-masala
// const findPairs = (arr, num) => {
//   const res = []

//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === num) {
//         const a = Math.min(arr[i], arr[j])
//         const b = Math.max(arr[i], arr[j])
//         const key = `${a},${b}`
//         if (!res.includes(key)) {
//           res.push([a, b])
//         }
//       }
//     }
//   }
//   return res
// }

// console.log(findPairs([1,2,4,3,5],5));

// 7-masala
// function isPalindrome(arr) {
//     let res = []
//    for (const el of arr) {
//     let item = `${el}`
//      if (item === item.split('').reverse().join('')) {
//         res.push(item)
//      }
//    }
// }
// isPalindrome([101,113])

// 8-masala
// const closestFibonacci = num => {
//     let a = 0
//     let b = 1
//     while (b < num) {
//         [a, b] = [b, a + b];
//     }
//     return [a, b]
// };

// console.log(closestFibonacci(10));

// 9-masala
// const minPairSum = (arr)=> {
//     let min = Math.min(...arr)
//     let max = Math.max(...arr)
//     return max - min
// }
// console.log(minPairSum([1,2,3,4,5]));
