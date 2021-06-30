/* eslint-disable prettier/prettier */
import { Page } from "./Page";
import { lazy,Suspense } from 'react';
import { Route } from "react-router-dom";
import { Form, required, minLength } from './Form';
import { Field } from './Field';

const AskPage = () => (
	<Page title="Ask a question">
		<Form submitCaption="Submit Your Question" validationRules={{
			title:[
				{validator:required},
				{validator:minLength, arg:10}
			],
			content:[
				{validator:required},
				{validator:minLength,arg:50}
			],
		}}>
			<Field name="title" label="Title"></Field>
			<Field name="content" label="Content" type="TextArea"></Field>
		</Form>
	</Page>
);

export default AskPage;