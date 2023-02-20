CREATE DATABASE emanuelepifani;
CREATE USER emanuelepifani WITH PASSWORD 'gigetto';
GRANT ALL PRIVILEGES ON DATABASE emanuelepifani TO emanuelepifani;
\c emanuelepifani
CREATE TABLE studente (nome VARCHAR(255), cognome VARCHAR(255), genere VARCHAR(255));
INSERT INTO studente (nome, cognome, genere) VALUES ('John', 'Doe', 'M');
INSERT INTO studente (nome, cognome, genere) VALUES ('Jane', 'Doe', 'F');
INSERT INTO studente (nome, cognome, genere) VALUES ('Jane', 'Doe', 'F');
INSERT INTO studente (nome, cognome, genere) VALUES ('Jane', 'Doe', 'F');
INSERT INTO studente (nome, cognome, genere) VALUES ('Jane', 'Doe', 'F');
GRANT ALL PRIVILEGES ON TABLE studente TO emanuelepifani;
