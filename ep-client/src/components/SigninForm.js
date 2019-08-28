import React, { useState,useContext } from 'react';
import Loader from './Loader';
import { View,StyleSheet,Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { AntDesign } from '@expo/vector-icons';
import { DynamicTextInput } from '../formcontrols/DynamicTextInput'
import {NavigationEvents} from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext' // accesing Context


const SigninForm = ({headerText}) => {
   
    /* access Provider in the Context from this component
     state : data
     signup,clearErrorMessage: action funtions
     */
    const { state: { username, password, errorMessage,loading },
     signin,onUsernameChange,onPasswordChange, clearErrorMessage,resetForm } = useContext(AuthContext);

// const [loader,setLoading]=useState(loading);

    const { headerStyle, errorStyle, iconStyle } = styles

    renderError = () =>  (errorMessage && !loading) ? (<Text h4 h4Style={errorStyle}>{errorMessage}</Text>) : null  

    renderButton = () => {
        return (
            <Button
                icon={<AntDesign name="login" style={iconStyle} />}
                iconRight
                title={' '}
                onPress={()=>signin({ username, password })}
                raised
                disabled={loading}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }


    return (
        <>
            <NavigationEvents onDidFocus={clearErrorMessage}  />
            <Text h4 h4Style={headerStyle}>{headerText}</Text>
            <Loader loading={loading} />
            { renderError() }
   
            <DynamicTextInput
                label='Username'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='mobile no'
                value={username}
                onChangeText={onUsernameChange}
                error='Invalid username' />
       
            <DynamicTextInput
                label='Password'
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='password'
                value={password}
                onChangeText={onPasswordChange} 
                error='Invalid password'
                />
            <Spacer />
            {renderButton()}
         
        </>)
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        height: Dimensions.get('window').height,
        padding: 15,
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: 50
      },
    spacerStyle: {
        margin: 15,
    },
    headerStyle: {
        alignSelf: 'center',
        marginBottom: 25,
        fontSize: 20,
        marginTop: 15
    },
    errorStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'white',
        backgroundColor: 'red',
    },
    iconStyle: {
        fontSize: 24,
        color: 'white'
    }

});

export default SigninForm;
