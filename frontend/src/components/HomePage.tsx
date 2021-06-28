/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { getUnansweredQuestions } from '../data/questions';
import { QuestionData } from '../interface/QuestionData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { QuestionList } from './QuestionLIst';

const renderQuestion = (question:QuestionData) => <div>{question.title}</div>

export const HomePage:FC<RouteComponentProps> = ({history}) =>{
	const[questions, setQuestions] = useState<QuestionData[] | null> (null);
	const[questionsLoading, setQuestionsLoading]=useState(true);
	useEffect(() => {
		const getUnansweredQuestionsAsync = async () => {
			const unansweredQuestions = await getUnansweredQuestions();
			setQuestions(unansweredQuestions);
			setQuestionsLoading(false);
		};
		getUnansweredQuestionsAsync();
	});
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