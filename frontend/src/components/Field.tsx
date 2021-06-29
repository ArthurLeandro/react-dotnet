/* eslint-disable prettier/prettier */
import { ChangeEvent, FC, useContext } from "react";
import { FormContext } from "./Form";

interface Props{
	name:string;
	label?:string;
	type?:'Text' | 'TextArea' | 'Password';
}

export const Field:FC<Props> = ({name,label, type='Text'})=>{
	const {setValue} = useContext(FormContext);
	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>	) =>{
		if(setValue){
			setValue(name, e.target.value);
		}
	};
	return(
		<FormContext.Consumer>
			{({values})=> (
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
							className="input-field input-field__textarea"
						/>
					)}
				</div>
			)}
		</FormContext.Consumer>
	);
};