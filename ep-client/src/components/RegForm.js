import React, { useState, useContext, useEffect } from 'react';
import Loader from './Loader';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from '../formcontrols/TextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext';
import { Context as RegContext } from '../context/RegContext' // accesing Context


const RegForm = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    /* access Provider in the Context from this component
     state : data
     createRep,clearErrorMessage: action funtions
     firstName,surname,username,password,email,
     */
    const { state: { authUser } } = useContext(AuthContext);
    const { state: { errorMessage, loading },
        createRep, clearErrorMessage } = useContext(RegContext);

    const { headerStyle, errorStyle, iconStyle } = styles

    renderError = () => (errorMessage && !loading) ? (<Text h4 h4Style={errorStyle}>{errorMessage}</Text>) : null

    var input = {
        firstName,
        surname,
        username,
        password,
        email,
        role:'Representative',
        createdBy:authUser.username
    }

    // useEffect(() => { clearErrorMessage() }, [])

    renderButton = () => {
        return (
            <Button
                icon={<AntDesign name="adduser" style={iconStyle} />}
                iconRight
                title={'Add '}
                onPress={() => createRep({ input })}
                raised
                disabled={loading}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }


    return (
        <>
 <NavigationEvents onDidFocus={clearErrorMessage}  />
            <Loader loading={loading} />
            {renderError()}
            <TextInput
                label='Firstname :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='firstname'
                value={firstName}
                onChangeText={setFirstName} />
            <Spacer />
            <TextInput
                label='Surname :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='surname'
                value={surname}
                onChangeText={setSurName} />
            <Spacer />
            <TextInput
                label='Username :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='mobile no'
                value={username}
                onChangeText={setUsername} />
            <Spacer />
            <TextInput
                label='Password :'
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='password'
                value={password}
                onChangeText={setPassword} />
            <Spacer />
            <TextInput
                label='Email :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='email'
                value={email}
                onChangeText={setEmail} />
            <Spacer />
            {renderButton()}
            <Spacer />
        </>)
};


const styles = StyleSheet.create({

    errorStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'white',
        backgroundColor: 'red',
    },
    iconStyle: {
        fontSize: 20,
        color: 'white'
    }

});

export default RegForm;
