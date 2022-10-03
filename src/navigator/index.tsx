import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationDataStore, userDataStore } from '../stores'
import { setInititalStackName } from '../services/NavigationServiceV1'
import { getUserInfo, isUserSignedIn } from '../utils/AuthUtils'
import { mainStack } from './MainStack'
import { loginStack } from './LoginStack'

export const STACK_NAMES = {
  HOME_STACK: 'HOME_STACK',
  LOGIN_STACK: 'LOGIN_STACK'
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()


const rootStack = () => {
  const { currentStackName } = navigationDataStore
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        headerMode: 'screen'
      }} >
        {currentStackName === STACK_NAMES.HOME_STACK && (<Stack.Screen name={'HomeStack'} component={mainStack} />)}
        {currentStackName === STACK_NAMES.LOGIN_STACK && (<Stack.Screen name={'LoginStack'} component={loginStack} />)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const routerGenerator = (cb) => {
  isUserSignedIn().then(async (isLoggedIn) => {
    const initialRoute = isLoggedIn ? STACK_NAMES.HOME_STACK : STACK_NAMES.LOGIN_STACK
    if (isLoggedIn) {
      const dataInfo = await getUserInfo()
      userDataStore.setUserInfo(dataInfo)
    }
    setInititalStackName(initialRoute)
    cb(rootStack)
  })
}

export const setRouterHandler = async () => {
  setTimeout(() => {
    routerGenerator(router => navigationDataStore.updateState(router))
  }, 100)
}
