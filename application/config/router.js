import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { Stack, Modal, Scene, Router, Lightbox } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Analytics from '../libs/analytics';
import globalStyles from './styles';

import WebviewScreen from '../screens/webviewScreen';
import MainScreen from '../screens/mainScreen';

const {
    brandLightGreen
} = globalStyles;

const styles = StyleSheet.create({
    navBarWithElevation: {
        elevation: 4
    },
    navBarStyles: {
        backgroundColor: 'white',
        height: Platform.OS === 'android' ? 56 : 44,
        elevation: 0,
        borderBottomWidth: 0,
    },
    rightButtonTextStyle: {
        color: brandLightGreen,
    },
    backButtonTextStyle: {
        display: 'none'
    },
    titleStyle: {
        fontWeight: 'normal',
        fontSize: 20,
        width: '90%',
        color: 'black',
        ...Platform.select({
            ios: {
                textAlign: 'center',
            }
        })
    },
    modalWindowLeftButton: {
        width: 20,
        ...Platform.select({
            ios: {
                left: 8,
            }
        })
    }
});

const renderTitle = (props) => {
    return (
        <Text
            style={styles.titleStyle}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            numberOfLines={1}
        >
            {props.title}
        </Text>
    );
};

export default () => (
    <Router
        key="root"
        onStateChange={Analytics.onScreenChanged}
        sceneStyle={{ backgroundColor: 'white' }}
    >
        <Modal
            initial
            key="modalRoute"
            panHandlers={null}
            renderTitle={renderTitle}
            navigationBarStyle={styles.navBarStyles}
            leftButtonIconStyle={styles.modalWindowLeftButton}
        >
            <Lightbox key="lightboxRoute" hideNavBar>
                <Stack key="dashboard">
                    <Scene key="mainScreen" androidBackDisabled initial component={MainScreen} />
                </Stack>
                <Scene key="exampleLightbox" component={MainScreen} />
            </Lightbox>

            <Scene
                titleStyle={styles.titleStyle}
                key="webviewScreen"
                component={WebviewScreen}
            />
        </Modal>
    </Router>
);
