import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { icons } from '../common/Icons'
import { userDataStore } from '../stores'


interface State {
    //
}
interface Props {
    navigation?: any
    //
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    mainContentContainer: {
        margin: 5,
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
    profileImageStyle: {
        height: hp('5%'),
        width: hp('5%'),
        marginHorizontal: wp('3%'),
    },
    contentText : {
        fontSize: hp('3%'),
        color: colors.primaryColor,
        textAlign: 'center',
        marginTop: hp('10%')
    }

})

export class HomeScreen extends Component<Props, State> {
    constructor(props) {
        super(props)
    }

    renderProfilePhoto = () => {
        return <Image
            source={icons.PROFILE_ICON}
            style={styles.profileImageStyle}
        />
    }

    renderGreeeting = () => {
        const message = `Hello ${userDataStore.firstName}!`
        return <Text style={styles.headingText}>{message}</Text>
    }

    renderHeader = () => {
        return <View style={styles.headerContainer}>
            {this.renderProfilePhoto()}
            {this.renderGreeeting()}
        </View>
    }

    renderContent = () => {
        const { accountType } = userDataStore
        return <Text style={styles.contentText}>Welcome {accountType} User</Text>
    }


    render() {
        return <View style={styles.mainView}>
            {this.renderHeader()}
            {this.renderContent()}
        </View>
    }
}