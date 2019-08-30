import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


const SearchBar = ({term,onTermChange,onTermSubmit}) => {
    const { inputStyle, parentStyle, iconStyle } = styles
    return (
        <View style={parentStyle}>
            <Feather name='search' style={iconStyle}></Feather>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={inputStyle}
                placeholder='search'
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}

            ></TextInput>
        </View>

    )

}

const styles = StyleSheet.create({

    parentStyle: {
        marginTop:10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 30,
        marginHorizontal: 5,
        flexDirection: 'row',
        marginBottom:10
    },
    inputStyle: {
        fontSize: 18,
        flex: 1
    },
    iconStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15,
    },

});

export default SearchBar;