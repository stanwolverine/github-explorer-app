import { StyleSheet } from 'react-native';

import { Colors } from '../../utils/Colors';

const styles = StyleSheet.create({
	safeAreaView: { flex: 1, backgroundColor: Colors.white },
	container: { flex: 1, paddingHorizontal: 30, paddingTop: 20 },
	title: { marginBottom: 20, fontSize: 24, color: Colors.navyBlue },
	searchInput: {
		backgroundColor: Colors.white,
		borderRadius: 40,
		height: 40,
		borderWidth: 1,
		borderColor: Colors.light,
		fontSize: 14,
		paddingVertical: 11,
		paddingHorizontal: 20,
	},
	list: { marginTop: 20 },
	listContentContainer: { paddingBottom: 40 },
	loadingWrapper: { padding: 150 },
	contentWrapper: { flex: 1, marginTop: 30 },
	foundItems: { color: Colors.black },
	labelWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	resultsPlaceholder: { color: Colors.gray },
});

export default styles;
