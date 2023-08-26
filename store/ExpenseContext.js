import { createContext, useReducer } from 'react';

const dummyExpenses = [
	{
		id: 'e1',
		description: 'Pair of shoes',
		amount: 99.0,
		date: new Date('2023-8-23'),
	},
	{
		id: 'e2',
		description: 'Pair of pants',
		amount: 59.0,
		date: new Date('2023-6-14'),
	},
	{
		id: 'e3',
		description: 'Coffee',
		amount: 6.0,
		date: new Date('2023-2-5'),
	},
	{
		id: 'e4',
		description: 'Book',
		amount: 19.0,
		date: new Date('2023-3-22'),
	},
	{
		id: 'e5',
		description: 'Movies',
		amount: 19.0,
		date: new Date('2023-5-2'),
	},
	{
		id: 'e6',
		description: 'Pair of pants',
		amount: 59.0,
		date: new Date('2023-6-14'),
	},
	{
		id: 'e7',
		description: 'Coffee',
		amount: 6.0,
		date: new Date('2023-2-5'),
	},
	{
		id: 'e8',
		description: 'Book',
		amount: 19.0,
		date: new Date('2023-3-22'),
	},
	{
		id: 'e9',
		description: 'Movies',
		amount: 19.0,
		date: new Date('2023-5-2'),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload, id: id }, ...state];
		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpense];
			const updateItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updateItem;
			return updatedExpenses;
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
