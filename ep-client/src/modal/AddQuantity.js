import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, Button, Overlay } from 'react-native-elements';
import Spacer from '../components/Spacer'

const AddQuantity = ({ navigation }) => {
    const { containerStyle,headerStyle,headerText } = styles

    return (


<>
<Spacer />
<View style={headerStyle}>
      <Text style={headerText}>Quantity... </Text>
      </View>
      <Spacer />
      <Button
                    onPress={() => navigation.navigate('Purchase')}
                    title="Dismiss"
                />
                <Divider></Divider>
                <Spacer />
                <Button
                    onPress={() => navigation.navigate('SelectedItem', { data: navigation.getParam('data') })}
                    title="Go..."
                />
</>

        
    )

}

AddQuantity.navigationOptions = ({ navigation }) => {
    return {
        header: null,
    };
}



const styles = StyleSheet.create({
    containerStyle: {
        borderColor: '#6610f2',
        borderWidth: 1,
        flex: 1,
        // marginTop:150,
        // marginBottom:100,
        // backgroundColor: '#00000040'
    },
    headerStyle:{
        backgroundColor:'#17a2b8',marginTop:-3,alignItems:'center',height:40
      },
      headerText:{
          fontSize: 18, color: 'white' ,top:8
      },
})
export default AddQuantity;
