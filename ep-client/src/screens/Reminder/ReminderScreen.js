import React, { useContext } from 'react';
import { StyleSheet, View,Dimensions,FlatList,TouchableOpacity } from 'react-native';
import { Text, ListItem,Divider } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Context as UsersContext } from '../../context/UsersContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../../components/Loader';
import TabHeader from '../../components/TabHeader'

const {width,height} = Dimensions.get('window');

/**navigation prop that is passed down to our screen components. */

const ReminderScreen = ({ navigation }) => {
      /* access Provider in the Context from this component
      fetchUsers: action funtion
      */
    const { state: { users, loading }, fetchUsers } = useContext(UsersContext);
    const { containerStyle, contentStyle,subtitleView,subtitleText } = styles

    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        const titleColor = item.status === 'Active' ? '#007bff' : '#dc3545'
        return (<TouchableOpacity
            onPress={() => navigation.navigate('RepDetailModal', { item: item })}>
                    <ListItem
                        leftIcon={<AntDesign name="user" size={20} />}
                        title={item.username}
                        titleStyle={{ color: titleColor }}
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={subtitleText}>{item.firstName + " " + item.surname}</Text>
                                <Text style={{ color: titleColor, paddingLeft: 10, }}>{item.status}</Text>
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
        <NavigationEvents onWillFocus={fetchUsers} />
        <View style={containerStyle}>
            <TabHeader />
            <FlatList
                data={users}
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

export default ReminderScreen;