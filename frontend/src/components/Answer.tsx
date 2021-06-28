/* eslint-disable prettier/prettier */
import { FC } from "react";
import { AnswerData } from '../interface/AnswerData';

interface Props{
	data:AnswerData;
}

export const Answer:FC<Props> = ({data}) => (
	<div className="answer">
		<div className="answer-content">
			{data.content}
		</div>
		<div className="answer-date">
			{`Answered by ${data.userName} on 
				${data.created.toLocaleDateString()}
				${ data.created.toLocaleTimeString()}`}
		</div>
	</div>
)