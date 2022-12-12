export const Bondreturns = ({ returns, setreturns, Quantity, setQuantity, unitvalue, r, data }) => {
  // const [Quantity, setQuantity] = useState(10);
  // const   ShowCurrentDate=()=>{
  // console.log('data', data)
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //       Alert.alert(date + '-' + month + '-' + year);

  //      }

  // // let unitvalue = 949;
  
  var myloop = [];

  const [currentDate, setcurrentDate] = useState(date);
  const [Month, setMonth] = useState(month);
  const [limit, setlimit] = useState(10);
  // const [limit, setlimit, setlimit] = useState(10)

  // console.log(currentDate, Monscth, Year)

  let start = Month - 1;
  let maxlimit = parseInt(data.tenureDigit) / parseInt(data.ipTypeDigit);
  console.log('maxlimit', maxlimit);
  console.log('limit', limit);
  // const limit = 10;


  var test = 2354;
  var lastDigit = maxlimit.toString().slice(-1);
  lastDigit = +(lastDigit);
  // console.log(lastDigit);

  if (maxlimit < limit) {
      setlimit(maxlimit)
  }

  for (let i = 0; i < limit; i++) {
      let intrest = (unitvalue * r * i / 1200).toFixed(0);
      let principle = parseInt(unitvalue) + parseInt(intrest)
      // for (let j = 2; i < 3; j++) {

      myloop.push(
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
                  {i + 1}
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
                  {`${currentDate}/${Month}/${Year}`}
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
                  {intrest}
              </Text>
          </Hstack>
          // <View key={i}>
          //     <Text style={{ textAlign: 'center', marginTop: 5 }} >{i}</Text>
          // </View>

      );
      // }

  }