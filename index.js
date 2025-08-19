// 4-masala
// const reapit = (str) => {
//     let res = []
//     for (let i = str.length-1; i > -1; i--) {
//         res.push(str[i])

//     }
//     return res.join('')
// }
// console.log(reapit('asd'));

// 5-masala
// function rotate(nums, k) {
//   let n = nums.length
//   k = k % n

//   let rotated = nums.slice(n - k).concat(nums.slice(0, n - k))
//   return rotated
// }

// console.log(rotate([1,2,3,4,5,6,7], 3));

// 6-masala
// const objNums = (obj) => {
//     let object = Object.keys(obj)
//     let res = 0
//     object.forEach(item => {
//         if (!isNaN(obj[item])) {
//             res += Number(obj[item])
//         }
//     });
//     return res
// }
// console.log(objNums({
//     a: 1,
//     b: 'ds',
//     c: 32,
// }));

// 7-masala
// function mySplit(str, delimiter) {
//   let result = []
//   let temp = ""
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === delimiter) {
//       result.push(temp)
//       temp = ""
//     } else {
//       temp += str[i]
//     }
//   }
//   result.push(temp)
//   return result
// }

// console.log(mySplit("salom dunyo yaxshimisiz", " ")); 

// 8-masala
// function isPowerOfFour(n) {
//   if (n < 1) return false
//   while (n % 4 === 0) {
//     n /= 4;
//   }
//   return n === 1
// }
// console.log(isPowerOfFour(1));  

// 9-masala
// function reverseList(arr) {
//   let left = 0
//   let right = arr.length - 1

//   while (left < right) {
//     let temp = arr[left]
//     arr[left] = arr[right]
//     arr[right] = temp
//     left++
//     right--
//   }
//   return arr
// }
// console.log(reverseList(["h","e","l","l","o"])); 

// 10-masala
// function reverseVowels(s) {
//   let vowels = "aeiouAEIOU"
//   let arr = s.split("")
//   let left = 0, right = arr.length - 1

//   while (left < right) {
//     if (!vowels.includes(arr[left])) {
//       left++
//     } else if (!vowels.includes(arr[right])) {
//       right--
//     } else {
//       [arr[left], arr[right]] = [arr[right], arr[left]]
//       left++
//       right--
//     }
//   }

//   return arr.join("");
// }
// console.log(reverseVowels("IceCreAm")); 
