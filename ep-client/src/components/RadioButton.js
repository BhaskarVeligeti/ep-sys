import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

const RadioButton = ({ options, intialStatus,onPress }) => {
    const { buttonContainer, circle, checkedCircle, labelStyle } = styles
    return (<View>
        {options.map((item) => {
            return (
                <View key={item.key} style={buttonContainer}>
                    <Text style={labelStyle}>{item.label}</Text>
                    <TouchableOpacity
                        style={circle}
                        onPress={()=>onPress(item.key)}>
                        {intialStatus === item.key && <View style={checkedCircle} />}
                    </TouchableOpacity>
                </View>
            )
        })

        }
    </View>)
};


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    labelStyle: {
        marginLeft: 15,
        fontSize: 18
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10
    },

    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#794F9B',
    }
});

export default RadioButton;
