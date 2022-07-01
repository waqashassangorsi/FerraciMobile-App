import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
//redux
import {signin, signupwithfb} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {headercolor} from '../../../assets';
import {Loading} from '../../../components/Loading';

const Item = ({title}) => (
  <View>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const PrivacyPolicy = ({user}) => {
  const navigation = useNavigation();
  const [listitem, setlistitem] = useState([]);
  const [listingthread, setlistingthread] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('firstlist', listitem);
  const proceed = () => {
    alert('Read sms');
  };

  const onPress = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Example App Read sms Permission',
          message: 'Example App needs access to your messages',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        // proceed();
        setLoading(true);
        const filter = {
          box: '',
          read: 1,
          indexFrom: 0,
          maxCount: 2000,

          // thread_id: 21,
        };

        SmsAndroid.list(
          JSON.stringify(filter),
          fail => {
            console.log('Failed with this error: ' + fail);
          },

          (count, smsList) => {
            console.log('Count: ', count);
            console.log('List: ', JSON.parse(smsList));
            var arr = JSON.parse(smsList);
            setLoading(false);
            let a = getUnique(arr, 'thread_id');
            setlistingthread(a);
            // setlistitem(arr);
          },
        );
        function getUnique(listitem, index) {
          const unique = listitem
            .map(e => e[index])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => listitem[e])
            .map(e => listitem[e]);
          return unique;
        }
        // console.log('pakistan', getUnique(listitem, 'thread_id'));
      } else {
        // Permission Denied
        alert('Sms Permission Denied');
      }
    } else {
      proceed();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      onPress();
    }, []),
  );


  const renderItem = ({item, index}) => {
    let colors = ['#e7eaf1', '#f4f7fe'];
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('Message', {
            showmessage: item.thread_id,
            showaddress: item.address,
          });
        }}>
        <Text
          style={[
            styles.item,

            {backgroundColor: colors[index % colors.length]},
          ]}>
          {item.address}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '12%',
        }}>
        <Image source={headercolor} style={{height: 150}} />
        <Text
          style={{position: 'absolute', color: 'white', fontSize: 20, top: 10}}>
          Messages
        </Text>
      </View>
      <View style={{marginTop: 80, marginBottom: 30}}>
        {listingthread == listingthread && (
          <FlatList
            data={listingthread}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
      <Loading visible={loading} />
      {/* <Text>{listitem.body}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    // alignItems: 'center',
    marginTop: '5%',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#f4511e',
    padding: 10,
  },
});
export default connect(null, {signupwithfb, signin})(PrivacyPolicy);
