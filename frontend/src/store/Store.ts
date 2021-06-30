/* eslint-disable prettier/prettier */
import { Action, ActionCreator, applyMiddleware, combineReducers, createStore, Dispatch, Reducer, Store } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { getUnansweredQuestions, postQuestion, PostQuestionData } from "../data/questions";
import { QuestionData } from '../interface/QuestionData';

// eslint-disable-next-line prettier/prettier
interface QuestionState {
	readonly loading: boolean;
	readonly unanswered: QuestionData[] | null;
	readonly postedResult?: QuestionData;
}

interface GettingUnansweredQuestionsAction extends Action<'GettingUnansweredQuestions'> { }
interface GotUnansweredQuestionsAction extends Action<'GotUnansweredQuestions'> {
	questions: QuestionData[];
}
export interface PostedQuestionAction extends Action<'PostedQuestion'> {
	result: QuestionData | undefined;
}
export interface AppState {
	readonly questions: QuestionState;
}

export const getUnansweredQuestionsActionCreate: ActionCreator<
	ThunkAction<
		Promise<void>,
		QuestionData[],
		null,
		GotUnansweredQuestionsAction
	>
> = () => {
	return async (dispatch: Dispatch) => {
		const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
			type: 'GettingUnansweredQuestions'
		};
		dispatch(gettingUnansweredQuestionsAction);
		const questions = await getUnansweredQuestions();
		const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
			questions,
			type: 'GotUnansweredQuestions'
		};
		dispatch(gotUnansweredQuestionAction);
	};
};

export const postQuestionActionCreator: ActionCreator<
	ThunkAction<
		Promise<void>,
		QuestionData,
		PostQuestionData,
		PostedQuestionAction
	>
> = (question: PostQuestionData) => {
	return async (dispatch: Dispatch) => {
		const result = await postQuestion(question);
		const postedQuestionAction: PostedQuestionAction = {
			type: 'PostedQuestion',
			result
		};
		dispatch(postedQuestionAction);
	};
};

export const clearPostedQuestionActionCreator: ActionCreator<
	PostedQuestionAction
> = () => {
	const postedQuestionAction: PostedQuestionAction = {
		type: 'PostedQuestion',
		result: undefined,
	};
	return postedQuestionAction;
};

const initialQuestionState: QuestionState = {
	loading: false,
	unanswered: null
}

const questionReducer: Reducer<QuestionState, QuestionsActions> = (state = initialQuestionState, action) => {
	switch (action.type) {
		case 'GettingUnansweredQuestions': {
			return {
				...state,
				unanswered: null,
				loading: true
			};
		}
		case 'GotUnansweredQuestions': {
			return {
				...state,
				unanswered: action.questions,
				loading: false
			};
		}
		case 'PostedQuestion': {
			return {
				...state,
				unanswered: action.result
					? (state.unanswered || []).concat(action.result)
					: state.unanswered,
				postedResult: action.result
			};
		}
		default:
			neverReached(action);
	}
	return state;
};

const neverReached = (never: never) => {

};

const rootReducer = combineReducers<AppState>({
	questions: questionReducer
});

type QuestionsActions =
	| GettingUnansweredQuestionsAction
	| GotUnansweredQuestionsAction
	| PostedQuestionAction;


export function configureStore(): Store<AppState> {
	const store = createStore(
		rootReducer,
		undefined,
		applyMiddleware(thunk)
	);
	return store;
}

