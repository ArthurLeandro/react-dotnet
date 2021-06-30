/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { createContext, FC, FormEvent, useState } from 'react';

export interface Values {
  [key: string]: any;
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

export interface SubmitResult {
	success:boolean;
	errors?:Errors;
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

interface Props{
	submitCaption?:string;
	validationRules?:ValidationProp;
	onSubmit:(values:Values)=>Promise<SubmitResult> | void;
	submitResult?: SubmitResult;
	successMessage?:string;
	failureMessage?:string;
}

export const Form:FC<Props> = ({submitCaption, children, validationRules, onSubmit, submitResult, successMessage='Success', failureMessage='Something went wrong'}) => {
	const [values, setValues] = useState<Values>({});
	const[errors, setErrors] = useState<Errors>({});
	const[touched, setTouched] = useState<Touched>({});
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const validateForm = ()=>{
		const newErrors:Errors={};
		let haveError:boolean = false;
		if(validationRules){
			Object.keys(validationRules).forEach(fieldName=>{
				newErrors[fieldName] = validate(fieldName);
				if(newErrors[fieldName].length >0){
					haveError = true;
				}
			});
		}
		setErrors(newErrors);
		return !haveError;
	};
	const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		if(validateForm()){
			setSubmitting(true);
			setSubmitError(false);
			const result = await onSubmit(values);
			if(result === undefined)
				return;
			setErrors(result.errors || {});
			setSubmitError(!result.success);
			setSubmitting(false);
			setSubmitted(true);
		}
	};
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
	const disabled = submitResult? submitResult.success : submitting || (submitted && !submitError);
	const showError = submitResult? !submitResult.success: submitted && submitError;
	const showSuccess = submitResult? submitResult.success: submitted && !submitError;
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
			<form noValidate={true} onSubmit={handleSubmit}>
				<fieldset className="form-field"
					disabled={disabled}
				>
				{children}
				<div className="form-background-field">
						<button className="primary-button" type="submit">{submitCaption}</button>
						{showError && 
							<p className="form-message__failure">
								{failureMessage}
							</p>
						}
						{showSuccess	&&	
							<p className="form-message__success">
								{successMessage}
							</p>
						}
				</div>
				</fieldset>
			</form>
		</FormContext.Provider>
	);
};