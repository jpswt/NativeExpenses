import { StyleSheet, Text, View, TextInput } from 'react-native';
import { GlobalStyles } from '../constants/style';

const Input = ({ label, textInputConfig, style }) => {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiLine) {
		inputStyles.push(styles.inputMultiLine);
	}

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.label}>{label}</Text>
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
});
