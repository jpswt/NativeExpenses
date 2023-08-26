import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/style';
import Button from '../components/Button';
import { ExpensesContext } from '../store/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/url';

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

	async function deleteHandler() {
		navigation.goBack();
		expensesCtx.deleteExpense(editedExpenseId);
		await deleteExpense(editedExpenseId);
	}

	function cancelHandler() {
		navigation.goBack();
	}
	async function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
			await updateExpense(editedExpenseId, expenseData);
		} else {
			const id = await storeExpense(expenseData);
			expensesCtx.addExpense({ ...expenseData, id: id });
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
