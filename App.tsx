//--------------- Copyright (c) 2023 WattPay. ---------------//

import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import GenerateInvoiceScreen from './android/components/GenerateInvoiceScreen';
import LoginPage from './android/components/LoginPage';
import NavBar from './android/components/NavBar';
import PdfViewer from './android/components/PdfViewer';


const App = () => {
  // State Variables.
  const [activeTab, setActiveTab] = useState('Home');
  const [displayPdfViewer, setDisplayPdfViewer] = useState(false);
  const [displayGeneratePdfScreen, setDisplayGeneratePdfScreen] = useState(true);
  const [pdfPath, setPdfPath] = useState<string>('');

  // UseEffect performed to handle the Splash Screen.
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleGeneratePressed = (success: boolean, filePath: string) => {
    if (success === true) {
      console.log(success,filePath)
      setDisplayPdfViewer(true);
      setDisplayGeneratePdfScreen(false);
      setPdfPath(filePath);
    }
  }
  

  // const AppContainer = createAppContainer(NavBar);
  return (
    <SafeAreaView style={styles.container}>
      <GenerateInvoiceScreen isDisplayed={displayGeneratePdfScreen} onGeneratePressed={handleGeneratePressed}/>
      <PdfViewer filePath={pdfPath} isDisplayed={displayPdfViewer} />
      <NavBar
        activeTab={activeTab}
        onChangeTab={handleTabChange}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18272E',
  },
});

export default App;
