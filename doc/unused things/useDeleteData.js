import { addDoc, deleteDoc, doc, collection } from "firebase/firestore"
import { db } from "../config/firebase-config"

import { useGetUserInfo } from "./useGetUserInfo"
// import {
//     userInfoType,
//     deviceInfoType,
//     databaseCollections,
// } from "../config/types-interfaces"

/**
 * @brief Custom hook to delete data from firestore database by given parameter
 * @param {databaseType} "users" | "devices"
 * @return { deleteData }
 * @example const { deleteData } = useDeleteData()
 */
export const useDeleteData = ({ databaseType }) => {
    // const { uid } = useGetUserInfo()
    // const databaseCollectionRef = collection(db, databaseType)

    // Async function to write data to firestore
    const deleteData = async ({ uid }) => {
        console.time("deleteData")

        const databaseDocRef = doc(db, databaseType, uid)
        await deleteDoc(databaseDocRef)

        console.timeEnd("deleteData")
    }

    return { deleteData }
}
