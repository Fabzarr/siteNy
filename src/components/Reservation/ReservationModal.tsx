import React, { useState, useEffect } from 'react';
import { isHolidayEve } from '../../utils/holidays';
import { FaPhone, FaCalendarAlt, FaUsers, FaGlassCheers } from 'react-icons/fa';
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
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
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

  useEffect(() => {
    if (formData.date) {
      generateTimeSlots(formData.date);
    }
  }, [formData.date]);

  const generateTimeSlots = (selectedDate: string) => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Dimanche, 5 = Vendredi, 6 = Samedi
    
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
        
        const displayHour = hour >= 24 ? hour - 24 : hour;
        const timeString = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          isAvailable: Math.random() > 0.3 // Simulation de disponibilité
        });
      }
    }

    setTimeSlots(slots);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Réservation confirmée !');
        onClose();
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Fermer">
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
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nombrePersonnes">Nombre de personnes *</label>
                    <select
                      id="nombrePersonnes"
                      name="nombrePersonnes"
                      value={formData.nombrePersonnes}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionnez</option>
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'personne' : 'personnes'}
                        </option>
                      ))}
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
                disabled={!formData.heure}
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
              <button onClick={onClose} className="cancel-button">Quitter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal; 