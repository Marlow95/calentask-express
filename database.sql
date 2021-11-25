CREATE DATABASE calentask;

CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
    firstname varchar(40),
    lastname varchar(40),
    username varchar(40),
    myPassword varchar(40)
);

