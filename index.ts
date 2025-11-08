class Car {
    model: string;
    year: number;
    color: string;
    constructor(model: string, year: number) {
        this.model = model;
        this.year = year;
        this.color = "white";
    }
    changeColor(newColor: string): void {
        this.color = newColor;
    }
    displayInfo(): void {
        console.log(`Model: ${this.model}, Year: ${this.year}, Color: ${this.color}`);
    }
}
const myCar = new Car("Toyota Camry", 2022);
myCar.displayInfo();

class Student {
    firstName: string;
    lastName: string;
    grade: number;
    constructor(firstName: string, lastName: string, grade: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    getStudentInfo(): string {
        return `${this.getFullName()}, Grade: ${this.grade}`;
    }
}
const student = new Student("Ali", "Valiyev", 95);
console.log(student.getStudentInfo());

class BankAccount {
    private balance: number;
    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }
    deposit(amount: number): void {
        this.balance += amount;
    }
    withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    getBalance(): number {
        return this.balance;
    }
}
const account = new BankAccount(1000);
console.log(account.getBalance());
account.deposit(500);

class UserAccount {
    public username: string;
    private password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    changePassword(newPassword: string): void {
        this.password = newPassword;
    }
    protected validatePassword(inputPassword: string): boolean {
        return this.password === inputPassword;
    }
}
const userAccount = new UserAccount("john_doe", "secret123");
console.log("Username:", userAccount.username);
userAccount.changePassword("newPassword456");

interface Animal {
    name: string;
    age: number;
    speak(): void;
}

class Dog implements Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    speak(): void {
        console.log("Woof! Woof!");
    }
}

class Cat implements Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    speak(): void {
        console.log("Meow!");
    }
}
const dog = new Dog("Rex", 3);
const cat = new Cat("Whiskers", 2);
console.log(`Dog name: ${dog.name}, age: ${dog.age}`);
dog.speak();
console.log(`Cat name: ${cat.name}, age: ${cat.age}`);
cat.speak();

interface RentalItem {
    id: string;
    name: string;
    pricePerDay: number;
    rentItem(): void;
    returnItem(): void;
}

class CarRental implements RentalItem {
    id: string;
    name: string;
    pricePerDay: number;
    constructor(id: string, name: string, pricePerDay: number) {
        this.id = id;
        this.name = name;
        this.pricePerDay = pricePerDay;
    }
    rentItem(): void {
        console.log(`Car ${this.name} rented`);
    }
    returnItem(): void {
        console.log(`Car ${this.name} returned`);
    }
}
const carRental = new CarRental("C001", "BMW X5", 150);
console.log(`Renting ${carRental.name} at $${carRental.pricePerDay}/day`);
carRental.rentItem();
carRental.returnItem();

class HouseRental implements RentalItem {
    id: string;
    name: string;
    pricePerDay: number;
    constructor(id: string, name: string, pricePerDay: number) {
        this.id = id;
        this.name = name;
        this.pricePerDay = pricePerDay;
    }
    rentItem(): void {
        console.log(`House ${this.name} rented`);
    }
    returnItem(): void {
        console.log(`House ${this.name} returned`);
    }
}
const houseRental = new HouseRental("H001", "Beach House", 300);
console.log(`Renting ${houseRental.name} at $${houseRental.pricePerDay}/day`);
houseRental.rentItem();
houseRental.returnItem();

abstract class Calculator {
    abstract add(a: number, b: number): number;
    abstract subtract(a: number, b: number): number;
    abstract multiply(a: number, b: number): number;
    calculate(a: number, b: number, operation: string): number {
        switch (operation) {
            case 'add':
                return this.add(a, b);
            case 'subtract':
                return this.subtract(a, b);
            case 'multiply':
                return this.multiply(a, b);
            default:
                throw new Error('Invalid operation');
        }
    }
}

class BasicCalculator extends Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    subtract(a: number, b: number): number {
        return a - b;
    }
    multiply(a: number, b: number): number {
        return a * b;
    }
}
const calc = new BasicCalculator();
console.log(calc.calculate(5, 3, 'add'));

