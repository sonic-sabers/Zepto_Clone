import React,
{
  Component,
  useState,
  useEffect,
  useRef
} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ViewPropTypes,
  Switch,
  Dimensions,
  // Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,

} from 'react-native';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { Hstack, KeyboardavoidingWrapper, Rewardcarousel } from './';
import { colors } from '../constants';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';


import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import * as localStorage from '../services/localStorage';

let dimensions = Dimensions.get('window');
// let imageHeight = Math.round((dimensions.width * 431) / 360);
// image: require('../assets/images/Sanp1.png'),

let imageWidth = dimensions.width;
let imageHeight = dimensions.height;
let itemwidth = imageWidth / 2 - 20

const { width, height } = Dimensions.get('window');

const Bondtext = ({ title, text }) => {
  return (
    <View style={{
      alignItems: 'center',
      marginTop: 15,
      flex: 1.
    }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'Roboto',
          color: colors.text2,
          marginTop: 5,
        }}>
        {title ? title : 'Coupon'}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: colors.text2,
          maxWidth: 100,

          marginTop: 5,
          textAlign: 'center',
          // marginLeft: 10,

        }}>
        {text ? text : '9.2%'}
      </Text>
    </View>
  )
}



let Buybutton = ({ currentUser, setBuymodal, setreturns }) => {
  const navigation = useNavigation();

  const Customagree = () =>
    Alert.alert(
      "",
      "You are eligible to Buy Bonds",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      {
        cancelable: false
      }
    );

  const falsemodel = () => {
    navigation.goBack()
    setBuymodal(false);
    navigation.navigate('Profilenavigator', {
      screen: 'Userprofile', params: {
        noback: 'true',
        // otherParam: 'anything you want here',
      }
    });
  }
  const falsereturns = () => {
    navigation.goBack()
    setreturns(false);
    navigation.navigate('Profilenavigator', {
      screen: 'Userprofile', params: {
        noback: 'true',
        // otherParam: 'anything you want here',
      }
    });
  }

  const createThreeButtonAlert2 = () =>
    Alert.alert(
      "",
      "You have to submit details in order to become eligible to Buy Bonds'",

      [

        {
          text: "See more bonds",
          onPress: () => navigation.goBack()
        },
        {
          text: "",
        },
        {
          text: "Submit Details",
          onPress: () => setreturns ? falsereturns() : setBuymodal ? falsemodel() : navigation.navigate('Profilenavigator', {
            screen: 'Userprofile', params: {
              noback: 'true',
            }
          }),
          style: "destructive",
        },
      ],
      {
        cancelable: false
      }
    );

  return (
    <TouchableOpacity
      onPress={() => !currentUser.firstName || !currentUser.dematNo || !currentUser.userEmail || !currentUser.lastName ? createThreeButtonAlert2() : Customagree()}
    >
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1.0 }}
        colors={['#0C7FF2', '#00BAF2']} style={{
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          marginTop: 20
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '800',
            fontFamily: 'Roboto',
            color: colors.white,
          }}>
          Buy Now
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}


