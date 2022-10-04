import DeviceInfo from 'react-native-device-info'

export const TAB_KEYS = {
    HOME_TAB: 'Home',
    USER_LIST_TAB: 'UserList'
}

export const TAB_STACK_KEYS = {
    HOME: 'homeStack',
    USER_LIST: 'userListStack',
}

export const isTablet = () => DeviceInfo.isTablet()

export enum USER_TYPE {
 ADMIN = 'admin',
 NORMAL = 'normal'
}