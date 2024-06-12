import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const searchProducts = async (searchTerm, filterType) => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    
    let results = [];
    snapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        const fieldValue = product[filterType].toLowerCase();
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        if (fieldValue.includes(lowercasedSearchTerm)) {
            results.push(product);
        }
    });

    return results;
};
