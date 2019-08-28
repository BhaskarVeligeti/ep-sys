import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, HelperText,withTheme } from 'react-native-paper';



const DynamicTextInput = ({theme,label, autoFocus,autoCapitalize, autoCorrect, value, onChangeText, placeholder, secureTextEntry, maxLength,error }) => {

  const { inputStyle, labelStyle, containerStyle } = styles;
  // const {colors}=theme

  // console.log('validator :',error)
  return (
    <View>
      <TextInput
        mode='outlined'
        label={label}
        // autoFocus={autoFocus}
        maxLength = {maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText} />
      <HelperText type="error"  >
        <Text>
          {error}
        </Text>
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

// export default withTheme(DynamicTextInput);
export default  DynamicTextInput;