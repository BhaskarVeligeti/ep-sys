import React, { useState, useContext } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, ListItem, Divider, Image } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as ProductContext } from '../../context/ProductContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../../components/Loader';
import TabHeader from '../../components/TabHeader'
import SearchBar from '../../components/SearchBar'


const { width, height } = Dimensions.get('window');
/**navigation prop that is passed down to our screen components. */

const PurchaseScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false)
    /* access Provider in the Context from this component
    fetchProduct: action funtion
    */
    const { state: { products, loading }, fetchProduct } = useContext(ProductContext);
    const { containerStyle, subtitleView, subtitleText, nameStyle, priceStyle, productTextView, ratingView, imageView, descriptionText, dividerStyle } = styles

    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        return (<TouchableOpacity
            onPress={() => alert(`selected :${item.name}`)}>
            <View style={productTextView}>
                <Text style={nameStyle}>{item.name}</Text>
                <MaterialCommunityIcons name="currency-inr" size={20} style={priceStyle}>
                    <Text >{item.sellingPrice}</Text>
                </MaterialCommunityIcons>

            </View>
            <View style={imageView}>
                <ListItem
                    leftIcon={<Image
                        source={{ uri: `data:image/png;base64,${item.image}` }}
                        PlaceholderContent={<ActivityIndicator />}
                        style={{ width: 150, height: 100 }}
                    />}
                >

                </ListItem>
                <Text style={descriptionText}>{item.description}</Text>
            </View>
            <View style={ratingView}>
                <Text style={subtitleText}>rating : {item.rating}</Text>
                <Text style={subtitleText}>reviews : {item.reviews}</Text>
            </View>
            <Divider style={dividerStyle} />
        </TouchableOpacity>)
    }


    _onRefresh = () => {
        setRefreshing(true);
        fetchProduct();
        setTimeout(() => {
            setRefreshing(false);
          }, 3000);
       
    }


    return (
        <>
            <Loader loading={loading} />
            <NavigationEvents onWillFocus={fetchProduct} />
            <View style={containerStyle}>
                <TabHeader isCartButton={true} icon="shoppingcart" value={100} navigateTo='SelectedItemScreen' />
                <SearchBar
                    term={''}
                    onTermChange={(newTerm) => { }}
                    onTermSubmit={() => { }}
                ></SearchBar>
                <>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing} //Whether the view should be indicating an active refresh.
                                onRefresh={() => _onRefresh()} // Called when the view starts refreshing.
                                colors={["#6f42c1", "#007bff", "#dc3545","#28a745","#007bff","#17a2b8"]}
                            />
                        }
                    >
                        <FlatList
                            data={products}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </ScrollView>
                </>
            </View>
        </>
    )

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
        fontSize: 18,
        color: '#17a2b8',
        marginLeft: 15
    },
    priceStyle: {
        color: '#dc3545',
        fontSize: 18,
        marginRight: 15
    },

    descriptionText: {
        marginTop: 10,
        marginLeft: 0,
        color: 'grey',
        marginRight: 100,
        paddingRight: 100

    },
    contentStyle: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',

    },

    ratingView: {
        flexDirection: 'row',
        marginTop: -5,
        marginBottom: 5
    },
    subtitleView: {
        flexDirection: 'column',
        // paddingLeft: 10,
        // paddingTop: 5
    },
    subtitleText: {
        paddingLeft: 10,
        color: 'grey'
    },
    dividerStyle: {
        backgroundColor: '#6f42c1'
    },
});

export default PurchaseScreen;