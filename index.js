/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Store from './src/redux/Store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { LocationProvider } from './src/context/LocationContext';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const MyApp = () => {
    return (
        <LocationProvider>
            <Provider store={Store}>
                <NavigationContainer>
                    <App />
                </NavigationContainer>
            </Provider>
        </LocationProvider>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);