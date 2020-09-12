import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container:
  {
    flex: 1,
    flexDirection: 'row',
    height: hp('50%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  Background:
  {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center"
  },
  Box:
  {
    flex: 1,
    flexDirection: 'column',
    height: hp('5%'),
    width: wp('100%'),
  },
  Logo:
  {
    height: hp('28%'),
    width: wp('35%'),
    marginRight: wp('10%'),
    resizeMode: "stretch",
  },
  Camera:
  {
    height: hp('20%'),
    width:  wp('35%'),
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
  },
  Text:
  {
    marginLeft: wp('10%'),
    marginBottom: hp('5%'),
    color: 'white',
  },
  Button:
  {
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    marginBottom: hp('5%'),
  },
});

export default styles;
