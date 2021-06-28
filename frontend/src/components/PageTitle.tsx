/* eslint-disable prettier/prettier */
import { FC } from "react";

interface Props{
	title?:string;
}

export const PageTitle:FC<Props> = ({title}) =>(
	<div> 
		<h2 className="page-title__title">{title}</h2>
	</div>
);