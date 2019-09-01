import React from 'react';
import { Text, TouchableOpacity } from 'react-native';



const Button = (props) => {
    const { buttonStyle, textStyle } = styles
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={props.onPress}
            underlayColor='#28a745'>
            <Text style={textStyle}>{props.children}</Text>
        </TouchableOpacity>

    )
}

const styles = {
    buttonStyle: {
        flex: 1, 
        alignSelf: 'stretch',
        backgroundColor: '#28a745',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 5,
        marginRight: 1
    },
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10


    }
}

export  {Button};