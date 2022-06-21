import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Colors } from '../../utils/Colors.js';
import { loginWithGithub } from './api.js';

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
	icon: { marginBottom: 30, width: 60, height: 60 },
	loginBtn: {},
	login: { color: Colors.link, fontSize: 16 },
});

const LoginScreen = ({ login }) => {
	const handleLoginPress = async () => {
		try {
			const { accessToken } = await loginWithGithub();

			if (accessToken) {
				login(accessToken);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/ic_github.png')} style={styles.icon} />

			<TouchableOpacity onPress={handleLoginPress} style={styles.loginBtn}>
				<Text style={styles.login}>Login with Github</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoginScreen;
