import React from 'react';
import { StyleSheet, View, ActivityIndicator,Dimensions } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import TabHeader from '../../components/TabHeader'

const {width,height} = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const ProcurementScreen = ({ navigation }) => {
    const { containerStyle, contentStyle,imageStyle } = styles
    return (
        <View style={containerStyle}>
            <TabHeader />
            <View style={contentStyle}>
                <Text h4>ProcurementScreen Content</Text>
                <Image
                    source={require('../../../assets/under-construction.jpg')}
                    style={imageStyle}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        </View>
    )

}

ProcurementScreen.navigationOptions = ({ navigation }) => {
    return {
        tabBarColor:'#6f42c1',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <MaterialIcons name="dashboard" size={22} color={tintColor} />
        },

    };
}



const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#6610f2',
        borderWidth: 0,
        flex: 1,
    },

    contentStyle: {
        // borderColor: 'green',
        // borderWidth: 1,
        flex: 1,
        alignItems:'center',
    
    },
    imageStyle:{
        width:width-10, 
        height: height/4, 
        marginTop:height/4,
        alignSelf:'center' ,
        justifyContent:'center'
    }
});

export default ProcurementScreen;