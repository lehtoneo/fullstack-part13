CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    title text NOT NULL,
    "url" text NOT NULL,
    likes INTEGER DEFAULT 0,
    date time
);

INSERT INTO blogs (author, title, url)
VALUES ('Ossi', 'First blog', 'www.google.com');

INSERT INTO blogs (author, title, url)
VALUES ('Ossi', 'Second blog', 'www.wikipedia.com');