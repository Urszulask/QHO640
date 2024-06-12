import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";


const getProductsById = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      const productDoc = await getDoc(productRef);
     
      if (productDoc.exists()) {
        const productData = productDoc.data();
        return productData;
      } else {
        console.log("No such product!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  export default getProductsById;