export const BuyBond = ({ Buymodal, setBuymodal, Quantity, setQuantity, unitvalue, setreturns, minvalue, currentUser }) => {
  return (
    <>
      <Modal
        backdropOpacity={1}
        animationType="slide"
        transparent={true}
        visible={Buymodal}
        style={styles.modal}  

        onRequestClose={() => {
          setBuymodal(false);
        }}
      >
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            backfaceVisibility: 'green',
          }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity onPress={() => setBuymodal(false)}>
              <AntDesign name='closecircleo'
                size={25} color={colors.white} style={{
                  margin: 10,

                }} />
            </TouchableOpacity>
            <View style={[styles.modalView, { width: '100%', }]}>

              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '500',
                  fontFamily: 'Roboto',
                  color: colors.text2,
                  // marginTop: 5,
                  alignSelf: 'center',

                }}>
                Quantum/Bundle
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '800',
                  fontFamily: 'Poppins-Regular',
                  color: colors.text2,
                  marginVertical: 15,
                  alignSelf: 'center',
                  marginTop: 0,

                }}>
                {unitvalue} INR / Unit
              </Text>
              <Hstack centered styles={{
                alignSelf: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => Quantity <= minvalue ? alert(`${minvalue} is the minimun quantity`) : setQuantity(Quantity - 1)}
                  style={{
                    height: 35,
                    width: 35,
                    backgroundColor: colors.text2,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Entypo name='minus'
                    size={25} color={colors.white} />
                </TouchableOpacity>
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1.0 }}
                  colors={['#0C7FF2', '#00BAF2']} style={{
                    // padding: 30,
                    borderRadius: 70,
                    alignSelf: 'center',
                    // paddingHorizon?al: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: 130,

                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '800',
                      fontFamily: 'Roboto',
                      color: colors.white,
                      // marginTop: 5,

                    }}>
                    {Quantity}
                  </Text>
                </LinearGradient>
                <TouchableOpacity
                  onPress={() => setQuantity(Quantity + 1)}

                  style={{
                    height: 35,
                    width: 35,
                    backgroundColor: colors.text2,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,

                  }}>
                  <Ionicons name='add'
                    size={28} color={colors.white} />
                </TouchableOpacity>
              </Hstack>
              <View style={{
                alignItems: 'center',
                marginTop: 20

              }}>
                <Hstack>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      fontFamily: 'Roboto',
                      color: colors.text2,
                      marginRight: 5,

                    }}>
                    Payble Amount
                  </Text>
          
                </Hstack>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '800',
                    fontFamily: 'Roboto',
                    color: colors.primary,
                    // marginTop: 5,

                  }}>
                  {unitvalue * Quantity} INR
                </Text>
              </View>
              <Buybutton currentUser={currentUser} setBuymodal={setBuymodal} />

              <TouchableOpacity onPress={() => setreturns(true)}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    color: colors.text2,
                    alignSelf: 'center',
                    marginVertical: 10,

                  }}>
                  Check Returns
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
export const Bondreturns = ({ returns, setreturns, Quantity, setQuantity, unitvalue, r, data, yields, currentUser }) => {

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let slashindex = data.productMainMaturityIpModel[0].ipDateDigit.indexOf("/")

  var myloop = [];

  const [currentDate, setcurrentDate] = useState(date);
  const [Month, setMonth] = useState(month);
  const [Year, setYear] = useState(year);
  const [limit, setlimit] = useState(10);

  var currentDates = moment(dates);

  const [monthindex, setmonthindex] = useState(slashindex);

  const [lastdigit, setlastdigit] = useState(lastDigit);

  let start = Month - 1;
  let maxlimit = parseInt(data.tenureDigit);

  let gap = data.ipTypeDigit;

  var test = 2354;
  var lastDigit = maxlimit.toString().slice(-1);
  lastDigit = +(lastDigit);

  if (maxlimit < limit) {
    setlimit(maxlimit)
  }

  const si = unitvalue * Quantity * yields * data.tenureDigit / 100
  const dates = moment().date(24);

  var currentmo = moment(dates);

  let endDate = moment("2030-10-19", "YYYY-MM-DD");
  console.log('endDate', endDate)

  let index = 0;

  let divident, dateextract, datedigit;
  let dashindex = data.productMainMaturityIpModel[0].ipDateDigit.indexOf("-")
  let monthdigit = null;
  let addder = null;
  let customdate = null;
  dateextract = data.productMainMaturityIpModel[0].ipDateDigit.length
  datedigit = data.productMainMaturityIpModel[0].ipDateDigit.slice(dashindex + 1, dateextract)
  datedigit = +(datedigit);

  if (data.ipTypeName == 'Yearly') {
    addder = 12;
    divident = 1;
    monthdigit = data.productMainMaturityIpModel[0].ipDateDigit.slice(0, dashindex)
    monthdigit = +(monthdigit);
    let latestdate = moment().startOf('isoYear').add(monthdigit, 'month');
    console.log('monthdigit', monthdigit);
    endDate = moment(data.productMainMaturityIpModel[0].maturityDate, "DD-MMM-YYYY").add(1, 'Y');

    let monthOct = moment().add(monthdigit, 'month').startOf('month').add(datedigit-1, 'days');

    currentDates = monthOct
    console.log('monthOct', monthOct)
  }
  if (data.ipTypeName == 'Monthly') {
    endDate = moment(data.productMainMaturityIpModel[0].maturityDate, "DD-MM-YYYY").add(1, 'M');

    addder = 1;
    console.log('ata.ipTypeName ', data.ipTypeName);
    divident = 12;
    console.log('datedigit', datedigit)
    if (currentmo.subtract(1, 'm') > currentmo.startOf('month')) {
      customdate = currentmo.startOf('month').subtract(4, 'M').add(datedigit - 1, 'd');
      console.log(123)
    }
    customdate = currentmo.startOf('month').subtract(0, 'M').add(datedigit - 1, 'd');
    
    // customdate = currentmo.startOf('month').subtract(4, 'M').add(datedigit - 1, 'd');
    // .add(1, 'M').add(1 , 'Days')
    // .subtract(1, 'month')
    currentDates = customdate
    // endDate = moment(data.productMainMaturityIpModel[0].maturityDate, "DD-MMM-YYYY");
    console.log('currentDates', customdate)
    // setNewdate(customdate)
  }
  if (data.ipTypeName == 'Quarterly') {
    addder = 3;
    //   09-15/12-15/03-15/06-15 5,11,17
    let firstyieldmonth = data.productMainMaturityIpModel[0].ipDateDigit.slice(monthindex - 5, monthindex - 3);
    datedigit = +(data.productMainMaturityIpModel[0].ipDateDigit.slice(slashindex - 2, slashindex));

    monthdigit = +(moment(dates).add(1, 'month').month());


    let counter = 1;
    if (firstyieldmonth < monthdigit) {
      setmonthindex(monthindex + 6);


    }

    let latestdate = moment().startOf('isoYear').add(1, 'month');

    let monthOct = moment().startOf('isoYear').subtract(monthdigit, 'M').add(firstyieldmonth - 2, 'M').startOf('isoMonth').add(datedigit + 3, 'd')

    currentDates = monthOct

    divident = 4;
  }
  if (data.ipTypeName == 'Biyearly') {
    divident = 2;
  }

  for (let i = 1; i < data.tenureDigit; i = i + addder) {
    // console.log('divident', divident);
    // console.log('i', i);
    index++;
    const Int = unitvalue * Quantity * yields / 100

    var incMonth = moment(currentDates).add(i, 'M');
    if (incMonth < endDate) {
      // console.log(incMonth.format('DD/MM/YYYY') + "----" + Int);
      myloop.push(
        // console.log(incMonth.format('DD/MM/YYYY') + "----" + si / 12);
        <Hstack centered between styles={{
          marginHorizontal: 10,
          marginTop: 10,

        }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '900',
              fontFamily: 'Roboto',
              color: colors.text2,
              // marginTop: 5,
              // flex: 1,
              // alignSelf: 'center',
              width: 20

            }}>
            {index}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              fontFamily: 'Roboto',
              color: colors.text2,
              // marginTop: 5,
              flex: 1,
              alignSelf: 'center',
              textAlign: 'center',

            }}>
            {incMonth.format('DD/MM/YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              fontFamily: 'Roboto',
              color: colors.text2,
              // marginTop: 5,
              flex: 1,
              alignSelf: 'flex-end',
              textAlign: 'center',


            }}>
            {(Int / divident).toFixed(2)}

          </Text>
        </Hstack>
      )
    }
  }

  for (let i = 0; i < limit; i++) {
    let intrest = (unitvalue * r * i / 1200).toFixed(0);
    let principle = parseInt(unitvalue) + parseInt(intrest)
    // for (let j = 2; i < 3; j++) {
    // if (month) {
    //   setMonth(month + gap)
    // }

    // myloop.push(
    //   <Hstack centered between styles={{
    //     marginHorizontal: 10,
    //     marginTop: 10,

    //   }}>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         fontWeight: '900',
    //         fontFamily: 'Roboto',
    //         color: colors.text2,
    //         // marginTop: 5,
    //         // flex: 1,
    //         // alignSelf: 'center',
    //         width: 20

    //       }}>
    //       {i + 1}
    //     </Text>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         fontWeight: '700',
    //         fontFamily: 'Roboto',
    //         color: colors.text2,
    //         // marginTop: 5,
    //         flex: 1,
    //         alignSelf: 'center',
    //         textAlign: 'center',

    //       }}>
    //       {`${currentDate}/${Month}/${Year}`}
    //     </Text>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         fontWeight: '700',
    //         fontFamily: 'Roboto',
    //         color: colors.text2,
    //         // marginTop: 5,
    //         flex: 1,
    //         alignSelf: 'flex-end',
    //         textAlign: 'center',


    //       }}>
    //       {intrest}
    //       {/*      myloop.push(
    //     console.log(incMonth.format('DD/MM/YYYY') + "----" + si / 12);
    //     ) */}
    //     </Text>
    //   </Hstack>
    //   // <View key={i}>
    //   //     <Text style={{ textAlign: 'center', marginTop: 5 }} >{i}</Text>
    //   // </View>

    // );
    // }

  }
  return (
    <>
      <Modal
        backdropOpacity={1}
        animationType="slide"
        transparent={true}
        visible={returns}
        style={styles.modal}

        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setreturns(false);
        }}
      >
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            // backfaceVisibility: 'green',
          }}
        // 
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              onPress={() => setreturns(false)}
            >
              <AntDesign name='closecircleo'
                size={25} color={colors.white} style={{
                  margin: 10,

                }} />
            </TouchableOpacity>

            <View style={[styles.modalView, {
              width: '100%',
              maxHeight: imageHeight - 100,

            }]}>
              <ScrollView
                contentContainerStyle={{
                  // flex: 1,
                  // marginTop: 50,
                }}
                style={{
                  // flex: 1,
                  // paddingTop: 100,
                  // 
                }}>
                <Hstack centered between styles={{
                  marginHorizontal: 10,
                  marginTop: 10,

                }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      fontFamily: 'Roboto',
                      color: colors.text2,
                      // marginTop: 5,
                      width: 20

                    }}>
                    #
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      fontFamily: 'Roboto',
                      color: colors.text2,
                      flex: 1,
                      alignSelf: 'center',

                      textAlign: 'center',

                    }}>
                    Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      fontFamily: 'Roboto',
                      color: colors.text2,
                      textAlign: 'center',
                      flex: 1,
                      alignSelf: 'center',


                    }}>
                    Interest
                  </Text>
                </Hstack>
                {myloop}
              </ScrollView>
              {/* <TouchableOpacity style={{

                alignSelf: 'center',
                marginTop: 10
              }} onPress={() =>
                // limit == maxlimit ? alert('Max limit is :',maxlimit) :
                limit + 10 >= maxlimit ? setlimit(maxlimit + lastDigit) : setlimit(limit + 10)}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    color: colors.text2,
                    // marginTop: 5,

                  }}>
                  Show More
                </Text>
              </TouchableOpacity> */}

              {/* <Hstack centered styles={{
                                alignSelf: 'center',
                            }}>

                            </Hstack> */}
              <View style={{
                alignItems: 'center',
                marginTop: 20

              }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    color: colors.primary,
                    // marginTop: 5,

                  }}>
                  Selected Investment Amount
                </Text>
                <Hstack>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '700',
                      fontFamily: 'Roboto',
                      color: colors.text2,
                      marginRight: 5,

                    }}>
                    ({unitvalue * Quantity} INR)

                  </Text>

                </Hstack>

              </View>
              <Buybutton currentUser={currentUser} setreturns={setreturns} />

              {/*   <TouchableOpacity>
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1.0 }}
                  colors={['#0C7FF2', '#00BAF2']} style={{
                    // padding: 30,
                    borderRadius: 20,
                    // alignSelf: 'center',
                    // paddingHorizon?al: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: 50,
                    // width: 130,
                    padding: 20,
                    marginTop: 20
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '800',
                      fontFamily: 'Roboto',
                      color: colors.white,
                      // marginTop: 5,

                    }}>
                    Buy Now
                  </Text>
                </LinearGradient>
              </TouchableOpacity> */}

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}




