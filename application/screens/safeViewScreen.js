import React, { Component } from 'react';
import { SafeAreaView, Button, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStyles from '../config/styles';

const {
    flex,
    spaceBetweenChildren,
    flexRow,
    p20
} = globalStyles;

class SafeViewScreen extends Component {
    render() {
        return (
            <SafeAreaView style={flex}>
                <View style={[flex, p20, spaceBetweenChildren]}>
                    <View>
                        <Text>This screen should respect the safe areas on the iPhone X family</Text>
                    </View>

                    <View style={[flexRow, spaceBetweenChildren]}>
                        <Button
                            title="Go Back"
                            onPress={Actions.pop}
                        />
                        <Button
                            title="Open Webview Modal"
                            onPress={() => Actions.webviewScreen({ 
                                url: 'https://www.orangedigital.com.au',
                                title: 'Custom Title'
                            })}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default SafeViewScreen;
