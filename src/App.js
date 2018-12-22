/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

import config from './config/keys';

class App extends Component {
	state = { loggedIn: null };
	componentWillMount() {
		firebase.initializeApp(config);
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		if (this.state.loggedIn === null) {
			return <Spinner size="large" />;
		} else if (this.state.loggedIn) {
			return (
				<Button onPress={() => firebase.auth().signOut()}> Log Out</Button>
			);
		} else {
			return <LoginForm />;
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default App;
