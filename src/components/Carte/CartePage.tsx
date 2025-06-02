import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from './SideMenu';
import './CartePage.css';

// Interface pour typer les données de l'API
interface Plat {
  id: number;
  name: string;
  description: string;
  price: number;
  photo_url?: string;
  allergenes?: string[];
}

interface VinVariant {
  id: number;
  volume_vin: string;
  contenant_vin: string;
  prix: number;
  disponible: boolean;
}

interface Vin {
  id: number;
  nom: string;
  origine_vin?: string;
  type_vin?: string;
  description?: string;
  photo_url?: string;
  variants: VinVariant[];
}

interface Categorie {
  id: number;
  nom: string;
  slug: string;
  description: string;
  ordre: number;
  plats: Plat[];
  vins?: Vin[];
}

interface MenuData {
  [key: string]: Categorie;
}

// Fonction pour convertir les volumes en centilitres pour le tri
const convertToCentilitres = (volume: string): number => {
  // Nettoyer la chaîne et extraire le nombre
  const cleanVolume = volume.toLowerCase().trim();
  const numericValue = parseFloat(cleanVolume);
  
  if (isNaN(numericValue)) {
    return 0; // Valeur par défaut si impossible à parser
  }
  
  // Détecter l'unité
  if (cleanVolume.includes('l') && !cleanVolume.includes('cl')) {
    // C'est des litres (ex: "1L", "1.5L")
    return numericValue * 100;
  } else if (cleanVolume.includes('cl') || cleanVolume.includes('centilitre')) {
    // C'est des centilitres (ex: "25cl", "37.5cl", "50cl", "75cl")
    return numericValue;
  } else {
    // Si pas d'unité explicite, on assume que c'est des cl
    return numericValue;
  }
};

// Fonction pour obtenir le drapeau du pays selon l'origine du vin
const getCountryFlag = (origine: string): string => {
  if (!origine) return '';
  
  const origineNormalized = origine.toLowerCase();
  
  // Mapping des régions/pays vers leurs drapeaux
  const flagMapping: { [key: string]: string } = {
    // France et régions françaises
    'france': '🇫🇷',
    'français': '🇫🇷',
    'française': '🇫🇷',
    'bordeaux': '🇫🇷',
    'bourgogne': '🇫🇷',
    'champagne': '🇫🇷',
    'loire': '🇫🇷',
    'rhône': '🇫🇷',
    'alsace': '🇫🇷',
    'languedoc': '🇫🇷',
    'provence': '🇫🇷',
    'côtes du rhône': '🇫🇷',
    'chablis': '🇫🇷',
    'sancerre': '🇫🇷',
    'châteauneuf-du-pape': '🇫🇷',
    
    // Italie et régions italiennes
    'italie': '🇮🇹',
    'italien': '🇮🇹',
    'italienne': '🇮🇹',
    'toscane': '🇮🇹',
    'toscan': '🇮🇹',
    'piémont': '🇮🇹',
    'vénétie': '🇮🇹',
    'sicile': '🇮🇹',
    'chianti': '🇮🇹',
    'prosecco': '🇮🇹',
    'pinot grigio': '🇮🇹',
    
    // Espagne
    'espagne': '🇪🇸',
    'espagnol': '🇪🇸',
    'espagnole': '🇪🇸',
    'rioja': '🇪🇸',
    'ribera del duero': '🇪🇸',
    'catalogne': '🇪🇸',
    
    // Portugal
    'portugal': '🇵🇹',
    'portugais': '🇵🇹',
    'portugaise': '🇵🇹',
    'douro': '🇵🇹',
    
    // Allemagne
    'allemagne': '🇩🇪',
    'allemand': '🇩🇪',
    'allemande': '🇩🇪',
    'riesling': '🇩🇪',
    
    // États-Unis
    'californie': '🇺🇸',
    'napa valley': '🇺🇸',
    'sonoma': '🇺🇸',
    
    // Australie
    'australie': '🇦🇺',
    'australien': '🇦🇺',
    'australienne': '🇦🇺',
    
    // Chili
    'chili': '🇨🇱',
    'chilien': '🇨🇱',
    'chilienne': '🇨🇱',
    
    // Argentine
    'argentine': '🇦🇷',
    'argentin': '🇦🇷'
  };
  
  // Chercher une correspondance
  for (const [region, flag] of Object.entries(flagMapping)) {
    if (origineNormalized.includes(region)) {
      return flag;
    }
  }
  
  return ''; // Pas de drapeau trouvé
};

