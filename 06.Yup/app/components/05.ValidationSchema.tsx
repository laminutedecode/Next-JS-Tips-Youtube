// Importation de React et de la bibliothèque yup
import React, { useState } from 'react';
import * as yup from 'yup';

// Définir le schéma avec des labels personnalisés et des métadonnées
const userSchema = yup.object().shape({
  name: yup.string().required('Le nom est obligatoire').label('Nom complet'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire').label('Adresse email'),
  age: yup.number().positive('L\'âge doit être un nombre positif').integer('L\'âge doit être un entier').required('L\'âge est obligatoire').label('Âge')
}).meta({
  placeholderText: 'Saisissez vos informations personnelles',
  tooltipText: 'Assurez-vous que toutes les informations sont correctes'
});

// Cloner le schéma et changer le label d'un champ
const clonedSchema = userSchema.clone();
const customLabeledSchema = clonedSchema.label('name');

// Création du composant fonctionnel UserValidation
const UserValidation = () => {
  // Définir l'état initial pour les données de l'utilisateur et les erreurs
  const [userData, setUserData] = useState({
    name: 'Jo',
    email: 'test@example.com',
    age: 25
  });
  const [errors, setErrors] = useState([]);

  // Fonction pour gérer la validation des données
  const validateUser = () => {
    customLabeledSchema.validate(userData, { abortEarly: false })
      .then(() => {
        setErrors([]);
        console.log('Validation réussie');
      })
      .catch(err => {
        setErrors(err.errors);
        console.log('Validation échouée : ', err.errors);
      });
  };

  // Retourne l'affichage du composant avec les résultats de la validation
  return (
    <div>
      <h1>Validation des utilisateurs</h1>
      <button onClick={validateUser}>Valider</button>
      {errors.length > 0 && (
        <div>
          <h2>Erreurs de validation :</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default UserValidation;
