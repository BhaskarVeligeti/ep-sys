import React from 'react';
import { StyleSheet, View, Dimensions,ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { withBadge } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabHeader from '../../components/TabHeader'

const { width, height } = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const BalanceScreen = ({ navigation }) => {
    const { containerStyle,imageStyle,contentStyle } = styles

    return (
        <>

            <View style={containerStyle}>
            <TabHeader />
                <View style={contentStyle}>
                <Text h4>BalanceScreen Content</Text>
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
const BalanceBadge = withBadge(15)(MaterialCommunityIcons)
BalanceScreen.navigationOptions = ({ tintColor,navigation}) => ({
    title:'Balance',
    tabBarColor:'#dc3545',
    tabBarIcon: ({tintColor}) => <BalanceBadge name="progress-clock" size={25} color={tintColor} />
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

export default BalanceScreen;