import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutPut from '../components/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/ExpenseContext';

const AllExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	console.log(expensesCtx);
	return (
		<ExpensesOutPut
			expenses={expensesCtx.expenses}
			expensesPeriod={'Total'}
			fallbackText="No expenses found!"
		/>
	);
};
export default AllExpenses;

const styles = StyleSheet.create({});
