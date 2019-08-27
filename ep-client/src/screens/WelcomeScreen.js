import React from 'react';
import { StyleSheet } from 'react-native';
import Slides from '../components/Slides';
 
// TODO : fix this with data
const SLIDE_DATA = [
    { text: 'Product 1', color: '#fff', price:100,description:'description Product 1' },
    { text: 'Product 2', color: '#fff',price:200 ,description:'description Product 2'},
    { text: 'Product 3', color: '#fff',price:300,description:'description Product 3' }
];

const WelcomeScreen = ({ navigation }) => {
    return (
        <Slides 
          data={SLIDE_DATA} 
          onComplete={()=>navigation.navigate('Auth')} />


    )

}

WelcomeScreen.navigationOptions = {
    header: null

}


const styles = StyleSheet.create({

});

export default WelcomeScreen;