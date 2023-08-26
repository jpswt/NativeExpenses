import { StyleSheet, Text, View, TextInput } from 'react-native';
import { GlobalStyles } from '../constants/style';

const Input = ({ label, textInputConfig, style, inValid }) => {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiLine) {
		inputStyles.push(styles.inputMultiLine);
	}

	if (inValid) {
		inputStyles.push(styles.inValidInput);
	}

	return (
		<View style={[styles.container, style]}>
			<Text style={[styles.label, inValid ? styles.inValidLabel : null]}>
				{label}
			</Text>
			<TextInput style={inputStyles} {...textInputConfig} />
		</View>
	);
};
export default Input;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 4,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		padding: 4,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
	},
	inputMultiLine: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	inValidLabel: {
		color: GlobalStyles.colors.error500,
	},
	inValidInput: {
		backgroundColor: GlobalStyles.colors.error50,
	},
});
