CREATE TYPE statut_reservation AS ENUM ('en_attente', 'confirmee', 'annulee');

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes >= 1 AND nombre_personnes <= 20),
  statut statut_reservation DEFAULT 'en_attente',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Contraintes
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT telephone_format CHECK (telephone ~* '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$')
);

-- Index pour optimiser les recherches
CREATE INDEX idx_reservations_date_heure ON reservations(date, heure);

-- Fonction pour vérifier la disponibilité
CREATE OR REPLACE FUNCTION verifier_disponibilite(
  date_reservation DATE,
  heure_reservation TIME,
  nb_personnes INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  total_personnes INTEGER;
BEGIN
  SELECT COALESCE(SUM(nombre_personnes), 0)
  INTO total_personnes
  FROM reservations
  WHERE date = date_reservation
    AND heure = heure_reservation
    AND statut = 'confirmee';
    
  RETURN (total_personnes + nb_personnes) <= 40;
END;
$$ LANGUAGE plpgsql; 