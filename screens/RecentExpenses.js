import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutPut from '../components/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/ExpenseContext';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
	const expenseCtx = useContext(ExpensesContext);
	const recentExpenses = expenseCtx.expenses.filter((expense) => {
		const today = new Date();
		console.log(today);
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date > date7DaysAgo;
	});

	return (
		<ExpensesOutPut
			expenses={recentExpenses}
			expensesPeriod={'Last 7 Days'}
			fallbackText="No expenses for last 7 days"
		/>
	);
};
export default RecentExpenses;

const styles = StyleSheet.create({});
