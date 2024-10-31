CREATE TABLE IF NOT EXISTS nerd_cashe_user (
id serial PRIMARY KEY,
username varchar(35),
password char(60),
refresh_token text,
CONSTRAINT username_unique UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS book (
id serial PRIMARY KEY,
external_book_id integer NOT NULL UNIQUE,
name varchar(50),
rating numeric(2),
release_date date,
image_url varchar(75),
storyline text,
page_count numeric(4),
edition_count integer
);

CREATE TABLE IF NOT EXISTS user_book (
book_id integer REFERENCES book (id),
user_id integer REFERENCES nerd_cashe_user (id),
PRIMARY KEY (book_id,user_id)
);

CREATE TABLE IF NOT EXISTS author (
id serial PRIMARY KEY,
name varchar(50)
);
CREATE TABLE IF NOT EXISTS book_author (
book_id integer REFERENCES book (id),
author_id integer REFERENCES author (id),
PRIMARY KEY (book_id,author_id)
);

CREATE TABLE IF NOT EXISTS movie (
id serial PRIMARY KEY,
external_movie_id numeric(10) NOT NULL UNIQUE,
name varchar(50) NOT NULL,
rating numeric(2) NOT NULL,
release_date date NOT NULL,
image_url varchar(75) NOT NULL,
storyline text,
runtime numeric(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_movie (
movie_id integer REFERENCES movie (id),
user_id integer REFERENCES nerd_cashe_user (id),
PRIMARY KEY (movie_id,user_id)
);

CREATE TABLE IF NOT EXISTS castMember (
id serial PRIMARY KEY,
name varchar(50)
);

CREATE TABLE IF NOT EXISTS movie_castMember (
movie_id integer REFERENCES movie (id),
castMember_id integer REFERENCES castMember (id),
PRIMARY KEY (movie_id,castMember_id)
);

CREATE TABLE IF NOT EXISTS director (
id serial PRIMARY KEY,
name varchar(50)
);

CREATE TABLE IF NOT EXISTS movie_director (
movie_id integer REFERENCES movie (id),
director_id integer REFERENCES director (id),
PRIMARY KEY (movie_id,director_id)
);

CREATE TABLE IF NOT EXISTS game (
id serial PRIMARY KEY,
external_game_id integer NOT NULL UNIQUE,
name varchar(75) NOT NULL,
rating numeric(2) NOT NULL,
release_date date NOT NULL,
image_url varchar(75) NOT NULL,
storyline text
);

CREATE TABLE IF NOT EXISTS user_game (
game_id integer REFERENCES game (id),
user_id integer REFERENCES nerd_cashe_user (id),
PRIMARY KEY (game_id,user_id)
);

CREATE TABLE IF NOT EXISTS console (
id serial PRIMARY KEY,
name varchar(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS game_console (
game_id integer REFERENCES game (id),
console_id integer REFERENCES console (id),
PRIMARY KEY (game_id,console_id)
);

CREATE TABLE IF NOT EXISTS gamePublisher (
id serial PRIMARY KEY,
name varchar(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS game_gamePublisher (
game_id integer REFERENCES game (id),
publisher_id integer REFERENCES gamePublisher (id),
PRIMARY KEY (game_id,publisher_id)
);