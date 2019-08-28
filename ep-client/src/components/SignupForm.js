import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, Picker } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { FontAwesome, Feather } from '@expo/vector-icons';
import DynamicTextInput from '../formcontrols/DynamicTextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext' // accesing Context
import { Context as UsersContext } from '../context/UsersContext';
import Loader from './Loader';
import SimpleReactValidator from 'simple-react-validator';

import { HelperText } from 'react-native-paper';


const SignupForm = () => {
    const validator = new SimpleReactValidator({ locale: 'en' });
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

    const { headerStyle, errorStyle, iconStyle, repStyle, pickerStyle } = styles

    renderError = () => (errorMessage && !loading) ? (<Text h4 h4Style={errorStyle}>{errorMessage}</Text>) : null
    buttonDisable = () => (!validator.allValid() && !loading) ? true : false

    renderButton = () => {
        return (
            <Button
                icon={<FontAwesome name="thumbs-o-up" style={iconStyle} />}
                iconRight
                title={' '}
                onPress={() => signup({ firmName, username, password, rep })}
                raised
                disabled={buttonDisable()}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }


    return (
        <>
            <Loader loading={loading} />
            <NavigationEvents onDidFocus={clearErrorMessage} onWillFocus={fetchUsers} />
            <View style={headerStyle}>
                <Feather name="unlock" size={50} color="#6f42c1" />
            </View>
            <Spacer />
            {renderError()}

            <DynamicTextInput
                label='Business Name'
                maxLength={30}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='Firmname'
                value={firmName}
                onChangeText={onFirmnameChange}
                onBlur={validator.showMessageFor('firmname')}
                error={validator.message('firmname', firmName, 'required')}
            />

            <DynamicTextInput
                label='Username'
                maxLength={10}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='mobile no'
                value={username}
                onChangeText={onUsernameChange}
                onBlur={validator.showMessageFor('username')}
                error={validator.message('username', username, 'required|integer|min:3|max:3')}

            />

            <DynamicTextInput
                label='Password'
                maxLength={30}
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='password'
                value={password}
                onChangeText={onPasswordChange}
                onBlur={validator.showMessageFor('password')}
                error={validator.message('password', password, 'required|integer|min:3|max:3')}

            />

                <Picker
                    selectedValue={rep}
                    style={pickerStyle}
                    onValueChange={(value) => onRepChange(value)}
                    onBlur={validator.showMessageFor('representative')}
                    >
                    <Picker.Item label=".... Choose One .... " value="" color="#6c757d" />
                    {users.map((user) => {
                        return (<Picker.Item
                            key={user.id}
                            label={user.firstName}
                            value={user.id}
                            color="#6f42c1"
                        
                        />)
                    })}

                </Picker>
                <HelperText type="error"  >
                    <Text>
                        {validator.message('representative', rep, 'required')}
                    </Text>
                </HelperText>
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
        marginTop: 20, alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 18, color: 'white', top: 8
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
    repStyle: {
        marginLeft: 12,
        fontSize: 17,
        color: '#007bff'
    },
    pickerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 5,
    }

});

export default SignupForm;
