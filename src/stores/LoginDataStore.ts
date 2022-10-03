import { observable, makeObservable, action } from 'mobx'
import { find, isEmpty } from 'lodash'
import { validateRegex } from '../utils/ValidationUtils'
import { USER_LOGIN_CREDENTIAL } from './DummyData'
import { ToastAndroid } from 'react-native'

const DEFAULT_SETTING = {
    userNameErrorMsg: '',
    passwordErrorMsg: '',
    username: '',
    password: ''
}

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
const USERNAME_REGEX = /^[a-zA-Z\s]{2,}$/

export class LoginDataStore {
    @observable userNameErrorMsg: string
    @observable passwordErrorMsg: string

    username: string
    password: string

    constructor() {
        Object.keys(DEFAULT_SETTING).forEach((key) => {
            this[key] = DEFAULT_SETTING[key]
        })

        makeObservable(this)
    }

    updateUserName = (value) => {
        this.username = value
        if (this.userNameErrorMsg) {
            this.updateUserNameErrorMsg('')
        }
    }

    updatePassword = (value) => {
        this.password = value
        if (this.passwordErrorMsg) {
            this.updatePasswordErrorMsg('')
        }
    }

    @action
    updateUserNameErrorMsg = (msg) => {
        this.userNameErrorMsg = msg
    }

    @action
    updatePasswordErrorMsg = (msg) => {
        this.passwordErrorMsg = msg
    }

    validateCredential = () => {
        return find(USER_LOGIN_CREDENTIAL, item => {
            const { userName, password } = item
            return userName === this.username && password === this.password
        })
    }

    validateForm = () => {
        console.log(this.username, this.password)
        const hasValidUserName = validateRegex(this.username.trim(), USERNAME_REGEX)
        const hasValidPassword = validateRegex(this.password.trim(), PASSWORD_REGEX)
        const userInfo = this.validateCredential()
        if (!hasValidUserName) {
            this.updateUserNameErrorMsg('Please Enter Valid User Name')
        }
        if (!hasValidPassword) {
            this.updatePasswordErrorMsg('Please Enter Valid password')
        }

        if (!isEmpty(userInfo)) {
            return { isValid: true, userInfo }
        } else if (!hasValidPassword || !hasValidUserName) {
            return { isValid: false, userInfo: {} }
        } else {
            ToastAndroid.show('Invalid credentials!', ToastAndroid.SHORT)
            return { isValid: false, userInfo: {} }
        }
    }
}
