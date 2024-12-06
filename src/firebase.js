import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC51PwNB0OM7cWRZ9xbmFWWJhB6V8oIJBY",
  authDomain: "netflix-clone-49383.firebaseapp.com",
  projectId: "netflix-clone-49383",
  storageBucket: "netflix-clone-49383.firebasestorage.app",
  messagingSenderId: "278804457467",
  appId: "1:278804457467:web:ff0840f82b4dda76c50d5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export { auth, db, login, signup, logout};