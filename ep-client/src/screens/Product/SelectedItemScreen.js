import React from 'react';
import { ScrollView, StyleSheet, View,Dimensions,TouchableOpacity,FlatList } from 'react-native';
import { Text,Image } from 'react-native-elements';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

const SelectedItemScreen = ({ navigation }) => {

    const products = navigation.getParam('data');  // array of obejcts  [{},{},{},{}]

    //    console.log('products :', products);

    const { nameStyle, priceStyle, productTextView,  } = styles

    renderItem = ({ item }) => {
        //   console.log('renderItem :', item);
        return (
            <>
                <View style={productTextView}>
                    <Text style={nameStyle}>{item.name}</Text>
                    <MaterialCommunityIcons name="currency-inr" size={20} style={priceStyle}>
                        <Text >{item.sellingPrice}</Text>
                    </MaterialCommunityIcons>

                </View>
            </>
        )
    }

    return (
        <>
            <ScrollView>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </ScrollView>
        </>
    )

}

SelectedItemScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'search',
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('Purchase')}>
            <AntDesign name="back" size={25} color="white" style={{ marginLeft: 25 }} />
        </TouchableOpacity>
        ),

    };
}


const styles = StyleSheet.create({
    containerStyle: {
        // borderColor: '#6610f2',
        // borderWidth: 1,
        flex: 1,
    },

    productTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10

    },

    imageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: width

    },
    nameStyle: {
        fontSize: 16,
        color: '#007bff',
        marginLeft: 15
    },
    priceStyle: {
        color: '#dc3545',
        fontSize: 18,
        marginRight: 15
    },
    dividerStyle: {
        backgroundColor: '#6f42c1'
    },
});

export default SelectedItemScreen;