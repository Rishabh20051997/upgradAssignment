import DeviceInfo from 'react-native-device-info'

export const TAB_KEYS = {
    HOME_TAB: 'Home',
    USER_LIST_TAB: 'UserList'
}

export const MAIN_STACK_KEYS = {
    HOME_STACK: 'homeStack',
    USER_LIST_STACK: 'userListStack',
    TAB_BAR_STACK: 'tabBarStack'
}

export const isTablet = () => DeviceInfo.isTablet()