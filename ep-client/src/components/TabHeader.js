import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext' // accesing Context

const TabHeader = ({ isButton,icon,navigateTo,navigation }) => {

    const { signout } = useContext(AuthContext);
    const { headerStyle } = styles

    renderHomeButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="home" size={25} color="white" style={{marginTop:15,marginLeft:10 }} />
            </TouchableOpacity>

        )
    }

    renderSignoutButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                <AntDesign name="logout" size={22} color="white" style={{ marginTop:15,marginRight:10 }} />
            </TouchableOpacity>

        )
    }


    renderAddButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                <AntDesign name={icon} size={25} color="white" style={{ marginTop:15,marginRight:10 }} />
            </TouchableOpacity>

        )
    }


    return (<View style={headerStyle}>
        {renderHomeButton()}
        {isButton===true?renderAddButton():null}
        {renderSignoutButton()}
    </View>)

}




const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#17a2b8',
        marginTop: 25,
        height: 53,

    },

});

export default withNavigation(TabHeader);