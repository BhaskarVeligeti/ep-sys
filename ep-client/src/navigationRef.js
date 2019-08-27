import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = nav => {

  navigator = nav;
  // console.log('setNavigator:',navigator)
};

/*
All NavigationActions return an object that can be sent to the router using navigation.dispatch() method.
Navigate - Navigate to another route
Set Params - Set Params for given route
*/

export const navigate = (routeName, params) => {
  // console.log('params:',params)

  /*
  const navigateAction = NavigationActions.navigate({
    routeName,
    params: {},
    action: NavigationActions.navigate({ routeName}),
  });

  const setParamsAction = NavigationActions.setParams({
    params: { params},
    key: 'screen-123',
  });

  // navigator.dispatch(navigateAction);
  // navigator.dispatch(setParamsAction);
*/
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};



