// import { userInfoType } from "../config/types-interfaces"

/**
 * @brief   Custom hook to get user info from local storage
 * @param   {void}
 * @return  {Object}    Object with user info
 * @example const { uid, uName, uIsAuth } = useGetUserInfo()
 */
export const useGetUserInfo = () => {
    let id, uid, uName, uEmail, uPhoto, uIsAuth

    if (typeof window !== "undefined") {
        const {
            id: userId,
            uid: userUid,
            uName: userName,
            uEmail: userEmail,
            uPhoto: userPhoto,
            uIsAuth: userIsAuth,
        } = JSON.parse(localStorage.getItem("auth") || "{}")
        id = userId
        uid = userUid
        uName = userName
        uEmail = userEmail
        uPhoto = userPhoto
        uIsAuth = userIsAuth
    }

    // This is a lil bit of a jankey solution but hey it works (maybe lol)
    const setUserDataToLocalStorage = (data) => {
        const prevUserData = JSON.parse(localStorage.getItem("auth") || "{}")
        const newUserData = { ...prevUserData, ...data }
        localStorage.setItem("auth", JSON.stringify(newUserData))
    }

    return {
        id,
        uid,
        uName,
        uEmail,
        uPhoto,
        uIsAuth,
        setUserDataToLocalStorage,
    }
}
