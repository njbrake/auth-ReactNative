import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false,
	};

	onButtonPress() {
		const { email, password } = this.state;
		this.setState({ error: '', loading: true });
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginSuccess() {
		this.setState({ email: '', password: '', loading: false });
	}

	onLoginFail() {
		this.setState({ error: 'Authentication Failed', loading: false });
	}
	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		} else {
			return <Button onPress={this.onButtonPress.bind(this)}>Log in </Button>;
		}
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
				<CardSection>{this.renderButton()}</CardSection>
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
