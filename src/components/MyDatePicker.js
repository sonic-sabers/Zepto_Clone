import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {propsFlattener} from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

const MyDatePicker = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //const [date1, setDate1] = useState('');
  const showDatePicker = () => {
    //console.log('hi');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    //  setDate1(moment(date).format('DD MM YYYY'));
    props.onDateChange(date);
    hideDatePicker();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 52,
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          //backgroundColor: '#fff',
          padding: 5,
          borderRadius: 20,
       //   marginRight: -10,
          justifyContent: 'space-between',
          flex: 1,
          flexDirection:'row'
        }}>
        <Text>
          {props.value
            ? moment(props.value).format('DD - MM - YYYY')
            : 'DD- MM - YYYY'}
        </Text>
        <CommunityIcon name="calendar-blank" size={21} color={colors.end} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        //  date={date}
      />
    </View>
  );
};

export default MyDatePicker;
