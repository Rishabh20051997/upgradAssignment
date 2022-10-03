import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { icons } from '../common/Icons'
import { STACK_NAMES } from '../navigator'
import { navigationDataStore, userDataStore } from '../stores'
import { removeUserSignInStatus } from '../utils/AuthUtils'


interface State {
  //
}
interface Props {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    padding: hp('1%'),
    backgroundColor: colors.primaryColor
  },
  headingText: {
    fontSize: hp('3%'),
    color: colors.textPrimary
  },
  itemSepratorView: {
    margin: 10
  },
  mainContentContainer: {
    margin: 10,
  },
  cardItemConatiner: {
    borderWidth: 0.1,
    justifyContent: 'center',
    borderColor: colors.lightGray,
    marginHorizontal: '2.5%',
    paddingTop: 10,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  upperCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  headingtext: {
    fontSize: hp('2.2%'),
    color: colors.primaryColor
  },
  secondarytext: {
    fontSize: hp('1.8%'),
    color: colors.black
  },
  tertiarytext: {
    fontSize: hp('1.5%'),
    color: colors.textSecondary
  },
  logoutButton: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
    backgroundColor: colors.primaryColor
  },
  logoutButtonText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.textPrimary
  },
  tickIcon: {
    width: hp('4%'),
    height: hp('4%'),
  },
  acceptButton: {
    backgroundColor: colors.green,
    width: '50%'
  },
  deleteButton: {
    backgroundColor: colors.errorColor,
    width: '50%'
  },
  buttonText: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.textPrimary

  }
})

@observer
export class UserListScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  renderHeader = () => {
    return <View style={styles.headerContainer}>
      <Text style={styles.headingText}>{'User List'}</Text>
    </View>
  }

  renderActionButton = (id) => {
    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
      <TouchableOpacity 
      onPress={() => userDataStore.acceptUser(id)}
      style={styles.acceptButton}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => userDataStore.deleteUser(id)}
      style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  }

  renderCardItem = ({ item }) => {
    const { firstName, isVerified, id } = item
    return <View style={[styles.cardItemConatiner, isVerified ? { paddingBottom: 10 } : {}]} >
      <View style={styles.upperCardHeader}>
        <Text style={styles.headingtext} ellipsizeMode='tail' numberOfLines={1}>{firstName}</Text>
        {isVerified ? <Image
          source={icons.TICK_ICON}
          style={styles.tickIcon}
        /> : null}
      </View>
      {isVerified ? null : this.renderActionButton(id)}
    </View>
  }

  renderUserList = () => {
    const { userList } = userDataStore
    return <FlatList
      data={userList}
      renderItem={this.renderCardItem}
      keyExtractor={(item, index) => item + index}
      ItemSeparatorComponent={() => <View style={styles.itemSepratorView} />}
      style={styles.mainContentContainer}
    />
  }

  onLogoutPressed = () => {
    removeUserSignInStatus()
    navigationDataStore.setCurrentStackName(STACK_NAMES.LOGIN_STACK)
  }

  renderLogoutButton = () => {
    return <TouchableOpacity
      style={styles.logoutButton}
      onPress={this.onLogoutPressed}
    >
      <Text style={styles.logoutButtonText}>{'Logout'}</Text>
    </TouchableOpacity>
  }



  render() {
    return <View style={styles.mainView}>
      {this.renderHeader()}
      {this.renderUserList()}
      {this.renderLogoutButton()}
    </View>
  }
}