import React from 'react';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer'
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Dimensions, SafeAreaView
} from 'react-native';
import RegForm from '../components/RegForm'

var { height, width } = Dimensions.get('window');

const RegModal = ({ navigation }) => {

  const {buttonStyle,headerStyle,headerText} = styles
  return (
    
    <SafeAreaView>
      <Spacer />
      <View style={headerStyle}>
      <Text style={headerText}>Registration </Text>
      </View>
      <Spacer />
      <RegForm />
      <Button
        onPress={() => navigation.navigate('AddRep')}
        title="Cancel  "
        iconRight
        raised
        buttonStyle={buttonStyle}
        icon={<AntDesign name="closecircleo" size={20} color="white" />}
      />
    </SafeAreaView>
 
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
export default RegModal;
