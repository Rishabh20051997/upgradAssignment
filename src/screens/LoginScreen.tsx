import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { get } from 'lodash'

import { colors } from '../common/Colors'
import { USER_TYPE } from '../common/Constant'
import { TextInputWrapper } from '../component'
import { STACK_NAMES } from '../navigator'
import { loginDataStore, navigationDataStore, userDataStore } from '../stores'
import { setUserInfo, setUserSignedIn } from '../utils/AuthUtils'

type State = {
  //
}
type Props = {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: hp('10%'),
    alignItems: 'center'
  },
  formContainer: {
    marginTop: hp('10%'),
  },
  headingText: {
    fontSize: hp('5%'),
    textAlign: 'center',
    color: colors.primaryColor
  },
  loginButton: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
    backgroundColor: colors.primaryColor
  },
  loginButtonText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.textPrimary
  },
  textBoxContainer: {
    marginBottom: hp('4%'),
  }
})

@observer
export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  onLoginPressed = () => {
    const { isValid, userInfo } = loginDataStore.validateForm()
    if (isValid) {
      const isAdmin = get(userInfo, 'accountType') === USER_TYPE.ADMIN
      userDataStore.setUserInfo(userInfo)
      navigationDataStore.setCurrentStackName(isAdmin ? STACK_NAMES.ADMIN_TAB_STACK : STACK_NAMES.NORMAL_TAB_STACK)
      setUserSignedIn()
      setUserInfo(userInfo)
    }


  }

  renderForm = () => {
    return <View style={styles.formContainer}>
      <TextInputWrapper
        placeholder={'Please Enter User Name'}
        onValueChange={loginDataStore.updateUserName}
        mainContainerStyle={styles.textBoxContainer}
        errorMessage={loginDataStore.userNameErrorMsg}

      />
      <TextInputWrapper
        placeholder={'Password'}
        onValueChange={loginDataStore.updatePassword}
        mainContainerStyle={styles.textBoxContainer}
        errorMessage={loginDataStore.passwordErrorMsg}
      />
    </View>
  }

  render() {
    return <View style={styles.mainView}>
      <Text style={styles.headingText}>Sign In</Text>
      {this.renderForm()}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={this.onLoginPressed}
      >
        <Text style={styles.loginButtonText}>{'Login'}</Text>
      </TouchableOpacity>
    </View>
  }
}