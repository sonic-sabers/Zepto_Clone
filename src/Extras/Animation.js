import React, { useState, } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,

  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hstack, KeyboardavoidingWrapper } from '../../components';
import fetchService from '../../services/fetchService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import * as onboardingstyle from './Onboardingscreen';

const Styledtextinput = (props) => {
  const [hidePass, setHidePass] = React.useState(true);
  return (
    <View>
      <Text
        style={styles.customstyle}>
        {props.title}
      </Text>
      <View style={styles.inputstyle}>
        {!props.MaterialCommunityIcons ? <FontAwesome name={props.icon} size={20} color={colors.inputs} style={{
          marginBottom: -10
        }} /> :
          <MaterialCommunityIcons name={props.icon} size={25} color={colors.inputs} style={{
            marginBottom: -10
          }} />}
        <Text
          style={styles.countrycode}>+91 -</Text>
        <TextInput
          style={{
            // marginLeft: 5,
            fontWeight: '400',
            fontSize: 25,
            color: '#caf0f8',
            marginBottom: -10,
            flex: 1,
          }}
          placeholder={props.lable}
          placeholderTextColor={colors.white5}
          autoCapitalize="none"
          {...props}
        />
        {props.password &&
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={17}
            color="#caf0f8"
            onPress={() => setHidePass(!hidePass)}
          />}
      </View>
      <Hstack between>
        {props.error ? (
          <Text
            style={styles.errortext}>
            {props.error}
          </Text>
        ) : (
          <Text
            style={styles.errortext}></Text>
        )}
        {props.password &&
          <TouchableOpacity
            onPress={() => Alert.alert('Navigating to Forget password screen')}
          >
            <Text
              style={styles.forgettext}
            >
              Forget Password
            </Text>
          </TouchableOpacity>
        }
      </Hstack>
    </View>
  )
}


export default function Loginscreen() {
  const [Error, setError] = useState('')
  const navigation = useNavigation();
  const [Loading, setLoading] = React.useState("");
  console.log(onboardingstyle)
  const UserInfo = {
    mobile: '',
  };

  const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
  const validationSchema = Yup.object({
    mobile:
      Yup.string()
        .trim()
        .matches(regex, 'This field must be Phone number')
        .min(10, 'Minimum 10 characters is required')
        .required('Required!'),
  });


  const sendUserOtp = async (values) => {
    if (!values.mobile || values.mobile.trim() === '') {
      Alert.alert('Error', 'Please Enter Mobile No', [{ text: 'Okay' }]);
      return;
    }
    try {
      setFetchingData(true);
      setLoading(true);
      const response = await fetchService.sentUserOtp(values.mobile);
      setFetchingData(false);
      setLoading(false);
      if (!response.status) {
        alert(response.msg)
      }
      if (response.status) {
        navigation.navigate('Otpscreen', {
          mobile: values.mobile,
        });
        setOtpPage(true);
      } else {
        setError(response.msg);
      }
    } catch (error) {
      setFetchingData(false);
    }

  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={['#0C7FF2', '#0CBBF2']} style={{
          flex: 1,
          padding: 10,

        }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Onboardingscreen', {
                status: 'back',
              })}
            style={styles.backbutton}>
            <Octicons name='arrow-left'
              size={25} color={colors.primary} />
          </TouchableOpacity>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text
              style={styles.hitext}>
              Hi There
            </Text>
            <Text
              style={onboardingstyle.styles.hitext}>
              Log In Here
            </Text>
          </View>

          <Formik
            initialValues={UserInfo}
            onSubmit={(values, formikActions) => {
              sendUserOtp(values);
              setTimeout(() => {
                formikActions.resetForm();
                formikActions.setSubmitting(false);
              }, 4000);
            }}
            validationSchema={validationSchema}>
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              {
              }
              const { mobile } = values;
              return (
                <>
                  <Styledtextinput
                    // onChangeText={setmobile}
                    placeholderTextColor={colors.white5}
                    title='Enter your Phone Number'
                    placeholder='00000 00000'
                    value={mobile}
                    autoCapitalize="none"
                    icon='phone'
                    maxLength={10}
                    keyboardType='numeric'
                    MaterialCommunityIcons
                    error={touched.mobile && errors.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    selectionColor={colors.white}
                  />
                  <TouchableOpacity
                    submitting={isSubmitting}
                    onPress={handleSubmit}
                    style={styles.otpbutton}>
                    {Loading ?
                      <ActivityIndicator />
                      : <Text
                        style={styles.ActivityIndicator}>
                        Send OTP
                      </Text>}
                  </TouchableOpacity>

                </>
              );
            }}
          </Formik>

          <View style={{

            margin: 40,
          }} />
        </LinearGradient>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  errortext: {
    color: 'red',
    fontSize: 13.5,
    marginBottom: -10,
    marginLeft: 11,
  },
  backbutton: {
    backgroundColor: colors.white,
    height: 36,
    width: 36,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgettext: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  inputstyle: {
    flexDirection: 'row',
    width: '100%',
    // height: 40,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: colors.inputs,
    alignItems: 'center',
    marginTop: -10,
  },
  customstyle: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#edf2f4',
    marginTop: 10,
  },
  countrycode: {
    color: '#fff',
    fontSize: 25,
    marginBottom: -10,
    marginLeft: 5,
    fontWeight: '400',
  },
  hitext: {
    fontSize: 54,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 10,
  },
  otpbutton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 20,
    marginTop: 20,
    height: 60,
  },
  ActivityIndicator: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: colors.primary
  }

})