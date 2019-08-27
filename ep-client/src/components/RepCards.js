import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-elements';

const RepCards =()=>{

return(
    <ScrollView>
    <TouchableOpacity
    onPress={()=>alert(1)}
    >
    <Card
        key={1}
        title={'dashboard'}
        image={require(`../../assets/1.jpeg`)}
    >
        <Text style={{ marginBottom: 10 }}>
            {'Dashboard for visualisation of data'}
        </Text>
    </Card>
    </TouchableOpacity>
    

</ScrollView>

)

}

export default RepCards