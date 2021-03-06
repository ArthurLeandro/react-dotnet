/* eslint-disable prettier/prettier */
import { Page } from "./Page";
import { FC, lazy,Suspense,useEffect } from 'react';
import { Route } from "react-router-dom";
import { Form, required, minLength, Values, SubmitResult } from './Form';
import { Field } from './Field';
import { postQuestion, PostQuestionData } from '../data/questions';
import { QuestionData } from "../interface/QuestionData";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState, postQuestionActionCreator, clearPostedQuestionActionCreator } from "../store/Store";

interface Props {
postQuestion: (
	question: PostQuestionData,
	) => Promise<void>;
	postedQuestionResult?: QuestionData;
	clearPostedQuestion: () => void;
}

const AskPage:FC<Props> = ({postQuestion,postedQuestionResult,clearPostedQuestion}) => {
	useEffect(()=>{
		return function cleanUp(){
			clearPostedQuestion();
		};
	},[clearPostedQuestion]);
	const handleSubmit = (values:Values)=>{
		postQuestion({
			title: values.title,
			content: values.content,
			userName: "Fred",
			created: new Date()
		});
	};
	let submitResult: SubmitResult | undefined;
		if (postedQuestionResult) {
			submitResult = { success: postedQuestionResult !== undefined };
	}
	return (
		<Page title="Ask a question">
			<Form submitCaption="Submit Your Question" validationRules={{
				title:[
					{validator:required},
					{validator:minLength, arg:10}
				],
				content:[
					{validator:required},
					{validator:minLength,arg:50}
				],
			}}
				onSubmit={handleSubmit}
				submitResult={submitResult}
				failureMessage="There was a problem with your question"
				successMessage="Your question was successfully submitted"
			>
				<Field name="title" label="Title"></Field>
				<Field name="content" label="Content" type="TextArea"></Field>
			</Form>
		</Page>
		);
};

const mapStateToProps = (store: AppState) => {
	return { postedQuestionResult: store.questions.postedResult,};
};
const mapDispatchToProps = ( dispatch: ThunkDispatch<any, any, AnyAction>,) => {
	return {
		postQuestion: (question: PostQuestionData) =>
		dispatch(postQuestionActionCreator(question)),
		clearPostedQuestion: () =>
		dispatch(clearPostedQuestionActionCreator()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AskPage);

