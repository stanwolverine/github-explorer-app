import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	listFooterContainer: { height: 15 },
	listFooterLoadingContainer: { height: 60, alignItems: 'center', justifyContent: 'center' },
});

export const ListFooter = ({ loading, isError }) => {
	if (loading || isError) {
		return (
			<View style={styles.listFooterLoadingContainer}>
				{isError ? (
					<Text>Something went wrong</Text>
				) : (
					<ActivityIndicator size='small' color='rgb(32, 35, 38)' />
				)}
			</View>
		);
	}

	return <View style={styles.listFooterContainer} />;
};
