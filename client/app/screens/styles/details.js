import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container:
  {
    flex: 1,
    flexDirection: 'column',
    padding:  hp('8%'),
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  Button:
  {
    margin: hp('30%'),
    width:  wp('90%'),
    justifyContent: 'center',
  },
  Photo:
  {
    height: hp('30%'),
    width: wp('50%'),
    alignItems: 'center',
    resizeMode:'stretch'
  },
  Text:
  {
    padding: wp('0.8%'),
    textAlign: 'center',
    color: "#0080ff",
    fontWeight: "bold",
    fontSize: 20
  },
  TextI:
  {
    padding: wp('1%'),
    textAlign: 'center',
    color: "#f76868",
    fontSize: 18
  }
});

export default styles;