abstract class Shape {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract getArea(): number;
    abstract getPerimeter(): number;
}

class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super("Circle");
        this.radius = radius;
    }
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}
const circle = new Circle(5);
console.log(circle.name);

class Rectangle extends Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    getArea(): number {
        return this.width * this.height;
    }
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}
const rectangle = new Rectangle(10, 5);
console.log(rectangle.name);

class Counter {
    private static count: number = 0;
    static increment(): void {
        Counter.count++;
    }
    static getCount(): number {
        return Counter.count;
    }
}

Counter.increment();
console.log(Counter.getCount());

class Singleton {
    private static instance: Singleton;
    private constructor() { }
    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2);

class Account {
    accountNumber: string;
    holderName: string;
    protected balance: number;
    constructor(accountNumber: string, holderName: string, balance: number) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = balance;
    }
    deposit(amount: number): void {
        this.balance += amount;
    }
    withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    checkBalance(): number {
        return this.balance;
    }
}

const bankAccount = new Account("asd", "asd", 5000);
bankAccount.deposit(2000);
bankAccount.withdraw(1500);
console.log(bankAccount.checkBalance());

class AdminAccount extends Account {
    adminPrivileges: string[];
    constructor(accountNumber: string, holderName: string, balance: number) {
        super(accountNumber, holderName, balance);
        this.adminPrivileges = ['create', 'delete', 'update'];
    }
    manageUsers(): void {
        console.log("Managing users...");
    }
}
const admin = new AdminAccount("ADM001", "Admin User", 10000);
admin.manageUsers();
admin.deposit(5000);
console.log("Admin balance:", admin.checkBalance());

class CustomerAccount extends Account {
    customerType: string;
    constructor(accountNumber: string, holderName: string, balance: number, customerType: string) {
        super(accountNumber, holderName, balance);
        this.customerType = customerType;
    }
    viewBalance(): number {
        return this.balance;
    }
}
const customer = new CustomerAccount("asd", "asd", 3000, "asd");
customer.deposit(1000);
console.log(customer.viewBalance());

class Product {
    name: string;
    price: number;
    category: string;
    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
const product = new Product("Laptop", 1200, "Electronics");
console.log(product.name);

class DiscountedProduct extends Product {
    discountPercentage: number;
    constructor(name: string, price: number, category: string, discountPercentage: number) {
        super(name, price, category);
        this.discountPercentage = discountPercentage;
    }
    calculateDiscountedPrice(): number {
        return this.price - (this.price * this.discountPercentage / 100);
    }
}
const discountedProduct = new DiscountedProduct("Phone", 800, "Electronics", 20);
console.log(discountedProduct.name);

abstract class Character {
    name: string;
    health: number;
    constructor(name: string, health: number) {
        this.name = name;
        this.health = health;
    }
    abstract attack(): void;
    abstract defend(): void;
}

class Warrior extends Character {
    weapon: string;
    constructor(name: string, health: number, weapon: string) {
        super(name, health);
        this.weapon = weapon;
    }
    attack(): void {
        console.log(`${this.name} attacks with ${this.weapon}!`);
    }
    defend(): void {
        console.log(`${this.name} defends with shield!`);
    }
}
const warrior = new Warrior("Conan", 100, "Sword");
console.log(`Warrior: ${warrior.name}, Health: ${warrior.health}, Weapon: ${warrior.weapon}`);
warrior.attack();
warrior.defend();

class Mage extends Character {
    mana: number;
    constructor(name: string, health: number, mana: number) {
        super(name, health);
        this.mana = mana;
    }
    attack(): void {
        console.log(`${this.name} casts a spell!`);
    }
    defend(): void {
        console.log(`${this.name} creates a magic barrier!`);
    }
}
const mage = new Mage("Gandalf", 80, 150);
console.log(`Mage: ${mage.name}, Health: ${mage.health}, Mana: ${mage.mana}`);
mage.attack();
mage.defend();