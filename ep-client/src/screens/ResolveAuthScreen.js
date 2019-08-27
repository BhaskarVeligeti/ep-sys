import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Image } from 'react-native-elements';
import {StyleSheet } from 'react-native';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (<Image
    source={require('../../assets/Loader.gif')}
    style={styles.imageStyle}
  />)
};

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: 250,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 250,
    height: 150,
  }
})



export default ResolveAuthScreen;
