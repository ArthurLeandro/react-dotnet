/* eslint-disable prettier/prettier */
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Page } from "./Page";
import { QuestionData } from '../interface/QuestionData';
import { useState,useEffect } from 'react';
import { searchQuestions } from '../data/questions';
import { QuestionList } from "./QuestionLIst";

export const SearchPage:FC<RouteComponentProps> = ({location}) => {
	const [questions, setQuestions] = useState<QuestionData[]>([]);
	const searchParams = new URLSearchParams(location.search);
	const search = searchParams.get('criteria') || '';
	useEffect(()=>{
		const searchAsync = async(criteria:string)=>{
			const foundResults = await searchQuestions(criteria);
			setQuestions(foundResults);
		}
		searchAsync(search);
	},[search]);
	return(
		<Page title="Search results ">
			<div >
				<p className="results">
					for "{search}"
				</p>
			</div>
			<QuestionList data={questions}/>
		</Page>
	);
}