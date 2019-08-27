import React from 'react';
import { Text, Button, Card } from 'react-native-elements';
import { View,StyleSheet, SafeAreaView } from 'react-native';
import RepUpdateForm from '../components/RepUpdateForm'
import Spacer from '../components/Spacer'
import { AntDesign } from '@expo/vector-icons';

/**navigation prop that is passed down to our screen components. */

const RepDetailScreen = ({ navigation }) => {
    const user = navigation.getParam('item');
    const {buttonStyle,headerStyle,headerText} = styles


    return (
        <>
            <SafeAreaView>
                <Spacer />
                <View style={headerStyle}>
                    <Text style={headerText}>Update </Text>
                </View>
                <Spacer />
                    <RepUpdateForm data={user}></RepUpdateForm>
                    <Button
                        onPress={() => navigation.navigate('Rep')}
                        title="Cancel  "
                        iconRight
                        raised
                        buttonStyle={buttonStyle}
                        icon={<AntDesign name="closecircleo" size={20} color="white" />}
                    />
            
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    headerStyle:{
      backgroundColor:'#17a2b8',marginTop:-3,alignItems:'center',height:40
    },
    headerText:{
        fontSize: 18, color: 'white' ,top:8
    },
    buttonStyle:{
        backgroundColor:'#6c757d'
    }
    
    });

export default RepDetailScreen;