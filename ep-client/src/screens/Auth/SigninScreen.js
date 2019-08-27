import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SigninForm from '../../components/SigninForm';


/**navigation prop that is passed down to our screen components. */

const SignupScreen = ({ navigation }) => {
    const { containerStyle } = styles
    return (
        <View style={containerStyle}>
            <SigninForm headerText={'Sign In for Engineering Procurement'}/>
        </View>
    )

}



SignupScreen.navigationOptions={
    title:'SignIn',
    tabBarColor:'#17a2b8',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return<AntDesign name="user" size={20}  color={tintColor}/>
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