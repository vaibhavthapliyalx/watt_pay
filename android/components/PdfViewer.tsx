//--------------- Copyright (c) 2023 WattPay. ---------------//

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

type IProps = {
  filePath: string;
  isDisplayed: boolean,
};

const PdfViewer = ({filePath, isDisplayed}: IProps) => {
  return (
    <>
      {isDisplayed &&
        <View style={styles.container}>
          <Pdf source={{ uri: filePath }}
            style={styles.pdf}    
            />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});

export default PdfViewer;
