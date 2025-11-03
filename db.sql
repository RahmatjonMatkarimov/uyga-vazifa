CREATE DATABASE university;
\c university

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    birth DATE NOT NULL
);

CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE enrollments(
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    course_id INT NOT NULL,
    CONSTRAINT fk_course_id  FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
    grade INT,
    enroll_date DATE DEFAULT CURRENT_DATE,
);

CREATE TABLE notifications(
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_notify_student FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION talaba_yoshi(birth DATE)
RETURNS INT AS $$
BEGIN
    RETURN DATE_PART('year', AGE(birth))::INT;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE kursga_qoshish(p_course INT, p_student INT)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO enrollments(student_id, course_id)
    VALUES (p_student, p_course);
END;
$$;

CREATE OR REPLACE FUNCTION baho_past_xabar()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.grade < OLD.grade THEN
        INSERT INTO notifications(student_id, message)
        VALUES (NEW.student_id, 'Sizning bahongiz pasaydi.');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_baho_past
AFTER UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION baho_past_xabar();

CREATE OR REPLACE FUNCTION ortacha_baho(p_student INT)
RETURNS NUMERIC AS $$
DECLARE
    natija NUMERIC;
BEGIN
    SELECT AVG(grade) INTO natija FROM enrollments WHERE student_id = p_student;
    RETURN natija;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION qayta_yozilishni_tekshir()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM enrollments
        WHERE student_id = NEW.student_id AND course_id = NEW.course_id
    ) THEN
        RAISE EXCEPTION 'Bu talaba allaqachon bu kursga yozilgan!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_qayta_yozilma
BEFORE INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION qayta_yozilishni_tekshir();

CREATE OR REPLACE FUNCTION eng_yaxshi_talaba(p_course INT)
RETURNS TABLE(ism VARCHAR, baho INT, sana DATE) AS $$
BEGIN
    RETURN QUERY
    SELECT s.fullname, e.grade, e.enroll_date
    FROM enrollments e
    JOIN students s ON s.id = e.student_id
    WHERE e.course_id = p_course
    ORDER BY e.grade DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE kurs_talaba_soni(p_course INT, OUT soni INT)
LANGUAGE plpgsql AS $$
BEGIN
    SELECT COUNT(*) INTO soni FROM enrollments WHERE course_id = p_course;
END;
$$;

CREATE OR REPLACE FUNCTION yangi_talaba_xabar()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications(student_id, message)
    VALUES (NEW.student_id, 'Siz ro‘yxatdan o‘tdingiz!');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_yangi_talaba
AFTER INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION yangi_talaba_xabar();
