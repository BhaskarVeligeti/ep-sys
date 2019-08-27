import React from 'react';
import { StyleSheet, View, Dimensions,ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { withBadge } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabHeader from '../../components/TabHeader'

const { width, height } = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const CancelScreen = ({ navigation }) => {
    const { containerStyle,imageStyle,contentStyle } = styles

    return (
        <>

            <View style={containerStyle}>
            <TabHeader />
                <View style={contentStyle}>
                <Text h4>CancelScreen Content</Text>
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
const CancelBadge = withBadge(5)(MaterialCommunityIcons)
CancelScreen.navigationOptions = ({ tintColor,navigation}) => ({
    title:'Cancel',
    tabBarColor:'#ffc107',
    tabBarIcon: ({tintColor}) => <CancelBadge name="cancel" size={25} color={tintColor} />
})


const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#6610f2',
        borderWidth: 2,
        flex: 1,
        // marginTop: 30
    },

    contentStyle: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',

  
    },
    imageStyle: {
        width: width - 10,
        height: height / 4,
        marginTop: height / 4,
        alignSelf: 'center',
        justifyContent: 'center'
    }

});

export default CancelScreen;