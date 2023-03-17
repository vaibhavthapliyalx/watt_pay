//--------------- Copyright (c) 2023 WattPay. ---------------//

import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, Dimensions, Alert, Button} from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import ErrorWindow from './ErrorWindow';

type IProps = {
  filePath: string;
  isDisplayed: boolean,
};

const PdfViewer = ({filePath, isDisplayed}: IProps) => {
  const [showError, setShowError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // handles  disissing error.
  const handleDismissError = () => {
    setShowError(false);
  };

  function handleShare () {
    setShowDialog(true);
  };
  async function handleDialogConfirm () {
    const content = {
      type: 'application/pdf',
      message: 'Hello User! your invoice is ready!',
      url: `file://${filePath}`,
    };
    await Share.open(content).catch((error)=> {console.log(error)});
    setShowDialog(false);
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  // UseEffect performed to display the dialog to share.
  useEffect(()=>{
    if (showDialog) {
      Alert.alert(
        'Confirm Share',
        'Are you sure you want to share the PDF file?',
        [
          {text: 'Cancel', onPress: handleDialogCancel},
          {text: 'Share', onPress: handleDialogConfirm},
        ],
      );
    }
  },[showDialog]);

  return (
    <SafeAreaView style ={styles.container}>
      {isDisplayed &&
        <>
          <Pdf source={{ uri: filePath }}
          onLoadProgress={(percent)=>{Alert.alert(`Loading ${percent}`)}}
            style={styles.pdf} />
          <Button title="Share PDF" onPress={handleShare} />
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
