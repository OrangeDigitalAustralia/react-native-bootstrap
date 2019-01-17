import React from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import globalStyles from '../config/styles';
import AppRating from '../libs/app-rating';

const {
    brandLightGreen,
    spaceBetweenChildren,
    flex,
    mbottom20
} = globalStyles;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: brandLightGreen,
        ...Platform.select({
            ios: {
                paddingTop: 50
            }
        })
    },
});

const DrawerContent = () => (
    <ScrollView
        style={[flex, styles.container]}
        alwaysBounceVertical={false}
        contentContainerStyle={[spaceBetweenChildren]}
    >
        <Text>
            Your drawer content goes here.
        </Text>
        <Text style={mbottom20}>
            You can close the drawer by pressing outside of it, dragging it or programatically (button below)
        </Text>
        <Button onPress={Actions.drawerClose} title="Close Drawer" />
        <Button onPress={AppRating.promptAppRating} title="Rate App" />
    </ScrollView>
);

export default DrawerContent;
