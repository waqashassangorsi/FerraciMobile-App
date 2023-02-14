import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Image,
  Pressable,
  Alert,
  Linking,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Loading} from '../../../components/Loading';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import PDFView from 'react-native-view-pdf';
import * as OpenAnything from 'react-native-openanything';
import colors from '../../../theme/colors';
import {useNavigation} from '@react-navigation/native';
const Message = ({user, route, getpdf}) => {
  const navigation = useNavigation();
  const [listitem, setlistitem] = useState([]);
  const [listingthread, setlistingthread] = useState([]);
  const [loading, setLoading] = useState(false);

  const {showmessage, showaddress} = route.params;
  const input = useInput(new Date());
  const input2 = useInput(new Date());
  const filter = useInput();
  const [textdate, settextdate] = useState();
  const [textdateto, settextdateto] = useState();
  const [datetimestamp, setdatetimestamp] = useState();
  const [datetimestampto, setdatetimestampto] = useState();

  const [pdfuri, setpdfuri] = useState();
  console.log('pdfuri', pdfuri);

  const pdfGenerate = async id => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append('text', JSON.stringify(listitem));
    const res = await getpdf();
    console.log('firstjson', res);
    if (res.data.status == true) {
      Linking.openURL(res.data.data);
      setLoading(false);
    } else {
      alert(res.data.message);
    }
  };

  // const generatePDF = async () => {
  //   try {
  //     const html = `
  //       <html>
  //      <body style= "background-image: url('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg');">
  //         ${listitem
  //           .map(line =>
  //             line.type == 2
  //               ? `
  //               <ul style="padding-left:0px">
  //                   <li  style="display:inline-block;clear:both;margin: 15px 15px 5px 15px;width:100%;">
  //                   <div style="background: #435F7A;display: inline-block;padding: 10px 15px;border-radius: 20px;width:50%;line-height: 130%;padding-bottom:25px !important">
  //                 <p style="color:#f5f5f5;">${line.body}</p>
  //                 <p style="color:#f5f5f5;">` +
  //                 moment(new Date(line.date)).format('MMMM Do YYYY, h:mm') +
  //                 `</p>

  //                  </div>
  //                  </li>
  //                 `
  //               : `
  //                   <li  style="display:inline-block;clear: both;margin: 15px 15px 5px 15px;width:100%;">
  //                   <div style="background: #F5F5F5;float:right;display: inline-block;padding: 10px 15px;border-radius: 20px;width: 50%;line-height: 130%;margin-right:30px;padding-bottom:25px  !important">
  //                   <p>${line.body}</p>

  //                   <p>` +
  //                 moment(new Date(line.date)).format('MMMM Do YYYY, h:mm') +
  //                 `</p>
  //                   </div></li></ul>
  //                  `,
  //           )
  //           .join('')}
  //           <div style="text-align:center;font-size:20px;color:red;left:0;right:0;margin:0 auto;position:fixed;bottom:0">
  //           <a href="https://printmymessages.com/"  >Print by https://printmymessages.com</a></div>
  //      </body>
  //       </html>
  //     `;
  //     const options = {
  //       html,
  //       fileName: `test`,
  //       directory: 'docs',
  //     };
  //     const file = await RNHTMLtoPDF.convert(options);

  //     Alert.alert('Success', `PDF saved to ${file.filePath}`);
  //     Linking.openURL('File://' + file.filePath);
  //     setpdfuri(file.filePath);
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //   }
  // };

  function useInput() {
    const [date, setDate] = useState(new Date('2022-01-01'));
    const [dateto, setDateto] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    console.log('date1', date);
    console.log('date2', dateto);
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('date');
    };

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      settextdate(moment(new Date(currentDate)).format('L'));
      console.log('checkdate', currentDate);
      const dt = Date.parse(currentDate);
      const converttimestamp = dt / 1;
      // setDate(converttimestamp);
      console.log('firstchecktimestamp', converttimestamp);
      // console.log('checkdate', datefrom);
      setdatetimestamp(converttimestamp);
    };
    const onChange1 = (event, selectedDate) => {
      const currentDate = selectedDate || dateto;
      setShow(Platform.OS === 'ios');
      setDateto(currentDate);

      settextdateto(moment(new Date(currentDate)).format('L'));
      const dt = Date.parse(currentDate);
      const converttimestamp = dt / 1;
      // setDateto(converttimestamp);
      setdatetimestampto(converttimestamp);
      // console.log('firstchecktimestampto', converttimestamp);
    };

    return {
      date,
      dateto,
      showDatepicker,
      show,
      mode,
      onChange,
      onChange1,
      input,
      input2,
    };
  }
  useEffect(() => {
    setLoading(true);
    filtermessage();
  }, []);
  const filtermessage = () => {
    setlistitem('');
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
          let obj = {};
          if (arr[i].type == 1) {
            obj['isme'] = 'No';
          } else {
            obj['isme'] = 'Yes';
          }

          const date = moment(arr[i].date).format('YYYY-MM-DD, h:m');

          obj['timestamp'] = arr[i].date;
          obj['date'] = date;
          obj['text'] = arr[i].body;
          obj['id'] = i;

          if (datetimestamp && datetimestampto) {
            if (
              arr[i].date >= datetimestamp &&
              arr[i].date <= datetimestampto
            ) {
              arr1.push(obj);
            }
          } else {
            arr1.push(obj);
          }
        }

        setlistitem(arr1);
      },
    );
  };
  const filterbutton = () => {
    if (!datetimestamp || !datetimestampto) {
      alert('Please select the date');
    } else {
      filtermessage();
    }
  };

  console.log('myallmessages', listitem);

  const renderItem = ({item}) => {
    console.log('first12345', item);

    return (
      <View>
        {item.isme == 'Yes' && (
          <View style={styles.item1}>
            <Text style={styles.title}>{item.text}</Text>
            <Text style={styles.title3}>{item.date}</Text>
          </View>
        )}
        {item.isme == 'No' && (
          <View style={styles.item}>
            <Text style={styles.title1}>{item.text}</Text>
            <Text style={styles.title2}>{item.date}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e6eaea'}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Ionicons
          name={'chevron-back'}
          size={24}
          color={colors.secondary}
          onPress={() => {
            navigation.goBack();
          }}
          style={{paddingTop: 4}}
        />

        <Text
          style={{
            color: 'black',
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
            <Text style={{color: '#435f7a', fontSize: 14}}>From</Text>
          </View>
          <TouchableOpacity
            onPress={input.showDatepicker}
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
            <Text style={{color: '#435f7a', fontSize: 14}}>To</Text>
          </View>
          <TouchableOpacity
            onPress={input2.showDatepicker}
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
            backgroundColor: '#435f7a',
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            borderRadius: 3,
            justifyContent: 'center',
          }}>
          <Fontisto name="share-a" color={'white'} size={10} style={{}} />

          <TouchableOpacity onPress={() => filterbutton()}>
            <Text style={{color: 'white', marginLeft: 5}}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}> */}
      <TouchableOpacity
        style={{
          height: 35,
          width: '30%',
          backgroundColor: '#435f7a',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 100,
          marginVertical: 10,
        }}
        onPress={() => {
          pdfGenerate();
        }}>
        <Text style={{color: 'white', marginLeft: 5}}>Export</Text>
      </TouchableOpacity>
      {/* </View> */}
      {input.show && (
        <DateTimePicker
          testID="dateTimePicker1"
          value={input.date}
          mode={input.mode}
          is24Hour={true}
          display="default"
          onChange={input.onChange}
        />
      )}
      {input2.show && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={input2.dateto}
          mode={input2.mode}
          is24Hour={true}
          display="default"
          onChange={input2.onChange1}
        />
      )}
      {/* <PDFView source={{uri: 'file://' + pdfuri}} /> */}
      <FlatList
        data={listitem}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* {listitem == listitem && (
        
      )} */}
      <Loading visible={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    width: '70%',
    backgroundColor: `#f5f5f5`,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
  item1: {
    width: '70%',
    backgroundColor: `#435f7a`,
    marginHorizontal: 16,
    marginVertical: 8,
    // alignItems: 'flex-start',
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
    color: 'black',
  },
  title2: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  title3: {
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
