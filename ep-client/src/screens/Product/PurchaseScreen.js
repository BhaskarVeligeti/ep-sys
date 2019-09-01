import React, { useState, useContext } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, ListItem, Divider, Image, Button, withBadge } from 'react-native-elements';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as ProductContext } from '../../context/ProductContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../../components/Loader';
import AddQuantity from '../../modal/AddQuantity';

import TabHeader from '../../components/TabHeader'
import SearchBar from '../../components/SearchBar'
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');
/**navigation prop that is passed down to our screen components. */

const PurchaseScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false);
    /* access Provider in the Context from this component
    fetchProduct: action funtion
    */
    const { state: { products, loading }, fetchProduct } = useContext(ProductContext);
    const { containerStyle1,subtitleText, nameStyle, priceStyle,
        productTextView, ratingView, imageView, descriptionText, dividerStyle,
        buttonView, button1Style, buttonStyle, titleStyle, button1TextStyle } = styles


    // for TouchableOpacity
    renderBuyNowButton = (item) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('AddQuantity',{data:[item]})}>
                <LinearGradient
                    colors={['#a94bb9', '#9b46b7', '#8d42b5', '#7d3eb2', '#6d3ab0']}
                    // start={{ x: 0, y: 0.5 }}
                    // end={{ x: 1, y: 0.5 }}
                    style={button1Style}
                >
                    <Text style={button1TextStyle}>
                        Buy Now
              </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }


    // for button 
    renderBuyNowButton1 = (item) => {
        return (
            <Button
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    // colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
                    colors: ['#a94bb9', '#9b46b7', '#8d42b5', '#7d3eb2', '#6d3ab0'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
                type="outline"
                iconRight
                title={'Buy Now'}
                titleStyle={{ fontSize: 13, color: '#fff' }}
                onPress={() => console.log('clicked :', item.name)}
                raised
                buttonStyle={buttonStyle}
            />
        )
    }

    renderAddCartButton = (item) => {
        return (
            <Button
                type="outline"
                iconRight
                title={'Add to Cart'}
                titleStyle={titleStyle}
                onPress={() => console.log('clicked :', item.name)}
                raised
                buttonStyle={buttonStyle} />
        )
    }



    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        return (
            // <TouchableOpacity
            //     onPress={() => alert(`selected :${item.name}`)}>
            <>
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
                <View style={buttonView}>
                    {renderBuyNowButton(item)}
                    {renderAddCartButton(item)}
                </View>

                <Divider style={dividerStyle} />
            </>
            // </TouchableOpacity>
        )
    }


    _onRefresh = () => {
        setRefreshing(true);
        fetchProduct();
        setTimeout(() => {
            setRefreshing(false);
        }, 3000);

    }

    cartCounter = () => {
        return 99
    }


    return (
        <>
            <Loader loading={loading} />
            <NavigationEvents onWillFocus={fetchProduct} />
            <View style={containerStyle1}>
                {/* <TabHeader isCartButton={true} icon="shoppingcart" value={100} navigateTo='SelectedItem' /> */}
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
                                colors={["#6f42c1", "#007bff", "#dc3545", "#28a745", "#007bff", "#17a2b8"]}
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

// add badge to icon in  react-native
const POBadge = withBadge(() => cartCounter(), { containerStyle: { top:1, right: 20 } })(AntDesign)

PurchaseScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Home',
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <AntDesign name="back" size={25} color="white" style={{ marginLeft: 25 }} />
        </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <POBadge name='shoppingcart' size={30} color="white" style={{ marginTop: 5, marginRight: 10 }} />
            </TouchableOpacity>
        ),
    };
}

const styles = StyleSheet.create({
    containerStyle1: {
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
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },

    iconStyle: {
        fontSize: 22,
        color: '#6f42c1'
    },
    button1Style: {
        borderRadius: 5,
        borderColor: '#6f42c1',
        width: width / 3,
        height: 37,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    button1TextStyle: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',

    },
    buttonStyle: {
        borderRadius: 5,
        borderColor: '#6f42c1',
        width: width / 3,

    },
    titleStyle: {
        fontSize: 13,
        color: '#6f42c1'
    },
    dividerStyle: {
        backgroundColor: '#6f42c1'
    },
});

export default PurchaseScreen;