export default function Bondcomponent(props, { }) {
  const [modalVisible, setModalVisible] = useState(false);
  // const [data, setdata] = useState({});
  const navigation = useNavigation();
  // console.log(props.item.productMainMaturityIpModel[0].maturityDate)
  return (
    <View >
      {/* <BondDetail modalVisible={modalVisible} setModalVisible={setModalVisible} name={data} setdata={setdata} /> */}

      <TouchableOpacity
        onPress={() => {
          // setModalVisible(true),
          //     setdata(props.item)
          navigation.navigate('Bondsdetails', {
            itemId: 86,
            data: props.item,
            setdata: props.item.cateName,
          });
        }}
        style={[{
          backgroundColor: colors.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          padding: 5,
          borderRadius: 10,
          // margin: 5,
          // height: 100,
          // marginHorizontal: 15,
          // zIndex: 400,
          overflow: 'hidden',
          paddingLeft: 10,
          paddingBottom: 10,
          // marginHorizontal: 20,
          marginVertical: 10
        },
        props.bottom ? { marginBottom: 0, } : { marginBottom: 0, }, props.style]}
      >
        <Hstack centered between>
          <View style={{
            borderColor: colors.lightblack,
            borderWidth: 1.5,
            borderRadius: 30,
            padding: 2,
            paddingHorizontal: 10,
          }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Roboto',
                color: '#00000090',
              }}>
              {props.item ? props.item.cateName : 'NBFC Housing'}
            </Text>
          </View>
          <View style={{
            backgroundColor: "#d4e1ed",
            // padding: 14,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 80,
            marginTop: -10,
            marginRight: -10,
            // overflow: 'hidden',
            // zIndex: 100,

          }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Roboto',
                color: '#7b9ebe',
              }}>
              {props.item ? props.item.ratingShort.slice(0, 3) : 'AA'}

            </Text>
          </View>
        </Hstack>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Roboto',
            color: '#00000099',
            // marginLeft: 5,
          }}>
          {props.item ?

            props.item.secName.length > 25 ?
              ` ${props.item.secName.toUpperCase().slice(0, 25)}...`
              : `${props.item.secName.toUpperCase()}`
            // + props.data.category.slice(0, 3) 
            : 'The South Indian Bank ...'}

        </Text>
        <View style={{
          borderColor: '#00000025',
          borderWidth: 0.9,
          // marginHorizontal: 5,
          borderRadius: 30,
          marginVertical: 8,
        }} />
        <Hstack between>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Roboto',
                color: '#00000099',
                // marginLeft: 5,
              }}>
              Min. Investment
            </Text>
            {/* {props.data ?
                            <Text
                                style={styles.miminv}>
                                {props.data.fv}
                            </Text>
                            :
                            <Text
                                style={styles.miminv}>
                                <MaterialCommunityIcons name='lock-outline' size={14} color='#eca032' />
                                {' '} Signup
                            </Text>
                        } */}
            <Text
              style={styles.miminv}>
              {props.item ?
                props.item.faceValue
                : '1000'
              } ₹
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Roboto',
                color: '#00000099',
                // marginLeft: 5,
              }}>
              Yield
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'Roboto',
                color: '#00000092',
                // marginLeft: 5,
                alignSelf: 'center',
              }}>
              {props.item ? props.item.yieldPrice : '10.5%'}%

            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Roboto',
                color: '#00000099',
                marginRight: 5,
              }}>
              Maturity Date
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'Roboto',
                color: '#00000092',
                marginRight: 5,
                alignSelf: 'center',
                maxWidth: 90,
                textAlign: 'center'
              }}>
              {props.item.productMainMaturityIpModel[0].maturityDate}
              {/* {props.data.productMainMaturityIpModel[0].maturityDate} */}

              {/* {props.data ?
                props.data.maturity.includes('Call')
                  ?
                  // props.data.maturity.replace('Call :', '')
                  // + props.data.maturity.slice(0, 1) ata.productMainMaturityIpModel[0].ipDateDigit.indexOf("/")
                  // + '20' +
                  // props.data.maturity.slice(7, 7) 
                  props.data.maturity.slice(7, props.data.maturity.length - 2)
                  + '20' +
                  props.data.maturity.slice(props.data.maturity.length - 2, props.data.maturity.length)
                  :

                  props.data.maturity.length == 9
                    ?
                    props.data.maturity.slice(0, 7)
                    + '20' +
                    props.data.maturity.slice(7, 11)
                    : props.data.maturity.slice(0, 11)
                : '8-Sep-2027'} */}
            </Text>
          </View>
        </Hstack>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  miminv: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#eca032',
    marginTop: 3,
    alignSelf: 'center',
  },
  modal: {
    justifyContent: 'flex-start',
    // backgroundColor: 'white',
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: Platform.OS === 'ios' ? 14 : 0,

    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: 'flex-start',

    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden',

  },
  modalView: {
    // margin: 20,
    backgroundColor: "#eeeeee",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})