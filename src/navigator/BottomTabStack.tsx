import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabBarComponent } from './BottomTabBarComponent'
import { TAB_KEYS } from '../common/Constant'
import { HomeScreen } from '../screens/HomeScreen'
import { getScreenConfiguration } from '../utils/NavigationUtils'
import { UserListScreen } from '../screens'


const adminBottomTabBarKeys = {
  [TAB_KEYS.HOME_TAB]: getScreenConfiguration({
    screenName: HomeScreen
  }),

  [TAB_KEYS.USER_LIST_TAB]: getScreenConfiguration({
    screenName: UserListScreen
  })
}

const normalBottomTabBarKeys = {
  [TAB_KEYS.HOME_TAB]: getScreenConfiguration({
    screenName: HomeScreen
  })
}

const bottomTabBarStack = (isAdmin = true) => {
  const Tab = createBottomTabNavigator()
  const tabBarKeys = isAdmin ? adminBottomTabBarKeys : normalBottomTabBarKeys

  return (
    <Tab.Navigator
      initialRouteName={TAB_KEYS.HOME_TAB}
      screenOptions={{
        headerShown: false
      }}

      tabBar={props => <BottomTabBarComponent {...props} />}
    >
      {Object.entries({
         ...tabBarKeys
      }).map(([name, component]) => <Tab.Screen name={name} {...component} />)}
    </Tab.Navigator>
  )
}

export {
  bottomTabBarStack
}
