/* eslint-disable prettier/prettier */
import { FC } from 'react';
import { AnswerData } from '../interface/AnswerData';
import { Answer } from './Answer';

interface Props {
	data: AnswerData[] | undefined;
}

export const AnswerList:FC<Props> = ({data})=>{
	return(
		<ul className="answer-list-page">
			{data ? data.map(answer =>(
				<li className="answer-list" key={answer.answerId}>
					<Answer data={answer}/>
				</li>
			)) : <li>Loading responses ...</li>}
		</ul>
	);
}

