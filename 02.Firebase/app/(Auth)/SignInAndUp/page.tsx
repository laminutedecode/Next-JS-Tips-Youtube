"use client"
import { useState, ChangeEvent } from 'react';
import * as Yup from 'yup';
import useClientAuth from '../../Hooks/useClientAuth'; 
import GoogleLogo from "../../../public/logo-google.webp";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Format Mail invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe is requis')
});

export default function PageSignInAndUp() {


  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const { isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle } = useClientAuth(); 
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Partial est une utilité TypeScript qui rend toutes les propriétés d'un type T optionnelles. Cela signifie que chaque propriété peut être undefined. C'est utile lorsque vous souhaitez définir un état avec un ensemble initial de valeurs par défaut, mais que vous ne voulez pas spécifier toutes les propriétés immédiatement.Dans cette exemple Cela signifie que errors est un état qui contient des erreurs potentielles pour un formulaire, mais initialement, aucune erreur n'est définie. Les erreurs peuvent être ajoutées au fur et à mesure que le formulaire est validé.

  const handleFormChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setFormData({ email: '', password: '' }); 
    setErrors({});
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


const handleSignUp = () => {
  // Valide les données du formulaire selon le schéma Yup, en autorisant la validation de toutes les erreurs
  schema.validate(formData, { abortEarly: false })
  // abortEarly est une options avec Yup . Lorsqu'elle est définie sur true, Yup arrête la validation dès qu'une erreur est détectée, ce qui signifie qu'elle n'effectue pas la validation sur les autres champs du schéma. En revanche, si elle est définie sur false, Yup continue la validation sur tous les champs du schéma même après avoir trouvé une première erreur.
    .then(() => {
      // Si la validation réussit, lance la fonction signUp avec l'email et le mot de passe du formulaire
      signUp(formData.email, formData.password);
    })
    .catch((validationErrors: Yup.ValidationError) => {
      // Si la validation échoue, capture les erreurs de validation
      const formattedErrors: Partial<FormData> = {}; // Initialise un objet pour stocker les erreurs formatées
      // Parcourt chaque erreur de validation
      validationErrors.inner.forEach(error => {
        // Attribue le message d'erreur à la propriété correspondante dans l'objet des erreurs formatées
        formattedErrors[error.path as keyof FormData] = error.message;
      });
      // Met à jour l'état des erreurs avec les erreurs formatées
      setErrors(formattedErrors);
    });
};


  const handleSignIn = () => {
    schema.validate(formData, { abortEarly: false })
      .then(() => {
        signIn(formData.email, formData.password);
      })
      .catch((validationErrors: Yup.ValidationError) => {
        const formattedErrors: Partial<FormData> = {};
        validationErrors.inner.forEach(error => {
          formattedErrors[error.path as keyof FormData] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  if (isFetch) {
    return <h2>En cours de connexion</h2>;
  }

  redirectIfAuthenticated();

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2 ">
      <form className="max-w-[800px] flex flex-col gap-2 bg-slate-50 p-5 rounded shadow-md">

        {isSignUpActive ? (
          <h1 className="text-center text-gray-900 text-4xl mb-3 font-bold">Inscription</h1>
        ) : (
          <h1 className="text-center text-gray-900 text-4xl mb-3 font-bold">Connexion</h1>
        )}

        <label className="text-slate-900">Email</label>
        <input
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          name="email"
          className="h-10 border border-slate-900 rounded p-4"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <label className="text-slate-900">Password</label>
        <input
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
          className="h-10 border border-slate-900 rounded p-4"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        {isSignUpActive ? (
          <button
            onClick={handleSignUp}
            type="button"
            className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700"
          >
            S'inscrire
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            type="button"
            className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700"
          >
            Se connecter
          </button>
        )}

        {isSignUpActive ? (
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-900">
            Déja un compte? Se connecter
          </a>
        ) : (
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-900">
            Pas de compte? Créer un compte
          </a>
        )}
      </form>

      <button
        onClick={loginWithGoogle}
        type="button"
        className=" bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 p-2 flex items-center gap-2"
      >
        <Image src={GoogleLogo} width={30} height={30} alt="Logo Google" />
        <span>{isSignUpActive ? "Inscription via Google" : "Connexion via Google"}</span>
      </button>
      
    </section>
  );
}
