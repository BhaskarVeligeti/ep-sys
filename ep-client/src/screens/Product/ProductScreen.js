import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, ListItem, Divider, Image } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as ProductContext } from '../../context/ProductContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../../components/Loader';
import TabHeader from '../../components/TabHeader'
import SearchBar from '../../components/SearchBar'



/**navigation prop that is passed down to our screen components. */

const ProductScreen = ({ navigation }) => {
    /* access Provider in the Context from this component
    fetchProduct: action funtion
    */
    const { state: { products, loading }, fetchProduct } = useContext(ProductContext);
    const { containerStyle, subtitleView, subtitleText, nameStyle, priceStyle, productTextView } = styles

    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        return (<TouchableOpacity
            onPress={() => navigation.navigate('RepDetailModal', { item: item })}>
            <View style={productTextView}>
                <Text style={nameStyle}>{item.name}</Text>
                <MaterialCommunityIcons name="currency-inr" size={20} style={priceStyle}>
                <Text >{item.sellingPrice}</Text>
                </MaterialCommunityIcons>
              
            </View>

            <ListItem
                leftIcon={<Image
                    source={{ uri: `data:image/png;base64,${item.image}` }}
                    PlaceholderContent={<ActivityIndicator />}
                    style={{ width: 150, height: 100 }}
                />}
                subtitle={
                    <View style={subtitleView}>
                        <Text style={subtitleText}>{item.description}</Text>
                        <Text style={subtitleText}>rating : {item.rating}</Text>
                        <Text style={subtitleText}>reviews : {item.reviews}</Text>
                    </View>
                }
                
            />
            <Divider />
        </TouchableOpacity>)
    }

    return (
        <>
            <Loader loading={loading} />
            <NavigationEvents onWillFocus={fetchProduct} />
            <View style={containerStyle}>
                <TabHeader isButton={true} icon="pluscircleo" navigateTo='RegModal' />
                <SearchBar
                    term={''}
                    onTermChange={(newTerm) => { }}
                    onTermSubmit={() => { }}
                ></SearchBar>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
        </>
    )

}


const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#6610f2',
        borderWidth: 2,
        flex: 1,
    },

    productTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    nameStyle: {
        // fontSize: 18,
        color: '#17a2b8',
        marginLeft:15
    },
    priceStyle: {
        color: '#dc3545',
        fontSize: 18,
        marginRight:15
    },
  
    contentStyle: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',

    },
  
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    subtitleText: {
        paddingLeft: 10,
        color: 'grey'
    }
});

export default ProductScreen;