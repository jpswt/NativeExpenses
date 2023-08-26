import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutPut from '../components/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/ExpenseContext';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/url';
import Loading from '../components/Loading';

const RecentExpenses = () => {
	const [isLoading, setIsLoading] = useState(true);
	const expenseCtx = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpensesFunc() {
			setIsLoading(true);
			const expenses = await getExpenses();
			setIsLoading(false);
			expenseCtx.setExpenses(expenses);
		}
		getExpensesFunc();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

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
