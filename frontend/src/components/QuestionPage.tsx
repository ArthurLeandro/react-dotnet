/* eslint-disable prettier/prettier */
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Page } from "./Page";

interface RouteParams {
	questionId:string;
}

export const QuestionPage:FC<RouteComponentProps<RouteParams>> = ({match}) => {
  return(
	  <Page title={match.params.questionId}></Page>
	);
};