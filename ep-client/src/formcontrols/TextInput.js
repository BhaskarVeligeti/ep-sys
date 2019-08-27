import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';




const TextInput = ({ label, autoCapitalize, autoCorrect, value, onChangeText, placeholder, secureTextEntry }) => {

  const { inputStyle, labelStyle, containerStyle } = styles;
  return (

    <Input
      label={label}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText} />
  )


}

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 20,
    flex: 1,
    color: '#007bff',
  },
  containerStyle: {
    height: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})


export { TextInput }