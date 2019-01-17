import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { Actions, Stack, Modal, Drawer, Scene, Router, Lightbox } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DrawerContent } from '../components';
import Analytics, { Events } from '../libs/analytics';

import WebviewScreen from '../screens/webviewScreen';
import MainScreen from '../screens/mainScreen';
import SafeViewScreen from '../screens/safeViewScreen';
import closeIcon from '../images/close.png';

const styles = StyleSheet.create({
    navBarStyles: {
        backgroundColor: '#FBFBFB',
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
                top: 4,
                left: 4,
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
                <Drawer
                    hideNavBar
                    key="drawerRoute"
                    contentComponent={DrawerContent}
                    drawerIcon={() => <Icon name="menu" size={30} color="black" />}
                    navigationBarStyle={styles.navBarStyles}
                    renderTitle={renderTitle}
                    navBarButtonColor="black"
                    backTitle=""
                    onBack={onBack}
                >
                    {/* drawerLockMode will prevent users from opening the drawer by dragging it from the corner of the screen  */}
                    <Stack key="dashboard" drawerLockMode="locked-closed">
                        <Scene key="mainScreen" androidBackDisabled initial title="Welcome" component={MainScreen} />
                        <Scene key="safeViewScreen" back title="Thanks Apple" component={SafeViewScreen} />
                    </Stack>
                </Drawer>

                {/*
                    Any scenes defined after the "dashboard" Stack lightboxes. In other words,
                    they'll be translucent.
                */}
                <Scene key="exampleLightbox" component={MainScreen} />
            </Lightbox>

            {/*
                Any scenes defined after the lightbox will be "modals". In other words,
                they'll animate from the bottom.
            */}
            <Scene
                key="webviewScreen"
                component={WebviewScreen}
                {...(Platform.OS === 'ios' ? { backButtonImage: closeIcon } : {})}
            />
        </Modal>
    </Router>
);
