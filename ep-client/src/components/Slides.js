import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions,ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, Button,Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import Spacer from './Spacer'

// get the full width of thee device

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends React.Component {


    renderLastSlide = (index) => {
        return (
            <View>
                <Spacer />
                <Button
                    icon={<AntDesign name="rightcircleo" size={15} color="#fff" />}
                    iconLeft
                    onPress={this.props.onComplete}
                    title=" Proceed"
                    raised
                    buttonStyle={styles.bottonStyle}
                /></View>)
    }

    renderSlides = () => {
        return this.props.data.map((slide, index) => {
            return (
                <SafeAreaView 
                forceInset={{ top: 'always' }} 
                key={slide.text} 
                style={[styles.slideStyle, 
                { backgroundColor: slide.color }]}>
                    <Text style={styles.textStyle}>Rs {slide.price} OFF</Text>
                    <Image source={require('../../assets/3.jpg')}>
                    </Image>
                    <Text >{slide.text}</Text>
                    <Text >{slide.description}</Text>
                    {this.renderLastSlide(index)}

                </SafeAreaView>

            )
        })
    }
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
            >
                {this.renderSlides()}

            </ScrollView>





        )
    }


}




const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'stretch',
        width: SCREEN_WIDTH,
        marginTop:15
    },

    textStyle: {
        fontSize: 30,
        color: '#dc3545'
    },
    bottonStyle: {
        borderRadius: 5,
        // backgroundColor:'#17a2b8',
        marginTop:175
    }

});

export default Slides;
