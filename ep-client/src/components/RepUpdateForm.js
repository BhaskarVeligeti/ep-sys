import React, { useState, useContext } from 'react';
import Loader from './Loader';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { MaterialIcons } from '@expo/vector-icons';
import DynamicTextInput from '../formcontrols/DynamicTextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as RegContext } from '../context/RegContext' // accesing Context
import RadioButton from '../components/RadioButton'
import {statusOptions} from '../fixures/fixures.json'
import SimpleReactValidator from 'simple-react-validator';

const RepUpdateForm = ({ navigation, data }) => {
    const validator = new SimpleReactValidator({ locale: 'en' });
    const [firstName, setFirstName] = useState(data.firstName);
    const [surname, setSurName] = useState(data.surname);
    const [email, setEmail] = useState(data.email);
    const [status, setStatus] = useState(data.status);
   

    /* access Provider in the Context from this component
     state : data
     updateRep,clearErrorMessage: action funtions
     firstName,surname,email,status
     */
    const { state: { errorMessage, loading },
        updateRep, clearErrorMessage } = useContext(RegContext);
    const { errorStyle, iconStyle } = styles

    renderError = () => (errorMessage && !loading) ? (<Text h4 h4Style={errorStyle}>{errorMessage}</Text>) : null
    buttonDisable = () => (!validator.allValid() && !loading) ? true : false

    var input = {
        id: data.id,
        firstName,
        surname,
        email,
        status
    }

    renderButton = () => {
        return (
            <Button
                icon={<MaterialIcons name="save" style={iconStyle} />}
                iconRight
                title={'Update '}
                onPress={() => updateRep({ input })}
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
            <RadioButton
                options={statusOptions}
                intialStatus={status}
                onPress={(status) => setStatus(status)} />
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

export default RepUpdateForm;
