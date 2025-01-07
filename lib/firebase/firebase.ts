import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "52ae93aa91c7979ce3c0dca48e5b33676bd4324ad56abfe3ef5f420bfbdbf054dc3639847ad3287c40660fc999f0f771348d2b66f2b183ada5971e9ab246b1ad18ce0fb383ec58b3b3d027d1993a17bb3b34060ffc254149d7299b19f0bfb2557d68a31ce886ed3a0667d9678607a6e29a70462ca3d25ecf4040aacc515fe3ae77e0d09a1ffe3b7f832af40b00cc6f43ad94e09ff78cfa0f060c36c54bf41246eae427463daa8e757172f29ecd079bed546ab1fc785ccaaf18661e1c016b038edcc398c964e0a1965afae2f272e7640d62c3d802ce797cdf308f375e8b311f110037e4d4584fdd696f746932cd7c8fe73f7034928d83454de251621273b02964",
  authDomain: "tapup-zwift.firebaseapp.com",
  projectId: "tapup-zwift",
  storageBucket: "tapup-zwift.firebasestorage.app",
  messagingSenderId: "884529098129",
  appId: "1:884529098129:web:c087abc7b8618109dffe30",
  measurementId: "G-SZR6YZR9HD"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firebaseAuth = getAuth(getApp());

export { firebaseDb, firebaseStorage, firebaseAuth };