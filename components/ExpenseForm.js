import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';

const ExpenseForm = ({
	cancelHandler,
	isEditing,
	confirmHandler,
	selectedExpense,
}) => {
	const [inputValues, setInputValues] = useState({
		amount: selectedExpense ? selectedExpense.amount.toString() : '',
		date: selectedExpense
			? selectedExpense.date.toISOString().slice(0, 10)
			: '',
		description: selectedExpense ? selectedExpense.description.toString() : '',
	});
	const inputChange = (inputIdentifier, enteredValue) => {
		setInputValues((currValues) => {
			return { ...currValues, [inputIdentifier]: enteredValue };
		});
	};

	const handleSubmit = () => {
		const expenseData = {
			amount: +inputValues.amount,
			date: new Date(inputValues.date),
			description: inputValues.description,
		};

		const amtIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amtIsValid || !dateIsValid || !descriptionIsValid) {
			Alert.alert('Invalid input', 'Please Try Again');
			return;
		}

		confirmHandler(expenseData);
	};

	return (
		<View style={styles.outerContainer}>
			<Text style={styles.title}>Your Expenses</Text>
			<View style={styles.innerContainer}>
				<Input
					label="Amount"
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputChange.bind(this, 'amount'),
						value: inputValues.amount,
					}}
					style={styles.rowInput}
				/>
				<Input
					label="Date"
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputChange.bind(this, 'date'),
						value: inputValues.date,
					}}
					style={styles.rowInput}
				/>
			</View>
			<Input
				label="Description"
				textInputConfig={{
					multiLine: true,
					onChangeText: inputChange.bind(this, 'description'),
					value: inputValues.description,
				}}
			/>
			<View style={styles.buttonContainer}>
				<Button style={styles.button} onPress={handleSubmit}>
					{isEditing ? 'Update' : 'Add'}
				</Button>
				<Button style={styles.button} mode="flat" onPress={cancelHandler}>
					Cancel
				</Button>
			</View>
		</View>
	);
};
export default ExpenseForm;

const styles = StyleSheet.create({
	outerContainer: {
		marginTop: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center',
	},
	innerContainer: {
		flexDirection: 'row',

		justifyContent: 'space-between',
	},
	rowInput: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 130,
		marginHorizontal: 8,
	},
});
