import AsyncStorage from '@react-native-async-storage/async-storage'

export const SIGN_IN_KEY = 'SIGN_IN_KEY'
const USER_INFO = 'USER_INFO'


export const isUserSignedIn = async () => {
    const value = await AsyncStorage.getItem(SIGN_IN_KEY)
    return value
}

export const setUserSignedIn = async () => {
    AsyncStorage.setItem(SIGN_IN_KEY, 'true')
}

export const removeUserSignInStatus = () => {
    AsyncStorage.removeItem(SIGN_IN_KEY)
}

export const setUserInfo = (info) => {
    AsyncStorage.setItem(USER_INFO, JSON.stringify(info))
}

export const getUserInfo = async () => {
    const value = await AsyncStorage.getItem(USER_INFO)
    return JSON.parse(value)
}