// Composant spécialisé pour l'affichage des vins avec le même style que le reste
const VinSection: React.FC<{ title: string, vins: Vin[], id: string }> = ({ title, vins, id }) => {
  // Fonction pour déterminer si un vin est italien
  const isItalianWine = (vin: Vin): boolean => {
    if (!vin.origine_vin) return false;
    const origine = vin.origine_vin.toLowerCase();
    return origine.includes('italie') || origine.includes('italien') || 
           origine.includes('toscane') || origine.includes('toscan') ||
           origine.includes('piémont') || origine.includes('vénétie') ||
           origine.includes('sicile') || vin.nom.toLowerCase().includes('chianti') ||
           vin.nom.toLowerCase().includes('prosecco') || 
           vin.nom.toLowerCase().includes('pinot grigio');
  };

  // Fonction pour déterminer si un vin est français
  const isFrenchWine = (vin: Vin): boolean => {
    if (!vin.origine_vin) return false;
    const origine = vin.origine_vin.toLowerCase();
    return origine.includes('france') || origine.includes('français') ||
           origine.includes('bordeaux') || origine.includes('bourgogne') ||
           origine.includes('champagne') || origine.includes('loire') ||
           origine.includes('rhône') || origine.includes('alsace') ||
           origine.includes('languedoc') || origine.includes('provence') ||
           origine.includes('chablis') || origine.includes('sancerre') ||
           origine.includes('châteauneuf');
  };

  // Fonction pour déterminer le type de vin
  const getWineType = (vin: Vin): string => {
    const type = vin.type_vin?.toLowerCase() || '';
    const nom = vin.nom.toLowerCase();
    
    // Vérifier d'abord les vins pétillants (priorité)
    if (type.includes('pétillant') || type.includes('petillant') || type.includes('prosecco') || nom.includes('prosecco')) {
      return 'pétillant';
    }
    
    if (type.includes('champagne') || nom.includes('champagne')) return 'champagne';
    if (type.includes('rouge') || type.includes('red')) return 'rouge';
    if (type.includes('rosé') || type.includes('rose')) return 'rosé';
    if (type.includes('blanc') || type.includes('white')) return 'blanc';
    
    // Classification par défaut basée sur le nom
    if (nom.includes('champagne')) return 'champagne';
    if (nom.includes('rouge')) return 'rouge';
    if (nom.includes('rosé') || nom.includes('rose')) return 'rosé';
    
    return 'blanc'; // Par défaut
  };

  // Séparer les vins par pays
  const vinsItaliens = vins.filter(isItalianWine);
  const vinsFrancais = vins.filter(isFrenchWine);
  const autresVins = vins.filter(vin => !isItalianWine(vin) && !isFrenchWine(vin));

  // Grouper les vins français par type
  const vinsFrancaisRouges = vinsFrancais.filter(vin => getWineType(vin) === 'rouge');
  const vinsFrancaisRoses = vinsFrancais.filter(vin => getWineType(vin) === 'rosé');
  const vinsFrancaisBlancs = vinsFrancais.filter(vin => getWineType(vin) === 'blanc');
  const champagnes = vinsFrancais.filter(vin => getWineType(vin) === 'champagne');

  // Grouper les vins italiens par type aussi
  const vinsItaliensRouges = vinsItaliens.filter(vin => getWineType(vin) === 'rouge');
  const vinsItaliensRoses = vinsItaliens.filter(vin => getWineType(vin) === 'rosé');
  const vinsItaliensBlancs = vinsItaliens.filter(vin => getWineType(vin) === 'blanc');
  const vinsItaliensPetillants = vinsItaliens.filter(vin => getWineType(vin) === 'pétillant');

  // Composant pour afficher un groupe de vins
  const VinGroup: React.FC<{ vins: Vin[], showFlag?: boolean }> = ({ vins, showFlag = true }) => (
    <>
      {vins.map((vin) => {
        const availableVariants = vin.variants.filter(variant => variant.disponible);
        if (availableVariants.length === 0) return null;
        
        return (
          <div key={vin.id} className="menu-item">
            <div className="item-name-price">
              <span className="item-name">
                {vin.nom}
                {(vin.type_vin || vin.origine_vin) && (
                  <span style={{ color: 'rgba(212, 175, 55, 0.8)', fontSize: '0.85em', marginLeft: '8px' }}>
                    ({[
                      vin.type_vin, 
                      vin.origine_vin && showFlag && `${getCountryFlag(vin.origine_vin)} ${vin.origine_vin}`
                    ].filter(Boolean).join(' • ')})
                  </span>
                )}
              </span>
              {availableVariants.length === 1 && (
                <span className="item-price">{availableVariants[0].prix}€</span>
              )}
            </div>
            
            {vin.description && (
              <div className="item-description" style={{ marginBottom: '8px' }}>
                {vin.description}
              </div>
            )}
            
            {availableVariants.length > 1 && (
              <div style={{ marginTop: '8px' }}>
                {availableVariants
                  .sort((a, b) => convertToCentilitres(a.volume_vin) - convertToCentilitres(b.volume_vin))
                  .map((variant, index) => (
                    <div key={variant.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '4px 0',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.9em',
                      borderBottom: index < availableVariants.length - 1 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none'
                    }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {variant.volume_vin} {variant.contenant_vin}
                      </span>
                      <span style={{ color: '#D4AF37', fontWeight: '500' }}>
                        {variant.prix}€
                      </span>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  // Composant pour afficher un sous-titre de catégorie de vin avec un meilleur design
  const WineCategoryTitle: React.FC<{ title: string, color: string, icon: string }> = ({ title, color, icon }) => (
    <div style={{ 
      gridColumn: '1 / -1', 
      marginBottom: '15px',
      marginTop: '25px',
      padding: '12px 20px',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      border: `2px solid ${color}`,
      borderRadius: '12px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${color}20, transparent)`,
        zIndex: 0
      }}></div>
      <h4 style={{ 
        color: color,
        fontSize: '1.2rem', 
        margin: '0',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        {icon} {title}
      </h4>
    </div>
  );

  return (
    <div className="menu-section" id={id}>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      
      <div className="menu-grid">
        {/* Vins Italiens */}
        {vinsItaliens.length > 0 && (
          <>
            <div style={{ 
              gridColumn: '1 / -1', 
              borderBottom: '2px solid #D4AF37', 
              marginBottom: '15px',
              paddingBottom: '8px'
            }}>
              <h3 style={{ 
                color: '#D4AF37', 
                fontSize: '1.3rem', 
                margin: '0',
                textAlign: 'center'
              }}>
                🇮🇹 VINS ITALIENS
              </h3>
            </div>

            {/* Vins Rouges Italiens */}
            {vinsItaliensRouges.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={vinsItaliensRouges} showFlag={true} />
              </>
            )}

            {/* Vins Rosés Italiens */}
            {vinsItaliensRoses.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={vinsItaliensRoses} showFlag={true} />
              </>
            )}

            {/* Vins Blancs Italiens */}
            {vinsItaliensBlancs.length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={vinsItaliensBlancs} showFlag={true} />
              </>
            )}

            {/* Vins Pétillants Italiens */}
            {vinsItaliensPetillants.length > 0 && (
              <>
                <WineCategoryTitle title="VINS PÉTILLANTS" color="#e67e22" icon="🥂" />
                <VinGroup vins={vinsItaliensPetillants} showFlag={true} />
              </>
            )}
          </>
        )}

        {/* Vins Français */}
        {vinsFrancais.length > 0 && (
          <>
            <div style={{ 
              gridColumn: '1 / -1', 
              borderBottom: '2px solid #D4AF37', 
              marginBottom: '15px',
              marginTop: vinsItaliens.length > 0 ? '30px' : '0',
              paddingBottom: '8px'
            }}>
              <h3 style={{ 
                color: '#D4AF37', 
                fontSize: '1.3rem', 
                margin: '0',
                textAlign: 'center'
              }}>
                🇫🇷 VINS FRANÇAIS
              </h3>
            </div>

            {/* Vins Rouges */}
            {vinsFrancaisRouges.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={vinsFrancaisRouges} showFlag={true} />
              </>
            )}

            {/* Vins Rosés */}
            {vinsFrancaisRoses.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={vinsFrancaisRoses} showFlag={true} />
              </>
            )}

            {/* Vins Blancs */}
            {vinsFrancaisBlancs.length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={vinsFrancaisBlancs} showFlag={true} />
              </>
            )}

            {/* Champagnes */}
            {champagnes.length > 0 && (
              <>
                <WineCategoryTitle title="CHAMPAGNES" color="#D4AF37" icon="🍾" />
                <VinGroup vins={champagnes} showFlag={true} />
              </>
            )}
          </>
        )}

        {/* Autres vins (si il y en a) */}
        {autresVins.length > 0 && (
          <>
            <div style={{ 
              gridColumn: '1 / -1', 
              borderBottom: '2px solid #D4AF37', 
              marginBottom: '15px',
              marginTop: '30px',
              paddingBottom: '8px'
            }}>
              <h3 style={{ 
                color: '#D4AF37', 
                fontSize: '1.3rem', 
                margin: '0',
                textAlign: 'center'
              }}>
                🌍 AUTRES VINS
              </h3>
            </div>

            {/* Vins Rouges Autres */}
            {autresVins.filter(vin => getWineType(vin) === 'rouge').length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'rouge')} showFlag={true} />
              </>
            )}

            {/* Vins Rosés Autres */}
            {autresVins.filter(vin => getWineType(vin) === 'rosé').length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'rosé')} showFlag={true} />
              </>
            )}

            {/* Vins Blancs Autres */}
            {autresVins.filter(vin => getWineType(vin) === 'blanc').length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'blanc')} showFlag={true} />
              </>
            )}

            {/* Vins Pétillants Autres */}
            {autresVins.filter(vin => getWineType(vin) === 'pétillant').length > 0 && (
              <>
                <WineCategoryTitle title="VINS PÉTILLANTS" color="#e67e22" icon="🥂" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'pétillant')} showFlag={true} />
              </>
            )}

            {/* Champagnes Autres */}
            {autresVins.filter(vin => getWineType(vin) === 'champagne').length > 0 && (
              <>
                <WineCategoryTitle title="CHAMPAGNES" color="#D4AF37" icon="🍾" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'champagne')} showFlag={true} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const MenuSection: React.FC<{ title: string, items: Plat[], id: string }> = ({ title, items, id }) => (
  <div className="menu-section" id={id}>
    <div className="section-header">
      <h2>{title}</h2>
    </div>
    <div className="menu-grid">
      {items.map((item, index) => (
        <div key={item.id || index} className="menu-item">
          <div className="item-name-price">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}€</span>
          </div>
          <div className="item-description">{item.description}</div>
        </div>
      ))}
    </div>
    {id === "nos-viandes" && (
      <div className="garnitures-info" style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
          GARNITURES AU CHOIX : spaghettis, riz, haricots verts, frites, pommes sautées
        </p>
        <p style={{ color: '#ff4444' }}>
          GARNITURE SUPPLÉMENTAIRE +2€
        </p>
      </div>
    )}
  </div>
);

