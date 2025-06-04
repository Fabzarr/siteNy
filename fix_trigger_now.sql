-- 🔧 CORRECTION IMMÉDIATE du problème de trigger vin_variants
-- Supprimer le trigger qui cause l'erreur

DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;

-- Le trigger sur la table vins peut rester car elle a probablement updated_at
-- DROP TRIGGER IF EXISTS update_vins_modtime ON vins;  -- Laisser celui-ci

-- Vérification: afficher les triggers restants
SELECT schemaname, tablename, triggername 
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE schemaname = 'public' 
  AND tablename IN ('vins', 'vin_variants'); 