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

    // For appending date and time, to make unique names on each overwrite.
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
    const dateStr = now.toLocaleDateString().replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString().replace(/:/g, '-');
  
    const invoiceHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Electricity Invoice</title>
      <style type="text/css">
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .invoice-header h1 {
          font-size: 28px;
          margin: 0;
        }
        .invoice-header p {
          font-size: 16px;
          margin: 0;
        }
        .invoice-details {
          margin-bottom: 20px;
        }
        .invoice-details table {
          width: 100%;
          border-collapse: collapse;
        }
        .invoice-details table td {
          padding: 10px;
          border: 1px solid #ddd;
        }
        .invoice-details table th {
          padding: 10px;
          border: 1px solid #ddd;
          background-color: #f2f2f2;
          font-weight: normal;
          text-align: left;
        }
        .invoice-total {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .invoice-total p {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }
        .invoice-note {
          font-size: 14px;
          margin-top: 20px;
          border: 1px solid #ccc;
          padding: 10px;
        }
        
        .invoice-note p {
          margin: 0;
          line-height: 1.5;
        }
        
        .invoice-note p strong {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="invoice-header">
          <h1>Electricity Invoice</h1>
          <p>Date :${date}</p>
        </div>
        <div class="invoice-details">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Last Units</th>
                <th>Recorded Units</th>
                <th>Total Units Consumed</th>
                <th>Price per Unit</th>
                <th>Amount</th>
                <th>Previous Balance Due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electricity Usage</td>
                <td>${lastUnits} kWh</td>
                <td>${currentUnits}</td>
                <td>${totalUnits}</td>  
                <td>₹${rate}
                <td>₹${totalCost}</td>
                <td>₹0.00 /- </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="invoice-total">
          <p>Total Amount Due:</p>
          <p>₹${totalCost}</p>
        </div>
        <div class="invoice-note">
          <p><strong>Invoice Note:</strong></p>
          <p>Please remit payment within 30 days of invoice date. Late payments might be subject to a monthly finance charge. If you have any questions or concerns about this invoice, please contact the sender.</p>
        </div>
        <footer style="font-size: 14px; color: #999; text-align: center; padding: 10px 0;position: fixed;bottom: 0;left: 0;right: 0;">&copy; ${now.getFullYear()} WattPay.
        All Rights Reserved.<br/>
        Unauthorized duplication or use of any content from this software is strictly prohibited.<br/>This includes but is not limited to text, graphics, logos, images, videos, and other media.<br/>
        Any trademarks, logos, or service marks displayed on this software are the property of their respective owners.</footer>
      </div>
    </body>
    </html>
    `;
    
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
      <View style ={{alignSelf:'center', width:'85%'}}>
      <TouchableOpacity style={styles.button} onPress={handleGenerateInvoice}>
        <Text style={styles.buttonText}>GENERATE INVOICE</Text>
      </TouchableOpacity>
      </View>
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
    alignSelf:'center'
  },
  logo: {
    width: 400,
    height: 100,
    alignSelf:'center'
  },
  inputContainer: {
    marginBottom: 16,
    marginLeft: 50,
    flexDirection:'column',
    
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#62CC90',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#62CC90',
    padding: 8,
    marginVertical: 8,
    width: '85%',
    borderRadius: 8,
    color:'#62CC90',
    
  },
  button: {
    backgroundColor: '#62CC90',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '85%',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GenerateInvoiceScreen;
