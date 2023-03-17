//--------------- Copyright (c) 2023 WattPay. ---------------//

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Alert, Button, Share } from 'react-native';
import Pdf from 'react-native-pdf';
import ErrorWindow from './ErrorWindow';

type IProps = {
  filePath: string;
  isDisplayed: boolean,
};

const PdfViewer = ({filePath, isDisplayed}: IProps) => {
  const [showError, setShowError] = useState(false);

  // handles  disissing error.
  const handleDismissError = () => {
    setShowError(false);
  };

  const handleShare = async (filepath: string) => {
    try {
      const result = await Share.share({
        url: `file://${filepath}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <SafeAreaView style ={styles.container}>
      {isDisplayed &&
        <>
          <Pdf source={{ uri: filePath }}
            style={styles.pdf} />
          <Button title="Share PDF" onPress={() => handleShare('/path/to/myfile.pdf')} />
        </>
      }
      {(!isDisplayed && showError) &&
        <ErrorWindow
        message={`Error 404 File not found.\nPlease ensure that file exists.\nIf this problem persists, please contact the developer.`}
        onDismiss={handleDismissError} isDisplayed={showError} 
      />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
},
pdf: {
    flex:1,
    width:Dimensions.get('window').width,
}
});

export default PdfViewer;
