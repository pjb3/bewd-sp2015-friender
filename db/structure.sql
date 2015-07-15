drop table if exists users;
create table users (
  id serial primary key,
  email_address varchar(255),
  password_hash varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  born_on date,
  gender varchar(6),
  picture_url varchar(255),
  city varchar(255),
  state varchar(255),
  see_men boolean,
  see_women boolean,
  created_at timestamp,
  updated_at timestamp
);
