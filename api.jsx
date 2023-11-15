import { initializeApp } from "firebase/app";
import { 
     getAuth,
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword,
    } from "firebase/auth";

import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyBOgqTK-j_WAnfdLX8vKXQglBW-KzUY7Kg",
    authDomain: "vanlife-2cd8e.firebaseapp.com",
    projectId: "vanlife-2cd8e",
    storageBucket: "vanlife-2cd8e.appspot.com",
    messagingSenderId: "878024815413",
    appId: "1:878024815413:web:123779e63bfd5a307c127c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw{
            message: "Failed to fetch vans",
            statusText: res.statusText, 
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

// export async function getHostVans() {
//     const q = query(vansCollectionRef, where("hostId", "==", "123"))
//     const querySnapshot = await getDocs(q)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return dataArr
// }

export async function loginUser() {
    // const res = await fetch("/api/login",
    //     { method: "post", body: JSON.stringify(creds) }
    // )
    // const data = await res.json()

    // if (!res.ok) {
    //     throw {
    //         message: data.message,
    //         statusText: res.statusText,
    //         status: res.status
    //     }
    // } 

    // return data 

//     const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // The user is signed up
//     const user = userCredential.user;
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
  
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // The user is signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  

}