/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { QuestionData } from "../interface/QuestionData";
import { Page } from "./Page";
import { useState } from 'react';
import { getQuestion, postAnswer } from '../data/questions';
import { Fragment } from "react";
import { AnswerList } from "./AnswerList";
import { Form, minLength, required, Values } from './Form';
import { Field } from "./Field";

interface RouteParams {
	questionId:string;
}

export const QuestionPage:FC<RouteComponentProps<RouteParams>> = ({match}) => {
	const [question, setQuestion] = useState<QuestionData | null> (null);
	useEffect(()=>{
		const getQuestionAsync = async(questionId:number) =>{
			const question = await getQuestion(questionId);
			setQuestion(question);
		}
		if(match.params.questionId){
			const questionId = Number(match.params.questionId);
			getQuestionAsync(questionId);
		}
	}, [match.params.questionId]);
	const handleSubmit = async(values:Values)=>{
		const result = await postAnswer({
			questionId: question!.questionId,
			content: values.content,
			userName: 'Fred',
			created: new Date()
		});
		return { success: result ? true : false };
	};
  return(
			<Page page="page question-page__card" titleClass="question-page__title" title={question === null ? '' : question.title} > 
				<Fragment>
					{question ? question.content : null}
					<div className="question-page__asked">
						{`Asked by ${question?.userName} on
					${question?.created.toLocaleDateString()}
					${question?.created.toLocaleTimeString()}`}
					</div>
					<AnswerList data={question ? question.answers : undefined}/>
					<div className="question-form">
						<Form submitCaption="Submit your answer"
							validationRules={{
								content:[
									{validator:required},
									{validator:minLength,arg:50}
								]
							}}
							onSubmit={handleSubmit}
							failureMessage="There was a problem with your answer"
							successMessage="Your answer was successfully submitted"
						>
							<Field name="content" label="Your Answer" type="TextArea"/>
						</Form>
					</div>
				</Fragment>
			</Page>
	);
};