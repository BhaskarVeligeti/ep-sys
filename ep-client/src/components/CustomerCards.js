import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-elements';

const CustomerCards =()=>{

return(
    <ScrollView>
    <TouchableOpacity
    onPress={()=>alert(1)}
    >
    <Card
        key={1}
        title={'dashboard'}
        image={require(`../../assets//1.jpeg`)}
    >
        <Text style={{ marginBottom: 10 }}>
            {'Dashboard for visualisation of data'}
        </Text>
    </Card>
    </TouchableOpacity>
    
     
    <Card
        key={2}
        title={'Purchase'}
        image={require(`../../assets//1.jpeg`)}
    >
        <Text style={{ marginBottom: 10 }}>
            {'Purchase..............'}
        </Text>
    </Card>

    <Card
        key={3}
        title={'History'}
        image={require(`../../assets//1.jpeg`)}
    >
        <Text style={{ marginBottom: 10 }}>
            {'History'}
        </Text>
    </Card>
</ScrollView>

)

}

export default CustomerCards