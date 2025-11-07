function identity<T>(value: T): T {
    return value;
}
console.log(identity(42));

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}
console.log(getFirstElement([1, 2, 3]));

function getLastElement<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}
console.log(getLastElement(["a", "b", "c"]));

function createKeyValuePair<K extends string, V>(key: K, value: V): Record<K, V> {
    return { [key]: value } as Record<K, V>;
}
console.log(createKeyValuePair("age", 25));

function arrayOfLength<T>(arr: T[], length: number): T[] {
    if (arr.length !== length) {
        throw new Error(`Array uzunligi ${length} bo'lishi kerak`);
    }
    return arr;
}
console.log(arrayOfLength([1, 2, 3], 3));

function getSmallestNumber(arr: number[]): number {
    return Math.min(...arr);
}
console.log(getSmallestNumber([10, 5, 7, 3]));

function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}
console.log(mergeArrays([1, 2], [3, 4]));

function sortArray<T>(arr: T[]): T[] {
    return arr;
}
console.log(sortArray([3, 2, 1].sort())); // [1,2,3]

interface CRUDOperations<T> {
    create: (item: T) => void;
    read: () => T[];
    update: (id: number, item: T) => void;
    delete: (id: number) => void;
}
const crudExample: CRUDOperations<string> = {
    create: (item) => console.log("Created:", item),
    read: () => ["a", "b"],
    update: (id, item) => console.log(`Updated ${id} -> ${item}`),
    delete: (id) => console.log("Deleted", id)
};
crudExample.create("Item");

class GenericCollection<T> {
    private items: T[] = [];

    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(index: number): T | undefined {
        return this.items.splice(index, 1)[0];
    }

    getLength(): number {
        return this.items.length;
    }

    getAllItems(): T[] {
        return this.items;
    }
}
const collection = new GenericCollection<number>();
collection.addItem(10);
collection.addItem(20);
console.log(collection.getAllItems());

function constrainedFunction<T extends number | string>(value: T): T {
    return value;
}
console.log(constrainedFunction("hello world"));

function reverseArray<T>(arr: T[]): T[] {
    const newArray: T[] = [];
    for (const element of arr) {
        newArray.push(element);
    }
    return newArray;
}
console.log(reverseArray([1, 2, 3]));

class KeyValueStore<K extends string, V> {
    private storage: Map<K, V> = new Map();

    set(key: K, value: V): void {
        this.storage.set(key, value);
    }

    get(key: K): V | undefined {
        return this.storage.get(key);
    }

    delete(key: K): boolean {
        return this.storage.delete(key);
    }
}
const store = new KeyValueStore<string, number>();
store.set("x", 99);
console.log(store.get("x"));
store.delete("x");

class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
const stack = new Stack<string>();
stack.push("A");
stack.push("B");
console.log(stack.peek());
console.log(stack.pop());

function groupBy<T>(arr: T[], key: keyof T): Map<any, T[]> {
    const grouped = new Map<any, T[]>();

    for (const item of arr) {
        const keyValue = item[key];
        if (!grouped.has(keyValue)) {
            grouped.set(keyValue, []);
        }
        grouped.get(keyValue)!.push(item);
    }

    return grouped;
}
const people = [
    { name: "Ali", age: 20 },
    { name: "Vali", age: 20 },
    { name: "Sami", age: 25 },
];
console.log(groupBy(people, "age"));

function createPair<K extends string, V>(key: K, value: V) {
    return { key, value };
}
console.log(createPair("x", 10));

function validateArrayLength<T>(arr: T[], maxLength: number): T[] {
    if (arr.length > maxLength) {
        throw new Error("Array juda uzun!");
    }
    return arr;
}
console.log(validateArrayLength([1, 2], 3 - 1));

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
const queue = new Queue<number>();
queue.enqueue(1);
console.log(queue.dequeue());

interface TreeNode<T> {
    value: T;
    children?: TreeNode<T>[];
}

function createTreeNode<T>(value: T): TreeNode<T> {
    return { value };
}
const root = createTreeNode("root");
console.log(root);

function filterByType<T>(arr: any[], type: string): any[] {
    return arr.filter(item => typeof item === type);
}
console.log(filterByType([1, "a", true, 5], "number"));

function removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}
console.log(removeDuplicates([1, 2, 2, 3, 3]));

class Pair<T, U> {
    constructor(
        public first: T,
        public second: U
    ) { }

    toString(): string {
        return `First: ${this.first}, Second: ${this.second}`;
    }

    display(): void {
        console.log(this.toString());
    }
}
const pair = new Pair("A", 123);
pair.display();

interface APIResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

function createResponse<T>(data: T): APIResponse<T> {
    return {
        success: true,
        data: data
    };
}
console.log(createResponse({ id: 1, name: "Rahmatjon" }));

interface User {
    id: number;
    name: string;
    email: string;
}
const user: User = { id: 1, name: "Rahmatjon", email: "rahmatjon974@gmail.com" };
console.log(user);
