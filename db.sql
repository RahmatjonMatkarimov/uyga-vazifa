create database car;
\c car;
create extension pgcrypto;
drop table if exists cars;
create table cars(
  id varchar(255) default gen_random_uuid(),
  brand varchar(50) not null,
  model varchar(50) not null,
  year int not null,
  color varchar(30)
);
alter table cars add column motor varchar(50);
alter table cars rename column color to car_color;
alter table cars drop column motor;
alter table cars rename to vehicles;
insert into vehicles(brand, model, year, car_color) values('BMW', 'X5', 2020, 'Black');
insert into vehicles(brand, model, year, car_color) values('Tesla', 'Model S', 2023, 'White');
update vehicles set car_color = 'Blue' where brand = 'BMW';
delete from vehicles where year < 2021;
select * from vehicles;

create database fruit;
\c fruit;
create extension pgcrypto;
drop table if exists fruits;
create table fruits(
  id serial primary key,
  name varchar(50) not null,
  color varchar(30),
  price decimal(6,2)
);
alter table fruits add column country varchar(50);
alter table fruits rename column price to cost;
alter table fruits drop column country;
alter table fruits rename to fruit_table;
insert into fruit_table(name, color, cost) values('Apple', 'Red', 1.50);
insert into fruit_table(name, color, cost) values('Banana', 'Yellow', 0.80), ('Kiwi', 'Green', 2.10);
update fruit_table set cost = 1.00 where name = 'Banana';
delete from fruit_table where name = 'Kiwi';
select * from fruit_table;

create database animal;
\c animal;
create extension pgcrypto;
drop table if exists animals;
create table animals(
  id serial primary key,
  name varchar(50) not null,
  species varchar(50),
  age int
);
alter table animals add column color varchar(30);
alter table animals rename column species to type;
alter table animals drop column color;
alter table animals rename to pets;
insert into pets(name, type, age) values('Dog', 'Mammal', 5);
insert into pets(name, type, age) values('Parrot', 'Bird', 2), ('Cat', 'Mammal', 3);
update pets set age = 4 where name = 'Cat';
delete from pets where name = 'Parrot';
select * from pets;
