import firebase from "../config/firebaseConfig";
import UserModel from "../repository/userCollection";

//Function CRUD from Firebase
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const updateUser = async (req, res, next) => {
  try {

    // This id is as key used user
    const id = req.params.id;

    // payload accepted from request
    const data = req.body;

    // 1. Argument 1 is db connected to firebase
    // 2. Argument 2 is NoSQL database decalared in firebase
    // 3. Argument 3 is Unique Key of user (equal as where in sql)
    const user = doc(db, "user-data", id);

    // Command to update the firebase data
    await updateDoc(user, data);

    console.log(user)
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUser = async (req, res, next) => {
    try {
        // This id is as key used user
      const id = req.params.id;

      const user = doc(db, 'user-data', id);

      // Command to get user data from firebase
      const data = await getDoc(user);

    //   Condition check if data of specific user id exist or not
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('user not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
