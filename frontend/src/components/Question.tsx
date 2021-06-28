/* eslint-disable prettier/prettier */
import { QuestionData } from '../interface/QuestionData';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props{
	data:QuestionData;
	showContent?:boolean;
}

export const Question:FC<Props> = ({data, showContent = true}) => (
	<Link to={`questions/${data.questionId}`} className="question-page">
		<div className="question-page__title">
			{data.title}
		</div>
		{showContent && (
			<div className="question-page__content">
				{data.content.length > 50 ? `${data.content.substring(0, 50)}`:data.content}
			</div>
		)}
		<div className="question-page__time">
		{`Asked by ${data.userName} on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
		</div>
	</Link>
);
