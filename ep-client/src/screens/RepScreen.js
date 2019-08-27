import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, ListItem,Divider } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Context as UsersContext } from '../context/UsersContext';
import { NavigationEvents } from 'react-navigation';
import Loader from '../components/Loader';


/**navigation prop that is passed down to our screen components. */

const RepScreen = ({ navigation }) => {
    /* access Provider in the Context from this component
      fetchUsers: action funtion
      */
    const { state: { users, loading }, fetchUsers } = useContext(UsersContext);
    const {headerStyle,headerText,subtitleView,subtitleText} = styles

    renderItem = ({ item }) => {
        // console.log('renderItem :', item);
        const titleColor = item.status === 'Active' ? '#007bff' : '#dc3545'
        return (<TouchableOpacity
            onPress={() => navigation.navigate('RepDetail', { item: item })}>
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
            <View style={headerStyle}>
      <Text style={headerText}>Representative </Text>
      </View>
      
            <NavigationEvents onWillFocus={fetchUsers} />
       

            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    )

}

RepScreen.navigationOptions = ({ navigation }) => {
    return {

        headerRight: (
            <TouchableOpacity
                onPress={() => navigation.navigate('RegModal')}
                style={{ marginRight: 15 }}
            >
                {<AntDesign name="adduser" size={22} color="white" />}
            </TouchableOpacity>
        ),
    };
}



const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor:'#6c757d',alignItems:'center',height:40
      },
      headerText:{
          fontSize: 18, color: 'white' ,top:8
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

export default RepScreen;