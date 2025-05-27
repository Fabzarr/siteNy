import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale/fr';
import { format } from 'date-fns';

registerLocale('fr', fr);
setDefaultLocale('fr');

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    numberOfPeople: 2,
    date: new Date(),
    time: ''
  });

  const peopleOptions = Array.from({ length: 19 }, (_, i) => i + 2);

  const getAvailableTimeSlots = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 5 || day === 6; // Vendredi ou Samedi

    const slots = [];
    let currentTime = new Date(date);
    currentTime.setHours(18, 0, 0); // Commence à 18h00

    const endTime = new Date(date);
    if (isWeekend) {
      endTime.setDate(endTime.getDate() + 1); // Pour gérer les horaires après minuit
      endTime.setHours(1, 45, 0); // Jusqu'à 01h45 pour le weekend
    } else {
      endTime.setHours(21, 30, 0); // Jusqu'à 21h30 en semaine
    }

    while (currentTime <= endTime) {
      slots.push(
        currentTime.toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }

    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      // Ici, envoi des données au serveur
      console.log('Réservation confirmée:', formData);
      onClose();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
    }
  };

  const handleModify = () => {
    setShowConfirmation(false);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const ReservationForm = () => (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="space-y-4">
        {/* Message d'accueil */}
        <div className="mt-2 mb-4 text-sm text-gray-500">
          <p className="mb-2">C'est votre anniversaire ? Vous fêtez un enterrement de vie de jeune fille/garçon ?</p>
          <p className="mb-2">Une envie d'une soirée spéciale entre amis, en famille ou avec des collègues ?</p>
          <p className="mb-2">Profitez d'une grande salle de karaoké pour tous vos évènements !</p>
          <p className="mb-4">Notre équipe mettra les petits plats dans les grands pour rendre votre soirée exceptionnelle.</p>
          <p>Pour plus d'informations, contactez-nous au :</p>
          <p>06.03.60.02.29 ou 01.45.35.48.43</p>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.numberOfPeople}
            onChange={(e) => setFormData({...formData, numberOfPeople: parseInt(e.target.value)})}
          >
            {peopleOptions.map(num => (
              <option key={num} value={num}>{num} personnes</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date: Date | null) => date && setFormData({...formData, date})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            locale="fr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heure</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          >
            <option value="">Sélectionnez une heure</option>
            {getAvailableTimeSlots(formData.date).map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          onClick={handleClose}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Continuer
        </button>
      </div>
    </form>
  );

  const ConfirmationModal = () => (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmation de votre réservation</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p><span className="font-medium">Nom complet:</span> {formData.firstName} {formData.lastName}</p>
        <p><span className="font-medium">Email:</span> {formData.email}</p>
        <p><span className="font-medium">Téléphone:</span> {formData.phoneNumber}</p>
        <p><span className="font-medium">Nombre de personnes:</span> {formData.numberOfPeople}</p>
        <p><span className="font-medium">Date:</span> {format(formData.date, 'dd/MM/yyyy')}</p>
        <p><span className="font-medium">Heure:</span> {formData.time}</p>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          onClick={handleModify}
        >
          Modifier
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          onClick={handleConfirm}
        >
          Confirmer la réservation
        </button>
      </div>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  {showConfirmation ? 'Confirmation de réservation' : 'Réservation'}
                </Dialog.Title>

                {showConfirmation ? <ConfirmationModal /> : <ReservationForm />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReservationModal; 