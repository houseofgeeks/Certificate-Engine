import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container:
  {
    flex: 1,
    flexDirection: 'column',
    padding:  hp('4%'),
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  Box:
  {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#000000',
    width:  wp('70%'),
    height: hp('9%'),
    margin: hp('0.5%'),
    backgroundColor: "#b1eb34"
  },
  BoxU:
  {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#000000',
    width:  wp('70%'),
    height: hp('5%'),
    margin: hp('0.5%'),
    backgroundColor: "#36c9d1"
  },
  Button:
  {
    margin: hp('42%'),
    width:  wp('90%'),
    justifyContent: 'center',
  },
  Photo:
  {
    borderWidth: 10,
    borderColor: '#000000',
    height: hp('30%'),
    width: wp('45%'),
    alignItems: 'center',
    resizeMode:'stretch'
  },
  Text:
  {
    textAlign: 'center',
    color: "black",
    fontWeight: "bold",
    fontSize: 14
  },
  TextI:
  {
    textAlign: 'center',
    color: "red",
    fontSize: 15
  },
  Gap:
  {
      marginBottom: hp('11%'),
  }
});

export default styles;
