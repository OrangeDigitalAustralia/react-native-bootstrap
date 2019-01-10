import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { Actions, Stack, Modal, Scene, Router, Lightbox } from 'react-native-router-flux';

import Analytics, { Events } from '../libs/analytics';
import globalStyles from './styles';

import WebviewScreen from '../screens/webviewScreen';
import MainScreen from '../screens/mainScreen';
import SafeViewScreen from '../screens/safeViewScreen';

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
        fontWeight: '400',
        fontFamily: 'Lato',
        fontSize: 18,
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

// This custom back function will log screen close events to Firebase
const { pop } = Actions;
const customPop = () => {
    Analytics.logEvent(Events.SCREEN_CLOSED);

    pop();
};

Actions.pop = customPop;
const onBack = customPop;

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
            backTitle=" "
            onBack={onBack}
        >
            <Lightbox key="lightboxRoute" hideNavBar>
                <Stack key="dashboard">
                    <Scene key="mainScreen" androidBackDisabled initial title="Welcome" component={MainScreen} />
                    <Scene key="safeViewScreen" back title="Thanks Apple" component={SafeViewScreen} />
                </Stack>
                <Scene key="exampleLightbox" component={MainScreen} />
            </Lightbox>

            <Scene
                key="webviewScreen"
                component={WebviewScreen}
            />
        </Modal>
    </Router>
);