const CartePage: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [vinsData, setVinsData] = useState<Vin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Début du chargement du menu');
        
        // Charger le menu traditionnel
        console.log('🌐 URL appelée:', '/api/menu/menu-complet');
        const menuResponse = await fetch('/api/menu/menu-complet');
        console.log('📡 Réponse menu reçue:', menuResponse.status, menuResponse.statusText);
        
        if (!menuResponse.ok) {
          throw new Error(`Erreur menu ${menuResponse.status}: ${menuResponse.statusText}`);
        }
        
        const menuDataResponse = await menuResponse.json();
        console.log('✅ Données menu reçues du serveur:', menuDataResponse);
        
        // Charger les vins avec variants
        console.log('🍷 Chargement des vins...');
        try {
          const vinsResponse = await fetch('/api/vins');
          if (vinsResponse.ok) {
            const vinsDataResponse = await vinsResponse.json();
            console.log('✅ Données vins reçues:', vinsDataResponse);
            setVinsData(vinsDataResponse);
          } else {
            console.log('ℹ️ Pas de données vins disponibles (système traditionnel utilisé)');
            setVinsData([]);
          }
        } catch (vinsError) {
          console.log('ℹ️ Erreur lors du chargement des vins, utilisation du système traditionnel:', vinsError);
          setVinsData([]);
        }
        
        setMenuData(menuDataResponse);
        setError(null);
        console.log('✅ Menu data mis à jour avec succès');
      } catch (error) {
        console.error('❌ Erreur détaillée lors du chargement du menu:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // En cas d'erreur, on peut garder les données de base pour que le site reste fonctionnel
        const fallbackData: MenuData = {
          'petites-faims': {
            id: 1,
            nom: "PETITES FAIMS",
            slug: "petites-faims",
            description: "Entrées & Apéritifs",
            ordre: 1,
            plats: [
              { id: 1, name: "Connexion au serveur...", description: "Chargement des données depuis le back office", price: 0 }
            ]
          }
        };
        setMenuData(fallbackData);
        console.log('🔄 Données de fallback appliquées');
      } finally {
        console.log('🏁 Fin du chargement, loading=false');
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu />
        <motion.div 
          className="carte-page-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 1, marginLeft: '280px', padding: '40px' }}
        >
          <div className="carte-header">
            <h1>New York Café</h1>
            <h2>CHARGEMENT DE LA CARTE...</h2>
          </div>
          <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
            <p>Chargement des plats depuis le back office...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="carte-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ flex: 1, marginLeft: '280px', padding: '40px', minHeight: '100%', paddingBottom: '200px' }}
      >
        <div className="carte-header">
          <h1>New York Café</h1>
          <h2>NOTRE CARTE</h2>
          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '10px' }}>
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* Affichage dynamique des catégories depuis l'API */}
        {Object.entries(menuData)
          .sort(([, a], [, b]) => a.ordre - b.ordre)
          .map(([slug, categorie]) => {
            // Affichage spécialisé pour les vins
            if (slug === 'carte-des-vins' && vinsData.length > 0) {
              return (
                <VinSection 
                  key={slug}
                  id={slug} 
                  title={categorie.nom} 
                  vins={vinsData} 
                />
              );
            }
            
            // Affichage normal pour les autres catégories
            return (
              <MenuSection 
                key={slug}
                id={slug} 
                title={categorie.nom} 
                items={categorie.plats} 
              />
            );
          })}

        {/* Message si aucune donnée n'est disponible */}
        {Object.keys(menuData).length === 0 && (
          <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
            <p>Aucun plat disponible pour le moment.</p>
            <p>Vérifiez que le serveur backend est démarré sur le port 4000.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartePage; 