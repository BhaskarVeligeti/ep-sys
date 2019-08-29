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

console.disableYellowBox = true;

// ******************************************** landing screens flow : *****************************************************
const AuthFlow = createMaterialBottomTabNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
}, {
    shifting: true,

  });

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
  }
)

// ******************************************** home screens flow : *****************************************************

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
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

// ******************************************** landing screens flow : *****************************************************








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
  AdminTasks: AdminFlow
},
  {
    mode: 'modal',
    headerMode: 'none',
  }, {
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



