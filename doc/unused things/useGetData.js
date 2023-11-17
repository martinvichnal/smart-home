// Import backend functions for firebase database
import {
    query,
    collection,
    where,
    onSnapshot,
    getDocs,
} from "firebase/firestore"
import { db } from "../config/firebase-config"

// Import custom and React hooks, interfaces and types
import { useEffect, useState } from "react"
import { useGetUserInfo } from "./useGetUserInfo"
// import { userInfoType, deviceInfoType } from "../config/types-interfaces"

// Response time calculation for the useGetData hook:
// getUserData:     gud = 0,05993652 ms
// getDeviceData:   gdd = 0,75213858 ms
// ∑ useGetData = gud + gdd = 0,05993652 ms + 0,75213858 ms = 0,8120751 ms

/**
 * @brief  Custom hook to get data from firestore database
 * @param
 * @returns  Returns the data, getDeviceData and getUserData functions
 * @note  This hook is used to get data from the database and store it in different states
 */
export const useGetData = () => {
    // Global React state varibales for storing user, device and plain data.
    const [devices, setDevices] = useState([])
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])

    // Getting uid from custom hook to search for user data in database with dataQuery
    const { id, uid, setUserDataToLocalStorage } = useGetUserInfo()

    // Database collection reference with databaseType parameter used for **fetching user data**
    const databaseCollectionRef = collection(db, "users")

    // Sub database collection reference with databaseType and uid parameters used for **fetching device data** from a specific user
    const userName = users[0]?.id // Getting the first user's id from the users state in order to get the device data from the sub collection
    const databaseSubCollectionRef = collection(
        db,
        `users/${userName}/devices` // Works
    )

    // Custom **database query** searches for users by the current user's *uid*
    const dataQuery = query(
        collection(db, "users"),
        where("uid", "==", `${uid}`)
        // orderBy("createdAt")
    )

    /**
     * @brief  Gets user data from database with the given dataQuery (Where the uid is equal to the current user's uid) and sets the user state to the fetched data
     * @note   This function Is callend only on mount or when getUserData is called
     * @returns Sets the User state to the fetched data
     * @returns getUserData read time in ms
     */
    const getUserData = async () => {
        console.time("getUserData") // Measuring fetch time
        getDocs(dataQuery)
            .then((snapshot) => {
                let docs = []
                snapshot.docs.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                // Adding data to data state
                setUsers(docs)
            })
            .catch((err) => {
                console.error(err.maessage)
            })
        console.timeEnd("getUserData") // Measuring fetch time
    }

    /**
     * @brief  Gets data from the database when the data has changed and sets the device state to the fetched data. This getDoc uses a sub collection reference.
     * @note   This function Is callend only on mount or when getDeviceData is called in the useEffect hook
     * @returns Sets the Device state to the fetched data
     * @returns getDeviceData read time in ms
     */
    const getDeviceData = async () => {
        console.time("getDeviceData") // Measuring fetch time
        onSnapshot(databaseSubCollectionRef, (snapshot) => {
            let docs = []
            snapshot.docs.forEach((doc) => {
                // docs.push({ ...doc.data(), id: doc.id })
                docs.push({ data: doc.data(), id: doc.id })
            })
            // Adding data to data state
            setDevices(docs)
        })
        console.timeEnd("getDeviceData") // Measuring fetch time
    }

    // Looking for changes on users state
    // When the users state is finally ready to be read we call the getDeviceData function for getting the device data
    useEffect(() => {
        console.log("useEffect users: ", users)
        setUserDataToLocalStorage({ id: users[0]?.id }) // Adding user database id to local storage
        getDeviceData()
    }, [users])

    useEffect(() => {
        console.log("useEffect devices: ", devices)
    }, [devices])

    // Calling the getUserData fucntion on mount
    useEffect(() => {
        getUserData()
    }, [])

    // Exporting variables and functions
    return { devices, users, data, getDeviceData, getUserData }
}
