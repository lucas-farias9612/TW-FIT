
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ==========================================
// COLE SUAS CREDENCIAIS DO FIREBASE AQUI
// ==========================================
const firebaseConfig = {
  apiKey: "COLE_SUAS_CHAVES_AQUI",
  authDomain: "tw-fit.firebaseapp.com",
  projectId: "tw-fit",
  storageBucket: "tw-fit.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// O app iniciará mesmo sem chaves válidas para não quebrar o layout,
// mas as funções de login e banco exigirão chaves reais.
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.error("Firebase initialization failed. Using mockup mode.", e);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
