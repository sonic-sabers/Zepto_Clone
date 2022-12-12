import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	Securityscreen,
	Mobileverification,
	Profilescreen,
	Emailverification,
	AdvanceKYC,
	KYCwaiting,
	Addmoney,
	Appfeedback,
	Aboutus,
	Contactus,
	Orders,
	Profile,
	InvitenEarn,
	Profilemain,
	Userprofile,
	Demataccount,
	Bankdetails,
	HelpnSupport,
	Buybonds,


} from '../screens';
import HelpnSupportnavigator from './HelpnSupportnavigator';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import fetchService from '../services/fetchService';
import * as localStorage from '../services/localStorage';

const Stack = createStackNavigator();

export default function Profilenavigator({ userData }) {
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({ tabBarVisible: false });
	}, [navigation]);

	const [fetchingData, setFetchingData] = useState(false);
	const [Data, setData] = useState([]);
	restoringSession;
	var token = null;
	const [tokens, Settokens] = useState(null);
	React.useEffect(() => {
		let componentUnmounted = false;

		restoringSession()

		// Getorder();
		// setTimeout(() => {
		//   Getorder();
		// }, 2000);
		// Getproduct();
		return () => {
			componentUnmounted = true;
		};
	}, []);

	const restoringSession = async () => {

		let userData = await localStorage.get('userData');
		// console.log('userData1', userData);
		userData = JSON.parse(userData);
		let newtoken = userData.jwt;
		// console.log('Response profile', newtoken)
		// let token = userData.jwt
		token = userData.jwt;
		Settokens(token)

	};

	let finalsT = userData ? userData : tokens
	// console.log(finalsT)
	return (
		// <NavigationContainer independent>
		<Stack.Navigator

			screenOptions={{
				headerShown: false,
				tabBarStyle: { display: "none" },
			}}>
			<Stack.Screen name="ProfileScreen"
				children={() => <Profilescreen tokens={finalsT} />}
			/>
			<Stack.Screen options={{
				tabBarStyle: { display: "none" },
			}} name="Userprofile" component={Userprofile} />
			<Stack.Screen name="Profilemain" component={Profilemain} />
			<Stack.Screen name="Orders" children={() => <Orders tokens={finalsT} />} />
			<Stack.Screen name="Contactus" component={Contactus} />
			<Stack.Screen name="Aboutus" component={Aboutus} />
			<Stack.Screen name="Appfeedback" component={Appfeedback} />
			<Stack.Screen name="Addmoney" component={Addmoney} />
			<Stack.Screen name="KYCwaiting" component={KYCwaiting} />
			<Stack.Screen name="AdvanceKYC" component={AdvanceKYC} />
			<Stack.Screen name="Emailverification" component={Emailverification} />
			<Stack.Screen name="Mobileverification" component={Mobileverification} />
			<Stack.Screen name="Securityscreen" component={Securityscreen} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="InvitenEarn" component={InvitenEarn} />
			<Stack.Screen name="Demataccount" component={Demataccount} />
			<Stack.Screen name="Bankdetails" component={Bankdetails} />
			<Stack.Screen name="HelpnSupport" component={HelpnSupport} />
			<Stack.Screen name="HelpnSupportnavigator" component={HelpnSupportnavigator} />
			<Stack.Screen name="Buybonds" component={Buybonds} />
			{/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
		</Stack.Navigator>
		// </NavigationContainer>
	);
}
