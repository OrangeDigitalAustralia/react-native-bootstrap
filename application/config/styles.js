import { Platform, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const brandLightGreen = '#00afab';
const brandDarkBlue = '#002532';

const globalStyles = StyleSheet.create({
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignSelfCenter: { alignSelf: 'center' },
    spaceBetweenChildren: { justifyContent: 'space-between' },
    spaceAroundChildren: { justifyContent: 'space-around' },
    screenContainer: { paddingHorizontal: 20 },
    keyboardToolbar: {
        justifyContent: 'flex-end',
        height: 40
    },
    // Pixel Sizes
    fillWidth: { width: '100%' },
    // Text Align
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
    // Flex Sizes
    flex: { flex: 1 },
    flex2: { flex: 2 },
    flex3: { flex: 3 },
    flex4: { flex: 4 },
    flex5: { flex: 5 },
    flexGrow0: { flexGrow: 0 },
    flexGrow1: { flexGrow: 1 },
    // Layout (margin, padding)
    mbottom10: { marginBottom: 10 },
    mbottom20: { marginBottom: 20 },
    mtop10: { marginTop: 10 },
    mtop20: { marginTop: 20 },
    mtop40: { marginTop: 40 },
    mtop60: { marginTop: 60 },
    mtop80: { marginTop: 80 },
    ptop0: { paddingTop: 0 },
    pleft10: { paddingLeft: 10 },
    pright10: { paddingRight: 10 },
    mleft10: { marginLeft: 10 },
    mleft20: { marginLeft: 20 },
    mleft40: { marginLeft: 40 },
    mright20: { marginRight: 20 },
    mright40: { marginRight: 40 },
    mhorizontal20: { marginHorizontal: 20 },
    pvertical10: { paddingVertical: 10 },
    pvertical20: { paddingVertical: 20 },
    pvertical5: { paddingVertical: 5 },
    phorizontal10: { paddingHorizontal: 10 },
    phorizontal20: { paddingHorizontal: 20 },
    p20: { padding: 20 },
    p40: { padding: 40 },
    ptop20: { paddingTop: 20 },
    ptop40: { paddingTop: 40 },
    pbottom20: { paddingBottom: 20 },
    // Fonts
    fontLato: { fontFamily: 'Lato' },
    font14: { fontSize: 14 },
    font16: { fontSize: 16 },
    font18: { fontSize: 18 },
    font20: { fontSize: 20 },
    font22: { fontSize: 22 },
    font24: { fontSize: 24 },
    font26: { fontSize: 26 },
    fontBold: { fontWeight: 'bold' },
    // Colours
    fontRequired: {
        fontSize: 12,
        ...Platform.select({
            ios: {
                color: 'red',
            }
        })
    },
    fontRed: { color: 'red' },
    fontWhite: { color: 'white' },
    fontDarkBlue: { color: brandDarkBlue },
    fontLightGreen: { color: brandLightGreen },
    fontDarkGray: { color: '#333333' },
    fontLightGray: { color: '#AAAAAA' },
    bgDarkBlue: { backgroundColor: brandDarkBlue },
    bgLightGreen: { backgroundColor: brandLightGreen },
    bgWhite: { backgroundColor: 'white' },
    bgLightGray: { backgroundColor: '#F1F1F5' },
    // Visibility
    visible: { opacity: 1 },
    invisible: { opacity: 0 },
});

export default globalStyles;
