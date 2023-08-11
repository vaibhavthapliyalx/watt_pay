# WattPay Android App

WattPay is a basic Android app developed using React Native that allows you to calculate electricity consumption using provided units and generate a PDF that can be easily shared. The app is designed for simplicity and ease of use, making it a convenient tool for calculating and tracking your electricity usage. Please note that this app is currently focused on calculating electricity consumption and does not require a backend connection.

## Disclaimer

WattPay is provided "as is" without any warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The entire risk as to the quality and performance of the app is with you. Should the app prove defective, you assume the cost of all necessary servicing, repair, or correction.

## Installation

Follow these steps to install and run WattPay on your Android device.

### Debugging

1. Make sure you have Node.js installed on your computer.
2. Clone this repository to your local machine.
3. Open a terminal and navigate to the project directory.
4. Run the following commands:

```bash
npm install
npx react-native run-android
```

5. The app will be installed and launched on your connected Android device or emulator.

### Release

To build a release version of the app, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Run the following command to generate a release APK:

```bash
cd android && ./gradlew bundleRelease
```

3. Once the build is successful, you'll find the release APK in the `android/app/build/outputs/bundle/release` directory.
4. Transfer the APK to your Android device and install it.

## Usage

1. Launch the WattPay app on your Android device.
2. Enter the units of electricity consumed.
3. The app will calculate the electricity consumption and generate a PDF report.
4. You can share the generated PDF with others.

## Features

- User-friendly interface for calculating electricity consumption.
- Generate and share PDF reports of electricity usage.
- No backend connection required.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

Experience the convenience of tracking electricity usage with WattPay, the intuitive Android app developed using React Native.
