import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Image,
  Pressable,
} from 'react-native';
//redux
import {signin, signupwithfb, getpdf} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Headers1} from '../../../components/Headers1';
import moment from 'moment';
import {arrowback} from '../../../assets';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Loading} from '../../../components/Loading';

const Message = ({navigation, user, route, getpdf}) => {
  const [listitem, setlistitem] = useState([]);
  const [listingthread, setlistingthread] = useState([]);
  const [loading, setLoading] = useState(false);

  const {showmessage, showaddress} = route.params;
  const input = useInput(new Date());
  const input2 = useInput(new Date());
  const [textdate, settextdate] = useState();
  const [textdateto, settextdateto] = useState();
  console.log('firstitem123', JSON.stringify(listitem));
  const pdfGenerate = async id => {
    const formData = new FormData();
    var myJSON = JSON.stringify(listitem);
    console.log('firstitem123', myJSON);
    formData.append('text', JSON.stringify(listitem));
    setLoading(true);
    const res = await getpdf(formData);
    setLoading(false);
    console.log('firstjson', res);
  };

  function useInput() {
    const [datefrom, setDate] = useState(new Date(null));
    const [dateto, setDateto] = useState(new Date());
    const [mode, setMode] = useState('datefrom');
    const [mode1, setMode1] = useState('dateto');

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    console.log('date1', new Date(null));
    console.log('date2', dateto);

    const showDatepicker = () => {
      setShow(true);
      setMode('currentMode');
    };

    const showMode1 = currentMode => {
      setShow1(true);
      setMode1(currentMode);
    };
    const showDatepicker1 = () => {
      showMode1('dateto');
    };

    const onChange = (event, selectedDate) => {
      settextdate(moment(new Date(null)).format('L'));
      setDate(new Date());

      const currentDate = selectedDate || datefrom;
      console.log('mydata123', currentDate);
      settextdate(moment(new Date(currentDate)).format('L'));

      // settextdate(currentDate);
      //return false;
      const dt = Date.parse(currentDate);

      const converttimestamp = dt / 1;
      setDate(converttimestamp);
      console.log('firstchecktimestamp', converttimestamp);
    };

    const onChange1 = (event, selectedDate) => {
      const currentDate = selectedDate || dateto;
      // settextdateto(currentDate);
      setShow1(Platform.OS === 'ios');
      const dt = Date.parse(currentDate);
      const converttimestamp = dt / 1;
      setDateto(converttimestamp);
      console.log('firstchecktimestampto', converttimestamp);
    };

    useEffect(() => {
      setLoading(true);
      const filter = {
        box: '',
        read: 1,
        indexFrom: 0,
        maxCount: 2000,

        thread_id: showmessage,
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
          // setlistitem(arr);
          console.log('firstlist', arr);
          let arr1 = [];
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].date >= datefrom && arr[i].date <= dateto) {
              arr1.push(arr[i]);
            }
          }
          setlistitem(arr1);
          console.log('first123', arr1);
        },
      );
    }, [datefrom, dateto]);

    return {
      datefrom,
      dateto,
      showDatepicker,
      showDatepicker1,
      show,
      show1,
      mode,
      mode1,
      onChange,
      onChange1,
      input,
      input2,
    };
  }
  console.log('firstmessage', showmessage);
  console.log('firstaddress', showaddress);

  const renderItem = ({item}) => {
    var timestamp = item.date_sent;
    var date = new Date(timestamp);
    // console.log('Date1', date.getTime());
    // console.log('Date', date);
    var timestamp1 = item.date;
    var date1 = new Date(timestamp1);
    // console.log('Date1', date.getTime());
    // console.log('Date', date1);
    return (
      <View>
        {item.type == 2 && (
          <View style={styles.item1}>
            <Text style={styles.title}>{item.body}</Text>
            <Text style={styles.title2}>
              {moment(date1).format('MMMM Do YYYY, h:mm')}
            </Text>
          </View>
        )}
        {item.type == 1 && (
          <View style={styles.item}>
            <Text style={styles.title1}>{item.body}</Text>
            <Text style={styles.title2}>
              {moment(date).format('MMMM Do YYYY, h:mm')}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity style={() => navigation.navigate('PrivacyPolicy')}>
          <Image source={arrowback} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {showaddress}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{}}>
            <Text style={{color: 'red', fontSize: 14}}>From</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              input.showDatepicker();
            }}
            title={'from date'}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: 80,
            }}>
            <Text style={{fontSize: 12}}>{textdate}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '28%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{}}>
            <Text style={{color: 'red', fontSize: 14}}>To</Text>
          </View>
          <TouchableOpacity
            onPress={input2.showDatepicker1}
            title={'to date'}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: 80,
            }}>
            <Text style={{fontSize: 12}}>{textdateto}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '25%',
            backgroundColor: 'tomato',
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            borderRadius: 3,
          }}>
          <Fontisto
            name="share-a"
            color={'white'}
            size={10}
            style={{marginLeft: 5}}
          />
          <TouchableOpacity onPress={() => pdfGenerate()}>
            <Text style={{color: 'white', marginLeft: 5}}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>
      {input.show && (
        <DateTimePicker
          testID="dateTimePicker1"
          value={input.datefrom}
          mode={input.mode}
          is24Hour={true}
          display="default"
          onChange={input.onChange}
        />
      )}
      {input2.show1 && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={input2.dateto}
          mode={input2.mode1}
          is24Hour={true}
          display="default"
          onChange={input2.onChange1}
        />
      )}

      {listitem == listitem && (
        <FlatList
          data={listitem}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      )}
      <Loading visible={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    width: '70%',
    backgroundColor: `#707070`,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
  item1: {
    width: '70%',
    backgroundColor: `#ff5656`,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'flex-start',
    marginLeft: '25%',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 16,
    color: 'white',
  },
  title2: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => {
  console.log('my redux data', state.auth);
  const {user} = state.auth;
  console.log(user, 'Usersss');
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {signupwithfb, signin, getpdf})(
  Message,
);
