import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/style';
import Button from '../components/Button';
import { ExpensesContext } from '../store/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';

//route prop provided by react navigation
const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;

	const isEditing = !!editedExpenseId;

	const selectedExpense = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	function deleteHandler() {
		navigation.goBack();
		expensesCtx.deleteExpense(editedExpenseId);
	}

	function cancelHandler() {
		navigation.goBack();
	}
	function confirmHandler(expenseData) {
		{
			isEditing
				? expensesCtx.updateExpense(editedExpenseId, expenseData)
				: expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				cancelHandler={cancelHandler}
				isEditing={isEditing}
				confirmHandler={confirmHandler}
				selectedExpense={selectedExpense}
			/>
			{isEditing ? (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteHandler}
					/>
				</View>
			) : null}
		</View>
	);
};
export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
