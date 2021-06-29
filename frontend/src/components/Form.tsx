/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { createContext, FC, useState } from 'react';

export interface Values {
  [key: string]: any;
} 

interface Props{
	submitCaption?: string;
}

interface FormContextProps{
	values:Values;
	setValue?:(fieldName:string, value:any) => void;
}

export const FormContext = createContext<FormContextProps>({
	values:{},
});

export const Form:FC<Props> = ({submitCaption, children}) => {
	const [values, setValues] = useState<Values>({});
	return (
		<FormContext.Provider
			value={{
				values,
				setValue:(fieldName:string,value:any)=>{
					setValues({...values, [fieldName] :value});
				},
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