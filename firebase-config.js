// ============================================================
// CONFIGURAÇÃO DO FIREBASE — partilhada por todas as páginas
// Substitui os valores abaixo pelos da tua consola Firebase
// (Project settings > General > Your apps > SDK setup and configuration)
// ============================================================
const firebaseConfig = {
  apiKey: "COLA_AQUI",
  authDomain: "COLA_AQUI",
  projectId: "COLA_AQUI",
  storageBucket: "COLA_AQUI",
  messagingSenderId: "COLA_AQUI",
  appId: "COLA_AQUI"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cada página escolhe o seu próprio ID de documento (ver comentário
// em cada HTML) para os dados não se misturarem entre páginas.
function getTrackerRef(docId) {
  return db.collection('trackers').doc(docId);
}
