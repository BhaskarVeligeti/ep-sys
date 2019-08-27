import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { withBadge } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabHeader from '../../components/TabHeader'

const { width, height } = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const POScreen = ({ navigation }) => {
    const { containerStyle, imageStyle,contentStyle } = styles

    return (
        <>
            <View style={containerStyle}>
            <TabHeader />

            <View style={contentStyle}>
                <Text h4>Purchase Order Screen Content</Text>
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
const POBadge = withBadge(99, { status: "primary" })(MaterialCommunityIcons)
POScreen.navigationOptions = ({ tintColor, navigation }) => ({
    title: 'Order',
    tabBarColor:'#17a2b8',
    tabBarIcon: ({ tintColor }) => <POBadge name="check-circle-outline" size={25} color={tintColor} />
})


const styles = StyleSheet.create({
    containerStyle: {
        borderColor: 'red',
        borderWidth: 0,
        flex: 1
    },

    contentStyle: {
        borderColor: 'green',
        borderWidth: 0,
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

export default POScreen;