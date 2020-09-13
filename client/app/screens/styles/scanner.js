import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container:
  {
    flex: 1,
    flexDirection: 'column',
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  Camera:
  {
    height: hp('90%'),
    width:  wp('100%'),
  },
  Button:
  {
    margin: hp('1.25%'),
    width:  wp('100%'),
    justifyContent: 'center',
  }
});

export default styles;
