function upperCaseKeys(obj: object): object {
    const result: { [key: string]: any } = {};
    for (let key in obj) {
        result[key.toUpperCase()] = obj[key as keyof typeof obj];
    }
    return result;
}

const data = { name: "Ali", age: 25, country: "Uzbekistan" };
console.log(upperCaseKeys(data));

function fizzBuzz(n: number): string[] {
    const result: string[] = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(String(i));
        }
    }
    return result;
}

console.log(fizzBuzz(15));

function getPermutations(str: string): string[] {
    if (str.length <= 1) return [str];

    const result: string[] = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remaining = str.slice(0, i) + str.slice(i + 1);
        const perms = getPermutations(remaining);

        for (let perm of perms) {
            result.push(char + perm);
        }
    }
    return result;
}

console.log(getPermutations("abc"));

interface DiffResult {
    [key: string]: {
        old: any;
        new: any;
    };
}

function jsonDiff(obj1: object, obj2: object): object {
    const diff: DiffResult = {};

    for (let key in obj1) {
        if (obj1[key as keyof typeof obj1] !== obj2[key as keyof typeof obj2]) {
            diff[key] = {
                old: obj1[key as keyof typeof obj1],
                new: obj2[key as keyof typeof obj2]
            };
        }
    }

    for (let key in obj2) {
        if (!(key in obj1)) {
            diff[key] = {
                old: undefined,
                new: obj2[key as keyof typeof obj2]
            };
        }
    }

    return diff;
}

const oldData = { name: "Ali", age: 25, city: "Toshkent" };
const newData = { name: "Ali", age: 26, country: "Uzbekistan" };
console.log(jsonDiff(oldData, newData));



function sortIPs(ips: string[]): string[] {
    return ips.sort((a, b) => {
        const partsA = a.split(".").map((x) => Number(x));
        const partsB = b.split(".").map((x) => Number(x));

        for (let i = 0; i < 4; i++) {
            if (partsA[i] !== partsB[i]) {
                return (partsA[i] ?? 0) - (partsB[i] ?? 0);
            }
        }
        return 0;
    });
}

console.log(sortIPs(["192.168.1.1", "192.168.1.10", "192.168.1.5", "192.168.1.4"]));

function compressString(str: string): string {
    if (str.length === 0) return "";

    let result: string = "";
    let count: number = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            result += str[i - 1];
            if (count > 1) {
                result += count;
            }
            count = 1;
        }
    }

    return result;
}

console.log(compressString("aaabbcddd"));


function isValidSudoku(board: number[][]): boolean {
    for (let row of board) {
        if (!isValidSet(row)) return false;
    }

    for (let col = 0; col < 9; col++) {
        const column: number[] = [];
        for (let row = 0; row < 9; row++) {
            column.push(board[row]?.[col] ?? 0);
        }
        if (!isValidSet(column)) return false;
    }

    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const block: number[] = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    block.push(board[blockRow * 3 + i]?.[blockCol * 3 + j] ?? 0);
                }
            }
            if (!isValidSet(block)) return false;
        }
    }
    return true;
}

function isValidSet(arr: number[]): boolean {
    const seen = new Set<number>();
    for (let num of arr) {
        if (num !== 0) {
            if (seen.has(num) || num < 1 || num > 9) {
                return false;
            }
            seen.add(num);
        }
    }
    return true;
}

const board: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
];
console.log(isValidSudoku(board));


function groupAnagrams(words: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (let word of words) {
        const sorted: string = word.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted)!.push(word);
    }

    return Array.from(map.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));