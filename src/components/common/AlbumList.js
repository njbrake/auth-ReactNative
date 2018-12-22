import React, { Component } from 'react';
import axios from 'axios';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import AlbumDetail from './AlbumDetail';
class AlbumList extends React.Component {
	state = { albums: [] };
	componentWillMount() {
		console.log('will mount');
		axios.get('http://rallycoding.herokuapp.com/api/music_albums').then(res => {
			console.log(res.data);
			this.setState({
				albums: res.data,
			});
		});
	}

	renderAlbums() {
		return this.state.albums.map(album => (
			<AlbumDetail key={album.title} album={album} />
		));
	}
	render() {
		return (
			<ScrollView style={styles.viewStyle}>{this.renderAlbums()}</ScrollView>
		);
	}
}

const styles = {
	viewStyle: {
		flex: 1,
	},
	textStyle: {
		fontSize: 20,
	},
};

export { AlbumList };
