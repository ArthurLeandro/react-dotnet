/* eslint-disable prettier/prettier */
import { QuestionData } from "../interface/QuestionData";
import { FC } from "react";
import { Question } from './Question';

interface Props{
	data:QuestionData[];
	renderItem?: (item:QuestionData) => JSX.Element;
}

export const QuestionList:FC<Props> = ({data, renderItem}) => {
	return (
		<ul className="question-list">
			{data.map(question => (
				<li 
					className="question-list__items" 
					key={question.questionId}>
						{renderItem ? renderItem(question) : <Question data={question}/>}
				</li>
			))}
		</ul>
	);
};