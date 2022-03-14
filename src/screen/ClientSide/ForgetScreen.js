import React, { useState } from 'react';
import {
	Text,
	TextInput,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import colors from '../../styles/colors';
const CELL_COUNT = 4;

function ForgetScreen(props) {
	const [card, setCard] = React.useState(1);
	const [email, setEmail] = React.useState('ahmedraza1@gmail.com');
	const [password1, setPassword1] = React.useState('');
	const [password2, setPassword2] = React.useState('');

	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [CellOnLayoutHandler, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={[colors.orange, colors.red]}
				style={styles.header}
			>
				<Image
					style={styles.logo}
					source={require('../../assets/icons/barbery-W.png')}
				/>
			</LinearGradient>
			{card == 1 && (
				<Animatable.View animation="slideInUp" style={styles.footer}>
					<Text style={styles.textHeading}>Forget Password</Text>
					<Text style={styles.textPara}>
						Enter your email for the verification process we will send 4 digit
						code to your email.
					</Text>
					<Text style={styles.text}>Email</Text>
					<TextInput
						style={styles.textInput}
						placeholder={'e.g. abc@gmail.com'}
						maxLength={50}
						onChangeText={(text) => setEmail(text)}
						value={email}
					/>
					<LinearGradient
						colors={[colors.orange, colors.red]}
						style={[styles.button]}
					>
						<TouchableOpacity
							style={{ width: '100%', alignItems: 'center' }}
							onPress={() => setCard(2)}
						>
							<Text style={styles.textBtn}>Continue</Text>
						</TouchableOpacity>
					</LinearGradient>
				</Animatable.View>
			)}

			{card == 2 && (
				<Animatable.View animation="slideInUp" style={styles.footer}>
					<Text style={styles.textHeading}>Enter 4 Digit Code</Text>
					<Text style={styles.textPara}>
						Enter your 4 digit code that you received on your email.
					</Text>
					<CodeField
						ref={ref}
						{...CellOnLayoutHandler}
						value={value}
						onChangeText={setValue}
						cellCount={CELL_COUNT}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<Text
								key={index}
								style={[styles.cell, isFocused && styles.focusCell]}
								onLayout={getCellOnLayoutHandler(index)}
							>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						)}
					/>
					<LinearGradient
						colors={[colors.orange, colors.red]}
						style={[styles.button]}
					>
						<TouchableOpacity
							style={{ width: '100%', alignItems: 'center' }}
							onPress={() => {
								setCard(3);
								console.log(value);
							}}
						>
							<Text style={styles.textBtn}>Continue</Text>
						</TouchableOpacity>
					</LinearGradient>
				</Animatable.View>
			)}

			{card == 3 && (
				<Animatable.View animation="slideInUp" style={styles.footer}>
					<Text style={styles.textHeading}>Forget Password</Text>
					<Text style={styles.textPara}>
						Set the new password for your account so you can access your
						account.
					</Text>
					<Text style={styles.text}>Password</Text>
					<TextInput
						style={styles.textInput}
						placeholder={'*****'}
						maxLength={20}
						onChangeText={(text) => setPassword1(text)}
						secureTextEntry={true}
						value={password1}
					/>
					<Text style={styles.text}>Confirm Password</Text>
					<TextInput
						style={styles.textInput}
						placeholder={'*****'}
						maxLength={20}
						onChangeText={(text) => setPassword2(text)}
						secureTextEntry={true}
						value={password2}
					/>
					<LinearGradient
						colors={[colors.orange, colors.red]}
						style={[styles.button]}
					>
						<TouchableOpacity
							style={{ width: '100%', alignItems: 'center' }}
							onPress={() => props.navigation.navigate('Login')}
						>
							<Text style={styles.textBtn}>Reset Password</Text>
						</TouchableOpacity>
					</LinearGradient>
				</Animatable.View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		// backgroundColor: colors.red,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 10,
		marginHorizontal: 10,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.red,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textPara: {
		color: colors.dark,
		fontSize: 14,
		paddingHorizontal: 10,
		paddingBottom: 30,
		textAlign: 'justify',
	},
	textHeading: {
		color: colors.red,
		fontSize: 25,
		fontWeight: 'bold',
		paddingHorizontal: 10,
		paddingBottom: 20,
	},
	textforget: {
		color: colors.red,
		fontSize: 14,
		fontWeight: 'bold',
		paddingHorizontal: 20,
		paddingBottom: 15,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	textBtnSignUp: {
		color: colors.red,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	},
	logo: {
		width: 300,
		height: 300,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 30,
	},
	footer: {
		flex: 1.5,
		backgroundColor: colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	codeFieldRoot: {
		marginTop: 20,
		marginBottom: 30,
	},
	cell: {
		width: 50,
		height: 50,
		lineHeight: 50,
		fontSize: 30,
		borderWidth: 1,
		borderRadius: 15,
		elevation: 5,
		marginHorizontal: 20,
		textAlign: 'center',
		backgroundColor: colors.white,
		borderColor: colors.medium,
	},
	focusCell: {
		borderColor: colors.red,
	},
});

export default ForgetScreen;
