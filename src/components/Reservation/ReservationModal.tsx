import React, { useState, useEffect, useRef } from 'react';
import { isHolidayEve } from '../../utils/holidays';
import { FaPhone, FaCalendarAlt, FaUsers, FaGlassCheers, FaTimes } from 'react-icons/fa';
import { useModal } from '../../context/ModalContext';
import './ReservationModal.css';

interface ReservationData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  date: string;
  heure: string;
  nombrePersonnes: string;
}

interface ReservationModalProps {
  isOpen: boolean;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen }) => {
  const { closeModal } = useModal();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [step, setStep] = useState<'form' | 'recap'>('form');
  const [formData, setFormData] = useState<ReservationData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    nombrePersonnes: ''
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Détection mobile/tablette par taille d'écran (plus fiable que la détection tactile)
  const isMobileOrTablet = window.innerWidth <= 1024;

  // Simple date change handler - works for all devices
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Amélioration tactile pour le calendrier
  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX;
    
    // Calculer la position de l'icône calendrier (à droite du champ)
    const iconZoneStart = rect.right - 40; // Zone de 40px à droite pour l'icône
    
    // Ne déclencher le calendrier que si on clique dans la zone de l'icône
    if (clickX >= iconZoneStart) {
      // Détection mobile/tablette pour le calendrier
      if (isMobileOrTablet) {
        // Force l'ouverture du calendrier sur les appareils tactiles
        setTimeout(() => {
          try {
            target.showPicker?.();
          } catch (error) {
            // Fallback si showPicker n'est pas supporté
            target.focus();
          }
        }, 100);
      }
    }
    // Si on clique ailleurs dans le champ, ne rien faire (permettre la saisie manuelle)
  };

  useEffect(() => {
    if (formData.date) {
      generateTimeSlots(formData.date);
    }
  }, [formData.date]);

  // Réinitialiser le formulaire quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        date: '',
        heure: '',
        nombrePersonnes: ''
      });
      setStep('form');
      setTimeSlots([]);
    }
  }, [isOpen]);

  // Bloquer le défilement du body quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    // Nettoyer l'effet quand le composant est démonté
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const generateTimeSlots = (selectedDate: string) => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Dimanche, 5 = Vendredi, 6 = Samedi
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    // Vérifier si c'est un vendredi, samedi ou veille de jour férié
    const isLateClosing = dayOfWeek === 5 || dayOfWeek === 6 || isHolidayEve(date);
    
    const slots: TimeSlot[] = [];
    const startHour = 18; // 18h00
    const endHour = isLateClosing ? 26 : 22; // 1h45 (26 = 2h) pour weekend/veilles de fériés, 21h45 en semaine
    const endMinute = 45; // Minutes de fin (45 dans tous les cas)
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Arrêter à 21h45 en semaine ou 1h45 les soirs spéciaux
        if (hour === (endHour - 1) && minute > endMinute) continue;
        
        // Si c'est aujourd'hui, exclure les créneaux passés avec une marge de sécurité
        if (isToday) {
          // Convertir l'heure du créneau en heure réelle (gérer le passage de minuit)
          const realSlotHour = hour >= 24 ? hour - 24 : hour;
          
          // Si le créneau est après minuit (0h, 1h, 2h...), on est le lendemain
          const isSlotNextDay = hour >= 24;
          
          // Si le créneau n'est pas le lendemain, appliquer la validation normale
          if (!isSlotNextDay) {
            // Marge de 2h pour les créneaux du même jour
            if (hour < currentHour + 2 || 
                (hour === currentHour + 2 && minute <= currentMinute)) {
              continue;
            }
          }
          // Si le créneau est le lendemain (après minuit), il est toujours valide
          // car il y a forcément plus de 2h entre maintenant et demain minuit
        }
        
        const displayHour = hour >= 24 ? hour - 24 : hour;
        const timeString = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          isAvailable: true // Tous les créneaux sont disponibles par défaut
        });
      }
    }

    setTimeSlots(slots);
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      heure: time
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('recap');
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Réservation confirmée !');
        closeModal();
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la réservation');
      console.error('Erreur:', error);
    }
  };

  const handleEdit = () => {
    setStep('form');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal-btn" onClick={closeModal} aria-label="Fermer">
          ×
        </button>
        
        {step === 'form' ? (
          <>
            <div className="modal-header">
              <h2>Réservation</h2>
              <div className="intro-text">
                C'est votre anniversaire ? Vous fêtez un enterrement de vie de jeune fille/garçon ?
                <br />
                Une envie d'une soirée spéciale entre amis, en famille ou avec des collègues ?
                <br />
                Profitez d'une grande salle de karaoké pour tous vos évènements !
                <br /><br />
                Notre équipe mettra les petits plats dans les grands pour rendre votre soirée exceptionnelle.
                <br /><br />
                Pour plus d'informations, contactez-nous au 06.03.60.02.29 ou 01.45.35.48.43
              </div>
            </div>

            <form onSubmit={handleSubmit} className="reservation-form">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="ex: Jean"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="ex: Dupont"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ex: jean.dupont@gmail.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone *</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="ex: 06 12 34 56 78"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={getMinDate()}
                      required
                      onClick={handleDateClick}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nombrePersonnes">Nombre de personnes *</label>
                    <select
                      ref={selectRef}
                      id="nombrePersonnes"
                      name="nombrePersonnes"
                      value={formData.nombrePersonnes}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionnez</option>
                      {[...Array(20)].map((_, i) => {
                        // Sur mobile/tablette : 1→20, sur desktop : 20→1
                        const num = isMobileOrTablet ? i + 1 : 20 - i;
                        return (
                          <option 
                            key={num} 
                            value={num}
                          >
                            {num} {num === 1 ? 'personne' : 'personnes'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {formData.date && (
                <div className="schedule-section">
                  <h3>Horaires disponibles</h3>
                  <div className="schedule-grid">
                    <div className="slots-container">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`time-slot ${!slot.isAvailable ? 'unavailable' : ''} ${formData.heure === slot.time ? 'selected' : ''}`}
                          onClick={() => slot.isAvailable && handleTimeSelect(slot.time)}
                          disabled={!slot.isAvailable}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={!formData.heure || !formData.nombrePersonnes || !formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.date}
              >
                Valider
              </button>
            </form>
          </>
        ) : (
          <div className="recap">
            <h2>Détails de votre réservation</h2>
            
            <div className="recap-content">
              <p><strong>Prénom :</strong> {formData.prenom}</p>
              <p><strong>Nom :</strong> {formData.nom}</p>
              <p><strong>Email :</strong> {formData.email}</p>
              <p><strong>Téléphone :</strong> {formData.telephone}</p>
              <p><strong>Date :</strong> {new Date(formData.date).toLocaleDateString()}</p>
              <p><strong>Heure :</strong> {formData.heure}</p>
              <p><strong>Nombre de personnes :</strong> {formData.nombrePersonnes}</p>
            </div>

            <div className="recap-buttons">
              <button onClick={handleEdit} className="edit-button">Modifier</button>
              <button onClick={handleConfirm} className="confirm-button">Confirmer</button>
              <button onClick={closeModal} className="cancel-button">Quitter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal; 
