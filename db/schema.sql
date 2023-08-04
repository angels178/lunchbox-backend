DROP DATABASE IF EXISTS snacks;

CREATE DATABASE snacks;

\c snacks;

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT,
    type VARCHAR(50), 
    released_date DATE,
    rating NUMERIC NOT NULL,
    CHECK (rating >= 0 AND rating <= 5),
    is_favorite BOOLEAN DEFAULT false 
);
