import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    Container:
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    Logo:
    {
        height: hp('50%'),
        width: wp('100%'),
        justifyContent: 'center',
        resizeMode:"contain"
    },
    Button:
    {
      margin: wp('2%'),
      justifyContent: 'center',
    },
    Input: {
      margin: wp('2%'),
      height: hp('5%'),
      borderColor: '#05ff93',
      borderWidth: wp('1%'),
      textAlign: 'left'
   },
});

export default styles;
