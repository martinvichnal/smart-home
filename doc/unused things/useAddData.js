import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

import { useGetUserInfo } from "./useGetUserInfo"
import { Interface } from "readline"
// import {
//     userInfoType,
//     deviceInfoType,
//     databaseCollections,
// } from "../config/types-interfaces"

/**
 * @brief  Custom hook to add data to firestore database
 * @param  {{databaseType}: "users" | "devices}
 * @return { addData }
 * @example const { addData } = useAddData()
 */
export const useAddData = ({ databaseType }) => {
    const databaseCollectionRef = collection(db, databaseType)

    // Async function to write data to firestore
    const addData = async ({ uid, uName, uIsAuth }) => {
        console.time("addData")
        await addDoc(databaseCollectionRef, {
            uid,
            uName,
            uIsAuth,
            createdAt: serverTimestamp(),
        })
        console.timeEnd("addData")
    }
    return { addData }
}
