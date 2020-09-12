import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container:
  {
    flex: 1,
    flexDirection: 'column',
    padding:  hp('5%'),
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
  },
    Box:
    {
      borderWidth: 5,
      borderRadius: 20,
      borderColor: '#000000',
      width:  wp('75%'),
      height: hp('24%'),
      margin: hp('0.5%'),
      backgroundColor: "#b1eb34"
    },
    BoxU:
    {
      borderWidth: 5,
      borderRadius: 25,
      borderColor: '#000000',
      width:  wp('70%'),
      height: hp('20%'),
      margin: hp('4%'),
      backgroundColor: "#36c9d1"
    },
    Button:
    {
      marginLeft: hp('9.5%'),
      width:  wp('40%'),
      justifyContent: 'center',
    },
    Text:
    {
      textAlign: 'center',
      color: "black",
      fontWeight: "bold",
      fontSize: 26,
      margin: hp('0.2%'),
    },
    TextI:
    {
      textAlign: 'center',
      color: "red",
      marginTop: hp('1%'),
      marginBottom: hp('3%'),
      fontSize: 15
    }
});

export default styles;
