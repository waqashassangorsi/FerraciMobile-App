import {Platform} from 'react-native';
export default Fonts =
  Platform.OS == 'ios'
    ? {
        PoppinsRegular: 'RoundedMplus1c-Regular',
        PoppinsBold: 'RoundedMplus1c-Bold',
        PoppinsMedium: 'RoundedMplus1c-Medium',
      }
    : {
        PoppinsRegular: 'Poppins-Regular',
        PoppinsBold: 'Poppins-SemiBold',
        PoppinsMedium: 'MPLUSRounded1c-Medium',
        PoppinsMedium1: 'Poppins-Medium',
      };
//
