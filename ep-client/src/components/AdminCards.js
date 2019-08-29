import React from 'react';
import { View, ScrollView, TouchableOpacity,StyleSheet } from 'react-native';
import { Text, Card,Image,ActivityIndicator } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
import Spacer from './Spacer'


const AdminCards = ({ navigation }) => {

    const {containerStyle,viewStyle,textStyle,imageStyle}=styles
    return (
        <>
        <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('TrackAndTrace')}>
                <Card
                    key={1}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Track and Trace'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/track.jpg`)}
                    // PlaceholderContent={<ActivityIndicator />}

                    // image={  <Image
                    //     source={require('../../assets/track.jpg')}
                    //     style={imageStyle}
                    //     PlaceholderContent={<ActivityIndicator />}
                    // />}
                   
                >
            <Text style={{ marginBottom: 10 }}>
                        {'Track and Trace Management.'}
                    </Text>

                 
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Card
                    key={2}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Dashboard'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/dashboard.png`)}
                >
                    <Text style={{ marginBottom: 10 }}>
                        {'Sales,Procurement and Statistics  data visualization.'}
                    </Text>
                </Card>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Reminder')}>
                <Card
                    key={3}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Reminder'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/reminder.png`)}
               
                >

                    <Text style={{ marginBottom: 10 }}>
                        {'Reminder Balance Management.'}
                    </Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                <Card
                    key={4}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Product'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/product.png`)}
                >
                    <Text style={{ marginBottom: 10 }}>
                        {'Product Management.'}
                    </Text>
                </Card>
            </TouchableOpacity>
         

            <TouchableOpacity onPress={() => navigation.navigate('AdminTasks')}>
                <Card
                    key={5}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Admin Tasks'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/admin.png`)}
                >
                    <Text style={{ marginBottom: 10 }}>
                        {'Most general Admin tasks.'}
                    </Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
                <Card
                    key={6}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Order History'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/history.png`)}
             >
                    <Text style={{ marginBottom: 10 }}>
                        {'Order History.'}
                    </Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                <Card
                    key={7}
                    title={
                   <View style={viewStyle}>
                    <Text style={textStyle}>{'Change Password'}</Text>
                    </View>
                }
                containerStyle={containerStyle}
                    image={require(`../../assets/settings.png`)}
                >
                    <Text style={{ marginBottom: 10 }}>
                        {'Change Password.'}
                    </Text>
                </Card>
            </TouchableOpacity>

            <Spacer />


        </ScrollView>
</>
    )

}
const styles = StyleSheet.create({
    containerStyle:{
        borderRadius:5,borderColor:'#17a2b8',
       
    },
    viewStyle:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#17a2b8',
        borderTopLeftRadius:3,borderTopRightRadius:3,marginBottom:15
    },
    textStyle:{
        color:'#fff',margin:10,
        textShadowColor: '#000', 
        textShadowOffset: { width: 0.5, height: 0.5 }, 
        textShadowRadius: 1,
        fontSize:18
    },
    imageStyle:{
        flex:1,
        width:200,height:150,
        alignSelf:'center',
        alignContent:'center'
        
    }
})



export default withNavigation(AdminCards);