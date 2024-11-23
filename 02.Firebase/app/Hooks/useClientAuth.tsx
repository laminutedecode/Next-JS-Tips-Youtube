import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../db/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();



const useClientAuth = () => {
  
  // Variables d'état pour l'utilisateur et le statut de chargement
  const [user, setUser] = useState<User | null>(null); // Initialise l'état de l'utilisateur à null
  const [isFetch, setIsFetch] = useState(true); // Initialise le statut de chargement à true
  
  // Instance du routeur Next.js
  const router = useRouter();
  
  // Fonction pour l'inscription d'un utilisateur avec email et mot de passe
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Crée un utilisateur avec l'authentification Firebase
      setUser(userCredential.user); // Définit l'état de l'utilisateur avec l'utilisateur créé
      router.push("/Dashboard"); // Redirige vers le tableau de bord en cas d'inscription réussie
    } catch (error) {
      console.log("erreur signUp"); // Journalise une erreur si l'inscription échoue
    }
  };
  
  // Fonction pour la connexion d'un utilisateur avec email et mot de passe
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Connecte l'utilisateur avec l'authentification Firebase
      setUser(userCredential.user); // Définit l'état de l'utilisateur avec l'utilisateur connecté
      router.push("/Dashboard"); // Redirige vers le tableau de bord en cas de connexion réussie
    } catch (error) {
      console.log("erreur signIn"); // Journalise une erreur si la connexion échoue
    }
  };

  // Fonction pour se connecter avec Google
  const loginWithGoogle = async ()=> {
    const result = await signInWithPopup(auth, provider); // Se connecte avec Google en utilisant la fenêtre contextuelle d'authentification Firebase
    const user = result.user; // Extrait l'utilisateur du résultat
    if(user){
      router.push("/Dashboard"); // Redirige vers le tableau de bord si l'utilisateur existe
    }
  }

  // Effet pour écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user); // Définit l'état de l'utilisateur si l'utilisateur existe
        setIsFetch(false); // Définit le statut de chargement à false
      } else {
        setUser(null); // Définit l'état de l'utilisateur à null si l'utilisateur n'existe pas
        setIsFetch(false); // Définit le statut de chargement à false
      }
    });
    return () => unsubscribe(); // Se désabonne des changements d'état d'authentification lors du démontage du composant
  }, []);

  // Fonction pour rediriger si l'utilisateur est authentifié
  const redirectIfAuthenticated = () => {
    if (user) {
      router.push('/Dashboard'); // Redirige vers le tableau de bord si l'utilisateur est authentifié
    }
  };

  // Retourne l'état de l'utilisateur, le statut de chargement et les fonctions d'authentification
  return { user, isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle };
};

// Exporte le hook d'authentification personnalisé
export default useClientAuth;

