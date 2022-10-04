import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { get } from 'lodash'

import { navigationDataStore, userDataStore } from '../stores'
import { setInititalStackName } from '../services/NavigationServiceV1'
import { getUserInfo, isUserSignedIn } from '../utils/AuthUtils'
import { loginStack } from './LoginStack'
import { bottomTabBarStack } from './BottomTabStack'
import { USER_TYPE } from '../common/Constant'

export const STACK_NAMES = {
  ADMIN_TAB_STACK: 'ADMIN_TAB_STACK',
  NORMAL_TAB_STACK: 'NORMAL_TAB_STACK',
  LOGIN_STACK: 'LOGIN_STACK',
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
        {currentStackName === STACK_NAMES.LOGIN_STACK && (<Stack.Screen name={'LoginStack'} component={loginStack} />)}
        {currentStackName === STACK_NAMES.ADMIN_TAB_STACK && (<Stack.Screen name={'AdminStack'} component={bottomTabBarStack} />)}
        {currentStackName === STACK_NAMES.NORMAL_TAB_STACK && (<Stack.Screen name={'NormalUserStack'} component={() => bottomTabBarStack(false)} />)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const routerGenerator = (cb) => {
  isUserSignedIn().then(async (isLoggedIn) => {
    let initialRoute = isLoggedIn ? STACK_NAMES.ADMIN_TAB_STACK : STACK_NAMES.LOGIN_STACK
    if (isLoggedIn) {
      const dataInfo = await getUserInfo()
      userDataStore.setUserInfo(dataInfo)
      const isAdmin = get(dataInfo, 'accountType') === USER_TYPE.ADMIN
      initialRoute = isAdmin ? STACK_NAMES.ADMIN_TAB_STACK : STACK_NAMES.NORMAL_TAB_STACK
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
