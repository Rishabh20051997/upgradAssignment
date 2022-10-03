import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getScreenConfiguration } from '../utils/NavigationUtils'
import { UserListScreen } from '../screens'

const userListStackScreens = {
  UserListScreen: getScreenConfiguration({
    screenName: UserListScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const userListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...userListStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
  userListStack
}
