import { AnswerData } from './AnswerData';

/* eslint-disable prettier/prettier */
export interface QuestionData {
	questionId: number;
	title: string;
	content: string;
	userName: string;
	created: Date;
	answers: AnswerData[];
}