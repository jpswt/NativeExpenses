import { StyleSheet, View, Text, FlatList } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/style';

const ExpensesOutPut = ({ expenses, expensesPeriod, fallbackText }) => {
	let content = <Text style={styles.infoText}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}

	return (
		<View style={styles.container}>
			<ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
			{content}
		</View>
	);
};
export default ExpensesOutPut;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 20,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32,
	},
});