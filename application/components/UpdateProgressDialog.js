import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

class UpdateProgressDialog extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            contentOpacity: new Animated.Value(0)
        };
    }

    componentDidMount() {
        if (this.props.loading) {
            this.show();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loading && this.props.loading) {
            this.show();
        } else if (prevProps.loading && !this.props.loading) {
            this.hide();
        }
    }

    hide(cb) {
        Animated.timing(this.state.contentOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(cb);
    }

    show(cb) {
        Animated.timing(this.state.contentOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start(cb);
    }

    render() {
        const { loading, size, color, text } = this.props;

        return (
            <Animated.View
                style={[
                    styles.containerStyle,
                    { opacity: this.state.contentOpacity }
                ]}
                pointerEvents={loading ? 'auto' : 'none'}
            >
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator
                        size={size || 'large'}
                        color={color || '#000000'}
                        style={{ marginTop: 5 }}
                    />
                    <Text style={styles.progressLabel}>
                        {text || 'Loading'}
                    </Text>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        elevation: 5
    },
    spinnerStyle: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20
    },
    progressLabel: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 15,
        color: '#333333'
    },
});

export default UpdateProgressDialog;
