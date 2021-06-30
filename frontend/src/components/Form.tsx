/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { createContext, FC, useState } from 'react';

export interface Values {
  [key: string]: any;
} 

interface Props{
	submitCaption?: string;
	validationRules?:ValidationProp;
}

interface FormContextProps{
	values:Values;
	setValue?:(fieldName:string, value:any) => void;
	errors:Errors;
	validate?:(fieldName:string) => void ;
	touched:Touched;
	setTouched?:(fieldName:string) => void;
}

interface Validation{
	validator:Validator;
	arg?:any;
}

interface ValidationProp{
	[key:string]:Validation | Validation[];
}

export interface Errors {
	[key:string]:string[];
}

export interface Touched {
	[key:string]:boolean;
}

export const FormContext = createContext<FormContextProps>({
	values:{},
	errors:{},
	touched:{}
});

type Validator = (value:any, args?:any) => string;

export const required:Validator = (value:any): string =>{
	return value === undefined ||value === null ||value === '' ? 'This must be populated' :'';
};

export const minLength:Validator = ( value:any, length:number):string =>{
  return value && value.length< length ? `This must be at least ${length} character` : '';
};


export const Form:FC<Props> = ({submitCaption, children, validationRules}) => {
	const [values, setValues] = useState<Values>({});
	const[errors, setErrors] = useState<Errors>({});
	const[touched, setTouched] = useState<Touched>({});
	const validate = (fieldName:string):string[]=>{
		if(!validationRules||!validationRules[fieldName])
			return [];
		const rules=Array.isArray(validationRules[fieldName]) ? (validationRules[fieldName]as Validation[]) : ([validationRules[fieldName]] as Validation[]);
		const fieldErrors:string[] = [];
		rules.forEach(rule=>{
			const error = rule.validator(values[fieldName], rule.arg);
			if(error){
				fieldErrors.push(error);
			}
		});
		const newErrors = {...errors, [fieldName]:fieldErrors};
		setErrors(newErrors);
		return fieldErrors;
	};
	return (
		<FormContext.Provider
			value={{
				values,
				setValue:(fieldName:string,value:any)=>{
					setValues({...values, [fieldName] :value});
				},
				errors,
				validate,
				touched,
				setTouched:(fieldName:string)=>{
					setTouched({...touched, [fieldName]:true});
				}
			}}
		>
			<form noValidate={true}>
				<fieldset className="form-field">
				{children}
				<div className="form-background-field">
						<button className="primary-button" type="submit">{submitCaption}</button>
				</div>
				</fieldset>
			</form>
		</FormContext.Provider>
	);
};