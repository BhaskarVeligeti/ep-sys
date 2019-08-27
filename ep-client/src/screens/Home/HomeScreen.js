import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button,Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import { Context as AuthContext } from '../../context/AuthContext' // accesing Context


import AdminCards from '../../components/AdminCards'
import RepCards from '../../components/RepCards'
import CustomerCards from '../../components/CustomerCards'


/**navigation prop that is passed down to our screen components. */

const HomeScreen = ({ navigation }) => {

    const { state: { authUser, loading }, signout } = useContext(AuthContext);
    const { headerText, authTextStyle } = styles


    dispatchSignout = () => {
        return signout();
    }

    headerTextDisplay = () => {
        return (
            <View style={headerText}>
                <Text style={authTextStyle}>{authUser.username} - {authUser.role}</Text>
            </View>
        )
    }

    renderCards = () => {
        switch (authUser.role) {
            case 'Administrator':
                return <AdminCards />
            case 'Representative':
                return <RepCards />
            case 'Customer':
                return <CustomerCards />
            default:
                return null
        }

    }
    return (
        <>
            <Loader loading={loading} />
            {renderCards()}

        </>


    )

}
HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: () => headerTextDisplay(),
        headerLeft: (
            <Image
                source={require('../../../assets/Loader.gif')}
                style={{ width: 40, height: 40 }}
            />
        ),
        headerRight: (
            <Button
                icon={<AntDesign name="logout" size={22} color="white" />}
                type="clear"
                onPress={() => dispatchSignout()}
            />
        ),
    };
}


const styles = StyleSheet.create({
    containerStyle: {
        borderColor: 'green',
        borderWidth: 2,
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        // marginBottom: 200
    }, dividerStyle: {
        backgroundColor: 'blue',
        paddingBottom: 25
    }, textStyle: {
        color: 'blue'
    },
    headerText: {
        flex: 1,
        alignItems:'center',

    },
    authTextStyle: {
        color: 'white',
        fontSize: 17,
    },
    imageStyle: {
        marginTop: 250,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 250,
        height: 150,
      }
});

export default HomeScreen;