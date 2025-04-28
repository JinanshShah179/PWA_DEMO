import { Text, StyleSheet, View, BackHandler,Alert } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      else{
        Alert.alert('Exit App','Are you sure you want to exit the app?',[
          {text:"cancel",onPress:()=>{},style:'cancel'},
          {text:"Exit",onPress:()=>BackHandler.exitApp()},
        ],{cancelable:true})
      }
      return true;
    });

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <View style={styles.container}>
      <WebView 
        ref={webViewRef}
        source={{uri: 'https://metamerchandice.com'}}
        style={styles.WebView}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigationStateChange}
         allowsBackForwardNavigationGestures
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  WebView: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
