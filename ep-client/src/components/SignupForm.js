import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, Picker } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from '../formcontrols/TextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext' // accesing Context
import { Context as UsersContext } from '../context/UsersContext';
import Loader from './Loader';


const SignupForm = ({ headerText }) => {

    const { state: { users }, fetchUsers } = useContext(UsersContext);

    /* access Provider in the Context from this component
     state : data
     signup,clearErrorMessage: action funtions
     */
    const { state: { firmName, username, password, rep, errorMessage, loading },
        signup,
        onFirmnameChange,
        onUsernameChange,
        onPasswordChange,
        onRepChange, clearErrorMessage } = useContext(AuthContext);
 
const { headerStyle, errorStyle, iconStyle,repStyle,pickerStyle } = styles

    renderError = () => (errorMessage && !loading) ? (<Text h4 h4Style={errorStyle}>{errorMessage}</Text>) : null
    renderButton = () => {
        return (
            <Button
                icon={<FontAwesome name="thumbs-o-up" style={iconStyle} />}
                iconRight
                title={' '}
                onPress={() => signup({firmName,username, password,rep  })}
                raised
                disabled={loading}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }


    return (
        <>
            <NavigationEvents onDidFocus={clearErrorMessage} onWillFocus={fetchUsers} />
            <Text h4 h4Style={headerStyle}>{headerText}</Text>
            <Loader loading={loading} />
            {renderError()}
            <Spacer />
            <TextInput
                label='Business Name :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='firmName'
                value={firmName}
                onChangeText={onFirmnameChange} />
            <Spacer />
            <TextInput
                label='Username :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='username'
                value={username}
                onChangeText={onUsernameChange} />
            <Spacer />
            <TextInput
                label='Password :'
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='password'
                value={password}
                onChangeText={onPasswordChange} />
            <Spacer />
            <Text style={repStyle}>{'Representative :'}</Text>

            <Picker
                selectedValue={rep}
                style={pickerStyle}
               
                onValueChange={(value) => onRepChange(value)}>
                    {/* <Picker.Item label="" value=""  style={{color:'#ccc'}}/> */}
                {users.map((user) => {
                    return (<Picker.Item
                        key={user.id}
                        label={user.firstName}
                        value={user.id}
                        color= "#6c757d"
                         />)
                })}

            </Picker>

            <Spacer />
            {renderButton()}
            <Spacer />
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
    },
    repStyle:{
        marginLeft:12,
        fontSize:17,
        color:'#007bff'
    },
    pickerStyle:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:5,
    }

});

export default SignupForm;
