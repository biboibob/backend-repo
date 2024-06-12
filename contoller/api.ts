import "dotenv/config";
import firebase from "../config/firebaseConfig";
import { User as UserModel, Login } from "../repository/userCollection";
var jwt = require("jsonwebtoken");
import { onSetValueRedis } from "./redisController";

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
  query,
  where,
  or,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const updateUser = async (req: any, res: any, next: any) => {
  try {
    // payload accepted from request
    const data = req.body;

    // 1. Argument 1 is db connected to firebase
    // 2. Argument 2 is NoSQL database decalared in firebase
    // 3. Argument 3 is Unique Key of user (equal as where in sql)
    const userDoc = await doc(db, "user-data", data.id);
    const user = await getDoc(userDoc);

    if (user.exists()) {
      const { id, ...excludeId } = req.body;
      // Command to update the firebase data
      await updateDoc(userDoc, excludeId);
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const getUser = async (req: any, res: any, next: any) => {
  try {
    // This id is as key used user
    const id = req.query.id;

    const user = doc(db, "user-data", id);

    // Command to get user data from firebase
    const data = await getDoc(user);
    //   Condition check if data of specific user id exist or not
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send("user not found");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    // This id is as key used user
    const body = req.body;
    let objUser: object = {};

    const queries = query(
      collection(db, "user-data"),
      where("email", "==", body.email),
      where("password", "==", body.password)
    );

    // console.log(data)

    // Command to get user data from firebase
    const data = await getDocs(queries);

    if (data.empty) {
      res.status(400).send("No User Found");
    } else {
      data.forEach((val) => {
        objUser = new Login(
          val.id,
          val.data().email,
          val.data().name,
          val.data().phone
        );
      });

      //Generate Token Here for authentication
      var token = jwt.sign({ ...objUser }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "1h",
      });

      onSetValueRedis("token", token);

      res.status(200).send({
        ...objUser,
        token: token,
      });
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const getAllUser = async (req: any, res: any, next: any) => {
  try {
    // Command to get user data from firebase
    const data = await getDocs(collection(db, "user-data"));
    const userArr: any[] = [];

    if (data.empty) {
      res.status(400).send("No User Found");
    } else {
      data.forEach((val) => {
        const user = new UserModel(
          val.data().name,
          val.data().email,
          val.data().password,
          val.data().phone
        );

        userArr.push(user);
      });

      res.status(200).send(userArr);
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const addNewUser = async (req: any, res: any, next: any) => {
  try {
    // Command to get user data from firebase
    // const { name, email, password, phone } = req.body;

    // const newUser = new UserModel(name, email, password, phone);
    // console.log(newUser);
    const body = req.body;

    const queries = query(
      collection(db, "user-data"),
      or(
        where("email", "==", body.email),
        where("name", "in", [`${body.name}`])
      )
    );

    const dataUserExist = await getDocs(queries);

    // If user not found, register can use current name and email
    if (dataUserExist.empty) {
      await addDoc(collection(db, "user-data"), body);
      res.status(200).send(`New user successfully added - ${body?.name || ""}`);
    } else {
      res.status(400).send("Name or Email already used");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
