import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAe9X6qfKPqYlEdl4s38Bl1sEvo2HatTEM",
  authDomain: "netflix-clone-6b13a.firebaseapp.com",
  projectId: "netflix-clone-6b13a",
  storageBucket: "netflix-clone-6b13a.firebasestorage.app",
  messagingSenderId: "307373534380",
  appId: "1:307373534380:web:a91fcb725aad7b15618309"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db =getFirestore(app);

const signup= async(name, email, password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth, email, password);    
       const user=res.user;
       await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login=async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}
const logout=()=>{
    signOut(auth);
}

export{auth,db,login,signup,logout};