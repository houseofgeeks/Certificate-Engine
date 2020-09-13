import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    Container:
    {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: hp('100%'),
      width: wp('100%'),
      resizeMode:"stretch",
    },
    Card:
    {
      marginLeft: hp('5%'),
      marginRight: hp('5%'),
      marginBottom: hp('7%'),
      padding: hp('5%'),
      backgroundColor : "#bdeaff",
    },
    CardText:
    {
      justifyContent: "center",
      marginBottom: hp('2%'),
      fontWeight: "bold",
      color: "red"
    },
});

export default styles;
