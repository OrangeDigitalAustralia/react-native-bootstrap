import React, { Component } from 'react';
import { WebView, StyleSheet, ActivityIndicator, View } from 'react-native';

import globalStyles from '../config/styles';

const { flex } = globalStyles;

const styles = StyleSheet.create({
    loadingContainer: {
        ...flex,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    }
});

class WebviewScreen extends Component {
    renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    render() {
        return (
            <View style={[flex]}>
                <WebView
                    source={{ uri: this.props.url }}
                    renderLoading={this.renderLoading}
                    startInLoadingState
                />
            </View>
        );
    }
}

export default WebviewScreen;
