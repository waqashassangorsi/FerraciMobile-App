import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Picker} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
function useInput() {
  const [date, setDate] = useState(new Date(null));
  const [dateto, setDateto] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
  };
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || dateto;
    setShow(Platform.OS === 'ios');
    setDateto(currentDate);
  };
  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
    onChange1,
    dateto,
  };
}
const CheckSecreen = ({}) => {
  const input = useInput(new Date());
  const input2 = useInput(new Date());

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          onPress={input.showDatepicker}
          title={input.date.toLocaleDateString()}
        />
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

        <Button
          onPress={input2.showDatepicker}
          title={input2.dateto.toLocaleDateString()}
        />
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
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  console.log('my redux data', state.auth);
  const {user} = state.auth;
  console.log(user, 'Usersss');
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {})(CheckSecreen);
/////////////////////////////////////old secreen///////////////////////////////////////
