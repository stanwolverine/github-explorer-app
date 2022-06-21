import React, { useCallback } from 'react';
import { SafeAreaView, StatusBar, View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';

import styles from './styles';

import { Colors } from '../../utils/Colors';
import { ListFooter } from './components/ListFooter';
import { SearchResult } from './components/SearchResult';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { searchRepos } from './api';

const _keyExtractor = (item) => item.node.id;

const Search = () => {
	const { searchText, setSearchText, loading, appending, data, error, fetchData, paginationEnded } =
		useSearchQuery(searchRepos);

	const _onEndReachedHandler = useCallback(
		({ distanceFromEnd }) => {
			if (distanceFromEnd > 0 && !loading && !appending) {
				fetchData(searchText, { append: true });
			}
		},
		[searchText, fetchData, loading, appending],
	);

	const _renderItem = useCallback(({ item }) => <SearchResult item={item} />, []);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<StatusBar backgroundColor='transparent' barStyle='dark-content' translucent={false} />

			<View style={styles.container}>
				<Text style={styles.title}>Search Most Stars Repos.</Text>

				<TextInput
					placeholder='Search...'
					value={searchText}
					placeholderTextColor={Colors.gray}
					onChangeText={setSearchText}
					style={styles.searchInput}
				/>

				{loading ? (
					<View style={styles.loadingWrapper}>
						<ActivityIndicator size='small' color={Colors.navyBlue} />
					</View>
				) : data.repositoryCount ? (
					<View style={styles.contentWrapper}>
						<Text style={styles.foundItems}>Results Found: {data.repositoryCount}</Text>

						<FlatList
							style={styles.list}
							contentContainerStyle={styles.listContentContainer}
							data={data.edges}
							bounces={false}
							initialNumToRender={20}
							onEndReachedThreshold={0.6}
							showsVerticalScrollIndicator={false}
							keyExtractor={_keyExtractor}
							onEndReached={paginationEnded ? null : _onEndReachedHandler}
							ListFooterComponent={<ListFooter loading={appending} isError={error} />}
							renderItem={_renderItem}
						/>
					</View>
				) : (
					<View style={styles.labelWrapper}>
						{error ? (
							<Text>Oops! Something went wrong. Try Again.</Text>
						) : (
							<Text style={styles.resultsPlaceholder}>Your search results will appear here</Text>
						)}
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Search;
