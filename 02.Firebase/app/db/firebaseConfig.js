
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {

};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);