import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input } from './common';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: '',
	};

	onButtonPress() {
		const { email, password } = this.state;
		this.setState({ error: '' });
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(() => {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.catch(() => {
						this.setState({ error: 'Authentication Failed' });
					});
			});
	}
	render() {
		return (
			<Card>
				<CardSection>
					<Input
						placeholder="User@gmail.com"
						label="Email"
						onChangeText={email =>
							this.setState({
								email: email,
							})
						}
						value={this.state.email}
					/>
				</CardSection>
				<CardSection>
					<Input
						placeholder="password"
						label="Password"
						onChangeText={password =>
							this.setState({
								password: password,
							})
						}
						secureTextEntry
						value={this.state.password}
					/>
				</CardSection>
				<Text style={styles.error}> {this.state.error}</Text>
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>Log in </Button>
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	error: {
		fontSize: 20,
		color: 'red',
		textAlign: 'center',
	},
};

export default LoginForm;
