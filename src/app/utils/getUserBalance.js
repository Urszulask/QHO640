import { doc, getDocs,query, where,collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const getUserBalance = async (uid) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs[0].data();
    return userData.balance;
    
  } catch (error) {
    console.error("Error fetching user balance: ", error);
    throw error;
  }
};

export default getUserBalance;
