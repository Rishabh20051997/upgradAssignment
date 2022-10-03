import { NavigationDataStore } from './NavigationDataStore'
import { UserDataStore } from './UserDataStore'
import { LoginDataStore } from './LoginDataStore'

export * from './NavigationDataStore'
export * from './UserDataStore'
export * from './LoginDataStore'

const navigationDataStore = new NavigationDataStore()
const userDataStore = new UserDataStore()
const loginDataStore = new LoginDataStore()

export {
  navigationDataStore,
  userDataStore,
  loginDataStore
}

export default {
  navigationDataStore,
  userDataStore,
  loginDataStore
}