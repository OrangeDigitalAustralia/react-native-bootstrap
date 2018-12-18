/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import codePush from 'react-native-code-push';

const codePushOptions = {
    updateDialog: true,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
};

export default codePush(codePushOptions)(class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>updated dude</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
