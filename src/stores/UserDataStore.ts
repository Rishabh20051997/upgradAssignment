import { get, map, filter } from 'lodash'
import { action, makeObservable, observable } from 'mobx'
import { USER_LIST } from './DummyData'

const DEFAULT_SETTING = {
  firstName: '',
  accountType: '',
  userList: USER_LIST
}

export class UserDataStore {
  @observable userList
  firstName
  accountType

  constructor() {
    Object.keys(DEFAULT_SETTING).forEach((key) => {
      this[key] = DEFAULT_SETTING[key]
    })
    makeObservable(this)
  }

  setUserInfo(userInfo) {
    this.firstName = get(userInfo, 'firstName')
    this.accountType = get(userInfo, 'accountType')
  }

  @action
  updateUserList = (list) => {
    this.userList = list

  }

  acceptUser = (id) => {
    const newData = map(this.userList, item => {
      if (get(item, 'id') === id) {
        return {
          ...item,
          isVerified: true
        }
      }
      return item
    })
    this.updateUserList(newData)
  }

  deleteUser = (id) => {
    const newData = filter(this.userList, item => get(item, 'id') !== id)
    this.updateUserList(newData)
  }

}
