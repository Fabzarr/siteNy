import React, { useState, useEffect, memo } from 'react';
import MenuHeader from './MenuHeader';
import './Menu.css';

// Interfaces IDENTIQUES à CartePage
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

// Fonction utilitaire pour convertir les volumes en centilitres
const convertToCentilitres = (volume: string): number => {
  const num = parseFloat(volume.replace(/[^\d.]/g, ''));
  if (volume.toLowerCase().includes('l') && !volume.toLowerCase().includes('cl')) {
    return num * 100; // Convertir litres en centilitres
  }
  return num;
};

// Fonction pour obtenir le drapeau d'un pays
const getCountryFlag = (origin: string): string => {
  if (!origin) return '';
  const o = origin.toLowerCase();
  if (o.includes('italie') || o.includes('italien')) return '🇮🇹';
  if (o.includes('france') || o.includes('français')) return '🇫🇷';
  if (o.includes('espagne') || o.includes('espagnol')) return '🇪🇸';
  if (o.includes('portugal') || o.includes('portugais')) return '🇵🇹';
  return '';
};

// Composant VinSection COMPLET - IDENTIQUE à CartePage
const VinSection = memo<{ title: string, vins: Vin[], id: string }>(({ title, vins, id }) => {
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
    
    if (type.includes('pétillant') || type.includes('petillant') || type.includes('prosecco') || nom.includes('prosecco')) {
      return 'pétillant';
    }
    if (type.includes('champagne') || nom.includes('champagne')) return 'champagne';
    if (type.includes('rouge') || type.includes('red')) return 'rouge';
    if (type.includes('rosé') || type.includes('rose')) return 'rosé';
    if (type.includes('blanc') || type.includes('white')) return 'blanc';
    
    if (nom.includes('champagne')) return 'champagne';
    if (nom.includes('rouge')) return 'rouge';
    if (nom.includes('rosé') || nom.includes('rose')) return 'rosé';
    
    return 'blanc';
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

  // Grouper les vins italiens par type
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

  // Composant pour afficher un sous-titre de catégorie de vin
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

            {vinsItaliensRouges.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={vinsItaliensRouges} showFlag={true} />
              </>
            )}

            {vinsItaliensRoses.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={vinsItaliensRoses} showFlag={true} />
              </>
            )}

            {vinsItaliensBlancs.length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={vinsItaliensBlancs} showFlag={true} />
              </>
            )}

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

            {vinsFrancaisRouges.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={vinsFrancaisRouges} showFlag={true} />
              </>
            )}

            {vinsFrancaisRoses.length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={vinsFrancaisRoses} showFlag={true} />
              </>
            )}

            {vinsFrancaisBlancs.length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={vinsFrancaisBlancs} showFlag={true} />
              </>
            )}

            {champagnes.length > 0 && (
              <>
                <WineCategoryTitle title="CHAMPAGNES" color="#D4AF37" icon="🍾" />
                <VinGroup vins={champagnes} showFlag={true} />
              </>
            )}
          </>
        )}

        {/* Autres vins */}
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

            {autresVins.filter(vin => getWineType(vin) === 'rouge').length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROUGES" color="#ff6b6b" icon="🍷" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'rouge')} showFlag={true} />
              </>
            )}

            {autresVins.filter(vin => getWineType(vin) === 'rosé').length > 0 && (
              <>
                <WineCategoryTitle title="VINS ROSÉS" color="#ff9999" icon="🌸" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'rosé')} showFlag={true} />
              </>
            )}

            {autresVins.filter(vin => getWineType(vin) === 'blanc').length > 0 && (
              <>
                <WineCategoryTitle title="VINS BLANCS" color="#f1c40f" icon="🥂" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'blanc')} showFlag={true} />
              </>
            )}

            {autresVins.filter(vin => getWineType(vin) === 'pétillant').length > 0 && (
              <>
                <WineCategoryTitle title="VINS PÉTILLANTS" color="#e67e22" icon="🥂" />
                <VinGroup vins={autresVins.filter(vin => getWineType(vin) === 'pétillant')} showFlag={true} />
              </>
            )}

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
});

