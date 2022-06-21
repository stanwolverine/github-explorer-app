import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatExpiryDate } from '../../../../utils/dateUtils';
import { Colors } from '../../../../utils/Colors';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		paddingVertical: 20,
		marginBottom: 15,
		borderRadius: 5,
		borderColor: Colors.light,
		borderWidth: 1,
	},
	title: {
		marginBottom: 8,
		fontSize: 17,
		color: Colors.blueGrotto,
	},
	description: {
		marginBottom: 15,
	},
	attributes: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 10,
	},
	date: {
		fontSize: 12,
		color: Colors.gray,
	},
});

const SearchResultComponent = ({ item }) => {
	const { node } = item;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{node.name}</Text>

			<Text style={styles.description}>{node.descriptionHTML}</Text>

			<View style={styles.attributes}>
				<Text>Stars: {node.stargazers.totalCount}</Text>
				<Text>Forks: {node.forks.totalCount}</Text>
			</View>

			<Text style={styles.date}>{formatExpiryDate(node.updatedAt)}</Text>
		</View>
	);
};

export const SearchResult = memo(SearchResultComponent);
