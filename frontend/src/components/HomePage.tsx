/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { getUnansweredQuestions } from '../data/questions';
import { getUnansweredQuestionsActionCreate } from '../store/Store';
import { QuestionData } from '../interface/QuestionData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { QuestionList } from './QuestionLIst';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppState } from '../store/Store';
const renderQuestion = (question:QuestionData) => <div>{question.title}</div>

interface Props extends RouteComponentProps {
	getUnansweredQuestions: () => Promise<void>;
	questions: QuestionData[] | null;
	questionsLoading: boolean;
}

export const HomePage:FC<Props> = ({history, questions, questionsLoading, getUnansweredQuestions}) =>{
	useEffect(() => {
		if(questions === null)
		  getUnansweredQuestions();
	}, [questions, getUnansweredQuestions]);
	const handleAskQuestionClick = () =>{
		history.push("/ask");
	};
	return (
		<Page title={"Unanswered Questions"}>
			<div className="home">
				<div className="home__display">
					<h2 className="page-title__title">Unanswered Question</h2>
					<button className="primary-button" onClick={handleAskQuestionClick}>Ask a Question</button>
				</div>
				{questionsLoading ? (<div className="home__loading">Loading...</div>):<QuestionList data={questions ||[] } />}
			</div>
		</Page>
	);
};


const mapStateToProps= (store: AppState) =>  {
	return {
		questions:store.questions.unanswered,
		questionsLoading:store.questions.loading
	}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>,) => {
	return {
		getUnansweredQuestions: () =>
		dispatch(getUnansweredQuestionsActionCreate()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);