const Menu: React.FC = () => {
  const [vinsData, setVinsData] = useState<Vin[]>([]);
  const [loadingVins, setLoadingVins] = useState(true);
  const [errorVins, setErrorVins] = useState<string | null>(null);

  useEffect(() => {
    const fetchVins = async () => {
      try {
        const response = await fetch('/api/vins');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement de la carte des vins');
        }
        const data = await response.json();
        console.log('API vins data:', data);
        setVinsData(data);
        setErrorVins(null);
      } catch (err) {
        console.error('Erreur:', err);
        setErrorVins('Impossible de charger la carte des vins');
      } finally {
        setLoadingVins(false);
      }
    };

    fetchVins();
  }, []);
  return (
    <div className="menu-standalone-page">
      <MenuHeader />
      
      <div className="menu-standalone-container">
        {/* ENTRÉES AU CHOIX */}
        <div className="menu-section">
          <div className="section-header">
            <h2>ENTRÉES AU CHOIX</h2>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">SALADE DE POULET</span>
              </div>
              <div className="item-description">(salade, filet de poulet, tomate, carottes râpées, choux rouge, olives, cantal)</div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">ŒUFS MAYONNAISE</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TOMATES MOZZARELLA au Pesto</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">SAUMON FUMÉ SUR SES TOASTS</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">FOIE GRAS ET SES TOASTS</span>
                <span className="item-price supplement">+2 €</span>
              </div>
            </div>
          </div>
        </div>

        {/* PIZZA */}
        <div className="menu-section">
          <div className="section-header">
            <h2>PIZZA</h2>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">MARGHERITA</span> - sauce tomate, mozzarella, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">NAPOLITAINE</span> - sauce tomate, mozzarella, anchois, champignons, câpres, olive, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">NEPTUNE</span> - sauce tomate, mozzarella, thon, olives, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">REINE DE FRANCE</span> - crème fraîche, fromage de chèvre, parmesan, basilic</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">QUATRE FROMAGES</span> - sauce tomate, mozzarella, gorgonzola, chèvre, camembert, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">VÉSUVIO</span> - sauce tomate, mozzarella, viande hachée, œuf, oignon, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CALZONE au JAMBON</span> - sauce tomate, mozzarella, jambon, œuf, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CALZONE au THON</span> - sauce tomate, mozzarella, thon, œuf, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CHEF</span> - crème fraîche, mozzarella, lardons, oignons, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CHORIZZO</span> - sauce tomate, mozzarella, chorizo, poivrons, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">ORIENTALE</span> - sauce tomate, mozzarella, poivrons, merguez, œuf, oignons, roquette, origan, piment</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">PEPPERONI</span> - sauce tomate, mozzarella, pepperoni, tomates séchées, olives, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">REGINA</span> - sauce tomate, mozzarella, jambon, champignons, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">SAUMON FUMÉ</span> - sauce tomate, mozzarella, parmesan, jambon, chèvre, au persillé, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">HAWAI</span> - sauce tomate, mozzarella, poulet, ananas</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">ROMA</span> - sauce tomate, mozzarella, poulet, poivrons, champignons, parmesan, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">VÉGÉTARIENNE</span> - sauce tomate, mozzarella, aubergines grillées, jambon de Parme, poivrot, artichaut, olive, olives</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CATANE</span> - sauce tomate, mozzarella, salami, œuf, chorizo, coppa, roquette, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">SAVOYARDE</span> - sauce tomate, mozzarella, jambon de Parme, roquette, parmesan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">QUATRE SAISONS</span> - sauce tomate, mozzarella, jambon, olives, champignons, artichaut</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">SICILIA</span> - sauce tomate, mozzarella, jambon, poivrons, tomates de terre, roquette, au persillé, olives, roquette et origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">SCANDINAVE</span> - crème fraîche, mozzarella, saumon fumé, citron, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CARNIVORE</span> - sauce tomate, mozzarella, viande hachée, jambon, merguez, parmesan, origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">ANDREA</span> - sauce tomate, mozzarella, pepperoni, feta, aubergines grillées, tomates séchées, olives, roquette et origan</span>
                <span className="item-price supplement">+3€</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">CRÈME DE TRUFFES</span> - crème mozzarella fraîche, jambon, champignons, tomates séchées, olives, roquette et origan</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">BURRATA Jambon de Parme</span> - sauce tomate, mozzarella, jambon de Parme, pesto, burrata, tomates cerises, chèvre, basilic frais, origan</span>
                <span className="item-price supplement">+3€</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name"><span className="pizza-name">BURRATA au Poulet</span> - sauce tomate, mozzarella, poulet, pesto, burrata, tomates cerises, chèvre, basilic frais, origan</span>
                <span className="item-price supplement">+3€</span>
              </div>
            </div>
          </div>
          <div className="supplements-info">
            <p>SUPPLÉMENT LÉGUME <span className="supplement-price">(+1,00€)</span> / SUPPLÉMENT VIANDE <span className="supplement-price">(+2,00€)</span></p>
          </div>
        </div>

        {/* PÂTES */}
        <div className="menu-section">
          <div className="section-header">
            <h2>PÂTES</h2>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">LASAGNES À LA BOLOGNAISE</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">SPAGHETTI À LA BOLOGNAISE</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">PENNE AU THON</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">PENNE AUX QUATRE FROMAGES</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TAGLIATELLES AUX LÉGUMES</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TAGLIATELLES À LA CARBONARA</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TAGLIATELLES AU SAUMON</span>
              </div>
            </div>
          </div>
        </div>

        {/* VOLAILLES & POISSONS */}
        <div className="menu-section">
          <div className="section-header">
            <h2>VOLAILLES & POISSONS</h2>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">PAVÉ DE SAUMON À L'ANETH accompagnement au choix</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">CONFIT DE CANARD avec ses pommes de terre sautées à l'ail</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">ESCALOPE À LA NORMANDE escalope de volaille, crème, champignons</span>
              </div>
            </div>
          </div>
          <div className="garnitures-info">
            <p>GARNITURES AU CHOIX : spaghettis, riz, haricots verts, frites, pommes sautées</p>
            <p className="supplement-note">Garniture supplémentaire <span className="supplement-price">+ 2 €</span></p>
          </div>
        </div>

        {/* DESSERTS */}
        <div className="menu-section">
          <div className="section-header">
            <h2>DESSERTS</h2>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TIRAMISU</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">PANNA COTTA</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">MOUSSE AU CHOCOLAT</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">CRÈME BRÛLÉE</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">TARTE CITRON MERINGUÉE</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="item-name-price">
                <span className="item-name">CAFÉ OU THÉ GOURMAND</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARTE DES VINS - Composant IDENTIQUE à CartePage */}
        {loadingVins ? (
          <div className="menu-section">
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', padding: '20px 0' }}>
              Chargement de la carte des vins...
            </p>
          </div>
        ) : errorVins ? (
          <div className="menu-section">
            <p style={{ textAlign: 'center', color: '#ff6b6b', padding: '20px 0' }}>
              {errorVins}
            </p>
          </div>
        ) : vinsData.length > 0 ? (
          <VinSection 
            id="carte-des-vins" 
            title="CARTE DES VINS" 
            vins={vinsData} 
          />
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
