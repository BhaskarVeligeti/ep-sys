import React from 'react';
import { StyleSheet, View, Dimensions,ActivityIndicator } from 'react-native';
import { Text,Image } from 'react-native-elements';
import { withBadge } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import TabHeader from '../../components/TabHeader'

const { width, height } = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const IPScreen = ({ navigation }) => {
    const { containerStyle,imageStyle,contentStyle } = styles

    return (
        <>

            <View style={containerStyle}>
            <TabHeader />
            <View style={contentStyle}>
                <Text h4>Initial Payment Screen Content</Text>
                <Image
                    source={require('../../../assets/under-construction.jpg')}
                    style={imageStyle}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            </View>
        </>
    )

}

// add badge to icon in  react-native
const IPBadge = withBadge(10,{ status: "primary"})(FontAwesome)
IPScreen.navigationOptions = ({tintColor,navigation }) => ({
    title:'Init Pay',
    tabBarColor:'#007bff',
    tabBarIcon: ({tintColor}) => <IPBadge name="hourglass-start" size={25} color={tintColor} />
})


const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#6610f2',
        borderWidth: 0,
        flex: 1,
        // marginTop: 30
    },

    contentStyle: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',

    },
    imageStyle:{
        width:width-10, 
        height: height/4, 
        marginTop:height/4,
        alignSelf:'center' ,
        justifyContent:'center'
    }

});

export default IPScreen;