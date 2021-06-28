/* eslint-disable prettier/prettier */
import { FC } from "react";

interface Props{
	title?:string;
	titleClass?:string;
}

export const PageTitle:FC<Props> = ({title,titleClass}) =>(
	<div> 
		<h2 className={titleClass ? titleClass:"page-title__title"} >{title}</h2>
	</div>
);