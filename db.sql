CREATE DATABASE shopdb;
\c shopdb;

CREATE TABLE customers (
    id serial primary key,
    name varchar(100) not null,
    phone varchar(20)
);
INSERT INTO customers (name, phone) VALUES('ali', '123'),('vali', '123'),('aziz', '123'),('dilmurod', '123'),('murodbek', '123');

CREATE TABLE products (
    id serial primary key,
    name varchar(100) not null,
    price int not null
);
INSERT INTO products (name, price) VALUES('telefon', 150000),('noutbuk', 150000),('planshet', 150000),('kamera', 150000),('sichqoncha', 150000);

CREATE TABLE orders (
    id serial primary key,
    customer_id int not null,
    constraint fk_customer_id foreign key(customer_id) references customers(id) on delete cascade on update cascade,
    product_id int not null,
    constraint fk_product_id foreign key(product_id) references products(id) on delete cascade on update cascade,
    quantity int not null
);
INSERT INTO orders (customer_id, product_id, quantity) VALUES(1, 2, 1),(2, 1, 2),(3, 3, 1),(4, 5, 3),(5, 4, 1);


SELECT c.name AS mijoz, p.name AS mahsulot, o.quantity AS miqdor FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id;
SELECT c.name, p.name, p.price FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id;
SELECT p.name AS mahsulot, o.id AS buyurtma_id FROM products p LEFT JOIN orders o ON p.id = o.product_id WHERE o.id IS NULL;
SELECT * FROM customers c FULL JOIN orders o ON c.id = o.customer_id;

CREATE TABLE students (
    id serial primary key,
    name varchar(100) not null
);
INSERT INTO students (name) VALUES('ali'), ('vali'), ('aziz'), ('dilmurod'), ('murodbek');

CREATE TABLE courses (
    id serial primary key,
    name varchar(100) not null
);
INSERT INTO courses (name) VALUES('matematika'), ('ingliz tili'), ('dasturlash'), ('fizika'), ('tarix');

CREATE TABLE enrollments (
    id serial primary key,
    student_id int not null,
    constraint fk_student_id foreign key(student_id) references students(id) on delete cascade on update cascade,
    course_id int not null,
    constraint fk_course_id foreign key(course_id) references courses(id) on delete cascade on update cascade
);
INSERT INTO enrollments (student_id, course_id) VALUES(1, 1), (1, 3), (2, 2), (3, 1), (3, 4), (4, 5);


SELECT s.name AS talaba, c.name AS kurs FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.id;
SELECT s.name AS talaba, c.name AS kurs FROM students s FULL JOIN enrollments e ON s.id = e.student_id FULL JOIN courses c ON e.course_id = c.id;