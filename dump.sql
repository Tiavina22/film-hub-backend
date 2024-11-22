-- Création de la base de données
CREATE DATABASE filmhub;

-- Connexion à la base de données
\c filmhub;

-- Table users_compte
CREATE TABLE users_compte (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INTEGER,
    genre VARCHAR(50),
    pays VARCHAR(100),
    region VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table type_compte
CREATE TABLE type_compte (
    id SERIAL PRIMARY KEY,
    id_users INTEGER REFERENCES users_compte(id),
    etat INTEGER DEFAULT 0 CHECK (etat IN (0, 1, 9)), -- 0: free, 1: premium, 9: non actif
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table compte_etat
CREATE TABLE compte_etat (
    id SERIAL PRIMARY KEY,
    id_users INTEGER REFERENCES users_compte(id),
    etat INTEGER DEFAULT 0 CHECK (etat IN (0, 1)), -- 0: non vérifié, 1: vérifié
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table preferences_user
CREATE TABLE preferences_user (
    id SERIAL PRIMARY KEY,
    id_users INTEGER REFERENCES users_compte(id),
    preference_genre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les recherches
CREATE INDEX idx_users_username ON users_compte(username);
CREATE INDEX idx_type_compte_users ON type_compte(id_users);
CREATE INDEX idx_compte_etat_users ON compte_etat(id_users);
CREATE INDEX idx_preferences_users ON preferences_user(id_users);

-- Triggers pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_compte_updated_at
    BEFORE UPDATE ON users_compte
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_type_compte_updated_at
    BEFORE UPDATE ON type_compte
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compte_etat_updated_at
    BEFORE UPDATE ON compte_etat
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_user_updated_at
    BEFORE UPDATE ON preferences_user