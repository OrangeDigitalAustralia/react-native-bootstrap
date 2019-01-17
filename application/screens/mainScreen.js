import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';

import globalStyles from '../config/styles';
const { fontLato, fontWhite, fontBold, flexRow, alignCenter } = globalStyles;

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome</Text>
                <Text style={styles.instructions}>App ID: {DeviceInfo.getBundleId()}</Text>

                <TouchableOpacity onPress={Actions.safeViewScreen} style={styles.button}>
                    <Icon name="phone-iphone" color="white" size={25} />
                    <Text style={[fontLato, fontBold, fontWhite]}>
                        Button with Vector Icon
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0BB6EB',
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 15,
        ...flexRow,
        ...alignCenter
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
