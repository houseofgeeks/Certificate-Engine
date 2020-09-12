import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    Container:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Background:
    {
      flex: 1,
      resizeMode: "contain",
      justifyContent: "center"
    },
    Logo1:
    {
        height: hp('50%'),
        width: wp('100%'),
        justifyContent: 'center',
        resizeMode:"contain"
    },
    Logo2:
    {
        height: hp('30%'),
        width: wp('100%'),
        justifyContent: 'center',
        resizeMode:"contain"
    },
});


export default styles;
