import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TextInputProps } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { colors } from '../common/Colors'


interface State {
  value?: string
}

interface Props extends TextInputProps {
  errorMessage?: string
  onValueChange?: (text: string) => void
  mainContainerStyle?: any
}

const styles = StyleSheet.create({
  textBoxContainer: {
    borderBottomWidth: 0.2 ,
    width: wp('90%')
  },
  errorMsg: {
    fontSize: hp('1.5%'),
    color: colors.errorColor
  }
})

export class TextInputWrapper extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  onTextChange = (value) => {
    const {  onValueChange } = this.props
    this.setState({
        value
    })

    if (onValueChange) {
        onValueChange(value)
    }

  }

  render() {
    const { errorMessage = '', mainContainerStyle = {},  ...textInputProps } = this.props
    return <View style={mainContainerStyle}>
        <View style={styles.textBoxContainer}>
     <TextInput
     onChangeText={this.onTextChange}
     {...textInputProps}
        />
    </View>
    {errorMessage ? <Text style={styles.errorMsg}>{errorMessage}</Text> : null}
    </View>
  }
}