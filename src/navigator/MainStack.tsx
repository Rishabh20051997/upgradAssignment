import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { bottomTabBarStack } from './BottomTabStack'
import { MAIN_STACK_KEYS } from '../common/Constant'
import { homeStack } from './HomeStack'
import { userListStack } from './UserListStack'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const mainStack = () => {
  return (
    <Stack.Navigator initialRouteName={MAIN_STACK_KEYS.TAB_BAR_STACK}
      screenOptions={{
        headerShown: false
      }}
    // defaultScreenOptions={{
    // }}
    >
      <Stack.Screen name= {MAIN_STACK_KEYS.TAB_BAR_STACK} component={bottomTabBarStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.HOME_STACK} component={homeStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.USER_LIST_STACK} component={userListStack} />
    </Stack.Navigator>
  )
}

export {
  mainStack,
  MAIN_STACK_KEYS
}