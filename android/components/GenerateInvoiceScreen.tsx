//--------------- Copyright (c) 2023 WattPay. ---------------//

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf'

interface InvoiceData {
  lastUnits: string;
  currentUnits: string;
  rate: string;
}
// WattPay Logo Image Path.
const appLogoPath = '../assets/Images/app-name-with-value-proposition-logo.png';

interface IProps {
  isDisplayed: boolean,
  onGeneratePressed: (flag: boolean, filePath: string) => void;
}

/**
 * 
 * @param isDisplayed : Used to handle if this screen should be displayed.
 * @returns GenerateInvoiceScreenß
 */
const GenerateInvoiceScreen = ({onGeneratePressed, isDisplayed}: IProps) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    lastUnits: '',
    currentUnits: '',
    rate: '',
  });

  const [previewUri, setPreviewUri] = useState<string>("");

  // UseEffect performed to update state of DisplayScreen.
  // useEffect(()=>{
  //   setDisplayScreen(isDisplayed)
  // },[isDisplayed]);

  const handleInputChange = (name: keyof InvoiceData, value: string) => {
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleGenerateInvoice = async () => {
    const lastUnits = invoiceData.lastUnits;
    const currentUnits = invoiceData.currentUnits;
    const rate = invoiceData.rate;
    const totalUnits = parseFloat(currentUnits) - parseFloat(lastUnits);
    const totalCost = totalUnits * parseFloat(rate);
  
    const invoiceHtml = `
      <h1>Hello User, Here's your Invoice</h1>
      <p>Last units: ${lastUnits}</p>
      <p>Current units: ${currentUnits}</p>
      <p>Rate per unit: ${rate}</p>
      <p>Total units: ${totalUnits}</p>
      <p>Total cost: ${totalCost}</p>
      <br/>
      <br/>
      <h1> This is just a sample, will improve next.</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <p> filepath:${previewUri}</p>
    `;
    // For appending date and time, to make unique names on each overwrite.
    const now = new Date();
    const dateStr = now.toLocaleDateString().replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString().replace(/:/g, '-');
  
    const options = {
      html: invoiceHtml,
      fileName: `watt-pay-invoice-${dateStr}-${timeStr}`,
      directory: 'Documents',
    };
  
    try {
        const pdf = await RNHTMLtoPDF.convert(options);
        Alert.alert('Success', `Invoice generated successfully!\nSaved to:${pdf.filePath}`, [
          { text: 'Continue' },
        ]);
        console.log(pdf);
        if (pdf.filePath) {
          onGeneratePressed(true,pdf.filePath);
        }
        // replace console.log with your own logic to display the generated PDF invoice
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while generating the invoice.', [
          { text: 'Continue' },
        ]);
      }
  };

  return (
    <>
    {isDisplayed &&
    <SafeAreaView style={styles.container}>
      <Image source={require(appLogoPath)} style={styles.logo}/>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter prev units:</Text>
        <TextInput
          style={styles.input}
          value={invoiceData.lastUnits}
          placeholder={'00000'}
          placeholderTextColor={'#62CC90'}
          keyboardType={'number-pad'}
          onChangeText={(value) => handleInputChange('lastUnits', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter current units:</Text>
        <TextInput
          style={styles.input}
          value={invoiceData.currentUnits}
          placeholder={'00000'}
          keyboardType={'number-pad'}
          placeholderTextColor={'#62CC90'}
          onChangeText={(value) => handleInputChange('currentUnits', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rate per unit:</Text>
        <TextInput
          style={styles.input}
          value={invoiceData.rate}
          placeholder={'₹ 0.00'}
          keyboardType={'number-pad'}
          placeholderTextColor={'#62CC90'}
          onChangeText={(value) => handleInputChange('rate', value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGenerateInvoice}>
        <Text style={styles.buttonText}>GENERATE INVOICE</Text>
      </TouchableOpacity>
    </SafeAreaView>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent: 'center',
  },
  pdf: {
    flex: 1,
  },
  logo: {
    width: 400,
    height: 100
  },
  inputContainer: {
    marginBottom: 16,
    marginLeft: 50,
    flexDirection:'column'
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#62CC90'
  },
  input: {
    borderWidth: 1,
    borderColor: '#62CC90',
    padding: 8,
    marginVertical: 8,
    width: '80%',
    borderRadius: 8,
    color:'#62CC90'
  },
  button: {
    backgroundColor: '#62CC90',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GenerateInvoiceScreen;
