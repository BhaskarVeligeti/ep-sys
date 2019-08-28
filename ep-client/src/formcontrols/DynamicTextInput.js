import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';



const DynamicTextInput = ({ label, autoCapitalize, autoCorrect, value, onChangeText, placeholder, secureTextEntry,error }) => {

  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View>
      <TextInput
        mode='outlined'
        label={label}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText} />
      <HelperText
        type="error"
        visible={!value.includes('@')}
      >
     {error}
        </HelperText>

    </View>
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


export { DynamicTextInput }