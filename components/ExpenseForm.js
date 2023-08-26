import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { GlobalStyles } from '../constants/style';

const ExpenseForm = ({
	cancelHandler,
	isEditing,
	confirmHandler,
	selectedExpense,
}) => {
	const [inputValues, setInputValues] = useState({
		amount: {
			value: selectedExpense ? selectedExpense.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: selectedExpense
				? selectedExpense.date.toISOString().slice(0, 10)
				: '',
			isValid: true,
		},
		description: {
			value: selectedExpense ? selectedExpense.description.toString() : '',
			isValid: true,
		},
	});
	const inputChange = (inputIdentifier, enteredValue) => {
		setInputValues((currValues) => {
			return {
				...currValues,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	};

	const handleSubmit = () => {
		const expenseData = {
			amount: +inputValues.amount.value,
			date: new Date(inputValues.date.value),
			description: inputValues.description.value,
		};

		const amtIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amtIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert('Invalid input', 'Please Try Again');
			setInputValues((curInputVal) => {
				return {
					amount: { value: curInputVal.amount.value, isValid: amtIsValid },
					date: { value: curInputVal.date.value, isValid: dateIsValid },
					description: {
						value: curInputVal.amount.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}

		confirmHandler(expenseData);
	};

	const formIsInvalid =
		!inputValues.amount.value ||
		!inputValues.date.value ||
		!inputValues.description.value;

	return (
		<View style={styles.outerContainer}>
			<Text style={styles.title}>Your Expenses</Text>
			<View style={styles.innerContainer}>
				<Input
					label="Amount"
					inValid={!inputValues.amount.isValid}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputChange.bind(this, 'amount'),
						value: inputValues.amount.value,
					}}
					style={styles.rowInput}
				/>
				<Input
					label="Date"
					inValid={!inputValues.date.isValid}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputChange.bind(this, 'date'),
						value: inputValues.date.value,
					}}
					style={styles.rowInput}
				/>
			</View>
			<Input
				label="Description"
				inValid={!inputValues.description.isValid}
				textInputConfig={{
					multiLine: true,
					onChangeText: inputChange.bind(this, 'description'),
					value: inputValues.description.value,
				}}
			/>
			{formIsInvalid && (
				<Text style={styles.errorText}>
					Invalid Input Values. Please check your input data!
				</Text>
			)}
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
	errorText: {
		textAlign: 'center',
		color: GlobalStyles.colors.error500,
		margin: 8,
	},
});
