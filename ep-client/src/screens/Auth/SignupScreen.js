import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SignupForm from '../../components/SignupForm';



/**navigation prop that is passed down to our screen components. */

const SignupScreen = ({ navigation }) => {
    const { containerStyle } = styles
    return (
        <View style={containerStyle}>
            <SignupForm/>
        </View>
    )

}



SignupScreen.navigationOptions={
    title:'SignUp',
    tabBarColor:'#20c997',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return<AntDesign name="adduser" size={20}  color={tintColor}/>
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        borderColor: 'blue',
        borderWidth: 0,
        flex: 1,
        // alignItems: "center",
        // justifyContent: 'center',
        // marginBottom: 200
    }

});

export default SignupScreen;