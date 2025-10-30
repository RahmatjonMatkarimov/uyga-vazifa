CREATE DATABASE universitet;
\c universitet;
CREATE TABLE talabalar (
    student_id SERIAL PRIMARY KEY,
    ism VARCHAR(50),
    shahar VARCHAR(50),
    yosh INT,
    baho INT,
    birth_date DATE
);
CREATE TABLE kurslar (
    kurs_id SERIAL PRIMARY KEY,
    kurs_nomi VARCHAR(50),
    student_id INT REFERENCES talabalar(student_id),
    baho INT
);
CREATE TABLE oqituvchilar (
    teacher_id SERIAL PRIMARY KEY,
    ism VARCHAR(50),
    shahar VARCHAR(50),
    kurs_nomi VARCHAR(50),
    baho INT
);
INSERT INTO talabalar (ism, shahar, yosh, baho, birth_date) VALUES('Ali', 'Toshkent', 20, 85, '2004-05-12'),('Vali', 'Samarqand', 22, 72, '2002-07-25'),('Dilshod', 'Andijon', 25, 90, '2000-10-03'),('Shahnoza', 'Toshkent', 18, 65, '2006-03-15'),('Shirin', 'Buxoro', 21, 78, '2003-12-22'),('Sardor', 'Namangan', 19, 88, '2005-01-09');
INSERT INTO kurslar (kurs_nomi, student_id, baho) VALUES('Matematika', 1, 80),('Fizika', 2, 70),('Ingliz tili', 3, 95),('Tarix', 4, 60),('Kimyo', 5, 85),('Biologiya', 6, 75);
INSERT INTO oqituvchilar (ism, shahar, kurs_nomi, baho) VALUES('Rustam', 'Toshkent', 'Matematika', 90),('Ravshan', 'Samarqand', 'Fizika', 88),('Malika', 'Buxoro', 'Kimyo', 92),('Rano', 'Xorazm', 'Tarix', 86),('Rahmon', 'Namangan', 'Biologiya', 80),('Aziza', 'Andijon', 'Ingliz tili', 89);
CREATE INDEX idx_student_id ON talabalar(student_id);
CREATE INDEX idx_teacher_id ON oqituvchilar(teacher_id);
SELECT kurs_nomi, student_id, baho
FROM kurslar
ORDER BY baho DESC
LIMIT 10;
SELECT kurs_nomi, AVG(baho) AS ortacha_baho
FROM oqituvchilar
GROUP BY kurs_nomi
HAVING AVG(baho) > 85;
SELECT ism, shahar, 'talaba' AS shaxs_turi FROM talabalar
UNION
SELECT ism, shahar, 'oqituvchi' AS shaxs_turi FROM oqituvchilar;
SELECT * FROM talabalar
WHERE (yosh BETWEEN 18 AND 25) OR (shahar IN ('Samarqand', 'Xorazm'));
SELECT * FROM talabalar
WHERE ism LIKE '%o';
SELECT * FROM oqituvchilar
WHERE ism ILIKE 'r%';
SELECT * FROM oqituvchilar OFFSET 20 LIMIT 5;