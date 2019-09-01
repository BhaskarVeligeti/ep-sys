import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { setNavigator } from './src/navigationRef';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
// auth :
import SigninScreen from './src/screens/Auth/SigninScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
// home :
import HomeScreen from './src/screens/Home/HomeScreen';
// dashboard :
import SalesScreen from './src/screens/Dashbord/SalesScreen';
import ProcurementScreen from './src/screens/Dashbord/ProcurementScreen';
import StatisticsScreen from './src/screens/Dashbord/StatisticsScreen';
// product :
import ProductScreen from './src/screens/Product/ProductScreen';
import PurchaseScreen from './src/screens/Product/PurchaseScreen';
import SelectedItemScreen from './src/screens/Product/SelectedItemScreen';

// reminder :
import ReminderScreen from './src/screens/Reminder/ReminderScreen';
// password :
import ChangePasswordScreen from './src/screens/ChangePassword/ChangePasswordScreen';
// password :
import OrderHistoryScreen from './src/screens/OrderHistory/OrderHistoryScreen';
// modals :
import RegModal from './src/modal/RegModal';
import RepScreen from './src/screens/RepScreen';
import RepDetailScreen from './src/screens/RepDetailScreen';
import AddQuantity from './src/modal/AddQuantity';



// admin :
import AddRepScreen from './src/screens/Admin/AddRepScreen';
import ResetPasswordScreen from './src/screens/Admin/ResetPasswordScreen';
import RepDetailModal from './src/modal/RepDetailModal';

// TrackAndTrace :
import POScreen from './src/screens/TrackAndTrace/POScreen';
import IPScreen from './src/screens/TrackAndTrace/IPScreen';
import BalanceScreen from './src/screens/TrackAndTrace/BalanceScreen';
import CompleteScreen from './src/screens/TrackAndTrace/CompleteScreen';
import RefundScreen from './src/screens/TrackAndTrace/RefundScreen';
import CancelScreen from './src/screens/TrackAndTrace/CancelScreen';

// providers declaration :
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as UsersProvider } from './src/context/UsersContext'
import { Provider as RegProvider } from './src/context/RegContext'
import { Provider as ProductProvider } from './src/context/ProductContext'

import { Feather } from '@expo/vector-icons';

console.disableYellowBox = true;

import * as Font from 'expo-font';
// import { StyleSheet } from 'react-native';
// StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

Font.loadAsync({
  'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
});

// ******************************************** landing screens flow : *****************************************************
const AuthFlow = createMaterialBottomTabNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
}, {
    shifting: true,
  },
  );

 
const LandingFlow = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Auth: AuthFlow
  }, { // options object 
    initialRouteName: "Welcome",
   
    /* The header config Sharing common navigationOptions across screens */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6f42c1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
//   {
//  navigationOptions:{
//     headerRight: (
//       <Feather name="unlock" size={50} color="white" style={{ marginLeft: 25 }}/>
//   ),
//   },
//   }
)

// ******************************************** home screens flow : *****************************************************



const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Purchase:PurchaseScreen,
    AddQuantity:AddQuantity,   // modal
    SelectedItem: SelectedItemScreen,
  },
  { // options object 
    initialRouteName: "Home",
    /* The header config Sharing common navigationOptions across screens */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6f42c1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

// ******************************************** dashboard screens flow : *****************************************************

const DashboardFlow = createMaterialBottomTabNavigator({
  Sales: SalesScreen,
  Procurement: ProcurementScreen,
  Statistics: StatisticsScreen,

}, {
    shifting: true,

  });

// ******************************************** TrackAndTrace screens flow : *****************************************************
const TrackAndTraceFlow = createMaterialBottomTabNavigator({
  PO: POScreen,
  IP: IPScreen,
  Balance: BalanceScreen,
  Complete: CompleteScreen,
  Cancel: CancelScreen,
  Refund: RefundScreen

}, {
    shifting: true,

  });

// ******************************************** Admin screens flow : *****************************************************

const AdminFlow = createMaterialBottomTabNavigator({
  AddRep: AddRepScreen,
  ResetPassword: ResetPasswordScreen

}, {
    shifting: true,

  });

// ******************************************** selected product screens flow : *****************************************************






const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,  // automatic signin process
  landing: LandingFlow,  // welcome and signin and signup
  Home: HomeStack,     // Home 
  Dashboard: DashboardFlow,  // Dashboard
  Product: ProductScreen,
  Reminder: ReminderScreen,
  ChangePassword: ChangePasswordScreen,
  OrderHistory: OrderHistoryScreen,
  RegModal: RegModal,   // modal
  RepDetail: RepDetailScreen,
  RepDetailModal: RepDetailModal, // modal
  TrackAndTrace: TrackAndTraceFlow,
  AdminTasks: AdminFlow,

},
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
   {
    initialRouteName: 'ResolveAuth'
  })

const AppContainer = createAppContainer(switchNavigator);


/* 
The PaperProvider component provides the theme to all the components in the framework. 
It also acts as a portal to components which need to be rendered at the top level.
*/
export default () => {
  return (

    <PaperProvider>
      <ProductProvider>
        <RegProvider>
          <UsersProvider>
            <AuthProvider>
              <AppContainer
                ref={(navigator) => { //Navigation From Outside of React
                  setNavigator(navigator);
                }} />

            </AuthProvider>
          </UsersProvider>
        </RegProvider>
      </ProductProvider>
    </PaperProvider>

  )
}



