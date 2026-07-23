// ============================================================
// CONFIGURAÇÃO DO FIREBASE — partilhada por todas as páginas
// Substitui os valores abaixo pelos da tua consola Firebase
// (Project settings > General > Your apps > SDK setup and configuration)
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyClBUTqnJA8EtTFVOODgc9InbC0xgJardo",
  authDomain: "ducking-around-7df7c.firebaseapp.com",
  projectId: "ducking-around-7df7c",
  storageBucket: "ducking-around-7df7c.firebasestorage.app",
  messagingSenderId: "46954309635",
  appId: "1:46954309635:web:fe3c98e42a71593254c636",
  measurementId: "G-H8Z9VNSNCE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cada página escolhe o seu próprio ID de documento (ver comentário
// em cada HTML) para os dados não se misturarem entre páginas.
function getTrackerRef(docId) {
  return db.collection('trackers').doc(docId);
}
