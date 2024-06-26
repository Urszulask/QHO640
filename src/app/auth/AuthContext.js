import { useContext, useEffect, createContext, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        signOut(auth);
    };

    const refreshBalance = async (userId) => {
        const usersQuery = query(collection(db, "users"), where("userId", "==", userId));
        const usersSnapshot = await getDocs(usersQuery);
        if (!usersSnapshot.empty) {
            const userDoc = usersSnapshot.docs[0];
            const userData = userDoc.data();
            setBalance(userData.balance);
        }
    };

    const fetchUserRole = async (userId) => {
        const usersQuery = query(collection(db, "users"), where("userId", "==", userId));
        const usersSnapshot = await getDocs(usersQuery);
        if (!usersSnapshot.empty) {
            const userDoc = usersSnapshot.docs[0];
            const userData = userDoc.data();
            console.log('User data from context:', userData);
            console.log('User is Adin context:',userData.isAdmin);
            setIsAdmin(userData.isAdmin);
        } else {
            console.log("No such user document!");
            setIsAdmin(false);
        }
    };
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            console.log("Current user is:",currentUser);
            if (currentUser) {
                await refreshBalance(currentUser.uid);
                await fetchUserRole(currentUser.uid);
            } else {
                setBalance(0);
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, balance, isAdmin, googleSignIn, createUser, signIn, logOut, refreshBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
