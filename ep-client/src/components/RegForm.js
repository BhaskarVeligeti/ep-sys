import React, { useState, useContext } from 'react';
import Loader from './Loader';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { AntDesign } from '@expo/vector-icons';
import DynamicTextInput from '../formcontrols/DynamicTextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext';
import { Context as RegContext } from '../context/RegContext' // accesing Context
import SimpleReactValidator from 'simple-react-validator';


const RegForm = ({ navigation }) => {
    const validator = new SimpleReactValidator({ locale: 'en' });

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
    buttonDisable = () => (!validator.allValid() && !loading) ? true : false

    var input = {
        firstName,
        surname,
        username,
        password,
        email,
        role: 'Representative',
        createdBy: authUser.username
    }

    renderButton = () => {
        return (
            <Button
                icon={<AntDesign name="adduser" style={iconStyle} />}
                iconRight
                title={'Add '}
                onPress={() => createRep({ input })}
                raised
                disabled={buttonDisable()}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }


    return (
        <>
            <Loader loading={loading} />
            <NavigationEvents onDidFocus={clearErrorMessage} />
            {renderError()}
            <DynamicTextInput
                label='Firstname'
                maxLength={30}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='firstName'
                value={firstName}
                onChangeText={setFirstName}
                onBlur={validator.showMessageFor('firstName')}
                error={validator.message('firstName', firstName, 'required|max:30')}
            />
            <DynamicTextInput
                label='Surname'
                maxLength={30}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='surname'
                value={surname}
                onChangeText={setSurName}
                onBlur={validator.showMessageFor('surname')}
                error={validator.message('surname', surname, 'required|max:30')}

            />
            <DynamicTextInput
                label='Username'
                maxLength={10}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='mobile no'
                value={username}
                onChangeText={setUsername}
                onBlur={validator.showMessageFor('username')}
                error={validator.message('username', username, 'required|integer|min:3|max:3')}
            />
            <DynamicTextInput
                label='Password'
                maxLength={3}
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='password'
                value={password}
                onChangeText={setPassword}
                onBlur={validator.showMessageFor('password')}
                error={validator.message('password', password, 'required|integer|min:3|max:3')}
            />

            <DynamicTextInput
                label='Email'
                maxLength={30}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='email'
                value={email}
                onChangeText={setEmail}
                onBlur={validator.showMessageFor('email')}
                error={validator.message('email', email, 'required|email')}
            />

            <Spacer />
            {renderButton()}
        </>
        )
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
