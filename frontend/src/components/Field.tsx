/* eslint-disable prettier/prettier */
import { ChangeEvent, FC, useContext } from "react";
import { FormContext } from "./Form";

interface Props{
	name:string;
	label?:string;
	type?:'Text' | 'TextArea' | 'Password';
}

export const Field:FC<Props> = ({name,label, type='Text'})=>{
	const {setValue,touched,validate, setTouched} = useContext(FormContext);
	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>	) =>{
		if(setValue){
			setValue(name, e.target.value);
		}
		if(touched[name] && validate){
			validate(name);
		}
	};
	const handleBlur = () =>{
		if(setTouched){
			setTouched(name);
			if(validate){
				validate(name);
			}
		}	
	};
	return(
		<FormContext.Consumer>
			{({values, errors})=> (
				<div className="label-field__base">
					{label &&(
						<label htmlFor={name}> 
							{label}
						</label>
						)
					}
					{(type === 'Text' || type === 'Password') && (
						<input 
							type={type.toLowerCase()} 
							id={name} 
							value={
								values[name] === undefined ? '' : values[name]
							}
							onChange={handleChange}
							onBlur={handleBlur}
							className="input-field" 
						/>
					)}
					{type === 'TextArea' && (
						<textarea
							id={name}
							value={
								values[name] === undefined ? '' : values[name]
							}
							onChange={handleChange}
							onBlur={handleBlur}
							className="input-field__textarea input-field "
						/>
					)}
					{errors[name] && errors[name].length>0 && errors[name].map(error=>(
						<div className="input-error">
							{error}
						</div>
					))}
				</div>
			)}
		</FormContext.Consumer>
	);
};