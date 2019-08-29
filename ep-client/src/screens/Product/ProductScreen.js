import React, { useContext } from 'react';
import { StyleSheet, View,Dimensions,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Text, ListItem,Divider,Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Context as ProductContext } from '../../context/ProductContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../../components/Loader';
import TabHeader from '../../components/TabHeader'

const {width,height} = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const ProductScreen = ({ navigation }) => {
      /* access Provider in the Context from this component
      fetchProduct: action funtion
      */
    const { state: { products, loading }, fetchProduct } = useContext(ProductContext);
    const { containerStyle,subtitleView,subtitleText } = styles

    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        const titleColor = item.status === 'Active' ? '#007bff' : '#dc3545'
        return (<TouchableOpacity
            onPress={() => navigation.navigate('RepDetailModal', { item: item })}>
                    <ListItem
                        leftIcon={<AntDesign name="user" size={20} />}
                        title={item.name}
                        titleStyle={{ color: titleColor }}
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={subtitleText}>{item.description }</Text>
                                <Image 
                                source={{uri: `data:image/png;base64,${item.image}`}} 
                                PlaceholderContent={<ActivityIndicator />}
                                style={{width: 150, height: 100}}
                                />
                            </View>
                        }
                        chevron
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

    contentStyle: {
        borderColor: 'green',
        borderWidth: 1,
        flex: 1,
        alignItems:'center',
    
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      subtitleText: {
        paddingLeft: 10,
        color: 'grey'
      }
});

export default ProductScreen;