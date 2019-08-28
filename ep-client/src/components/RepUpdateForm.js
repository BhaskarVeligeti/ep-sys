import React, { useState, useContext } from 'react';
import Loader from './Loader';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from './Spacer'
import { MaterialIcons } from '@expo/vector-icons';
import { DynamicTextInput } from '../formcontrols/DynamicTextInput'
import { NavigationEvents } from 'react-navigation'
import { Context as RegContext } from '../context/RegContext' // accesing Context
import RadioButton from '../components/RadioButton'
import {statusOptions} from '../fixures/fixures.json'


const RepUpdateForm = ({ navigation, data }) => {

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
                disabled={loading}
                buttonStyle={{ borderRadius: 5 }} />
        )
    }

    return (
        <>
            <NavigationEvents onDidFocus={clearErrorMessage} />
            <Loader loading={loading} />
            {renderError()}
            <DynamicTextInput
                label='Firstname :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='firstname'
                value={firstName}
                onChangeText={setFirstName} />
            <Spacer />
            <DynamicTextInput
                label='Surname :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={true}
                placeholder='surname'
                value={surname}
                onChangeText={setSurName} />
            <Spacer />
            <DynamicTextInput
                label='Email :'
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='email'
                value={email}
                onChangeText={setEmail} />
            <Spacer />
            <RadioButton options={statusOptions} intialStatus={status} onPress={(status)=>setStatus(status)} />
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
