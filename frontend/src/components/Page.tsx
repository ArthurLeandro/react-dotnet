/* eslint-disable prettier/prettier */
import { FC } from "react";
import { PageTitle } from "./PageTitle";

interface Props{
	title?:string;
}

export const Page:FC<Props> = ({title, children}) =>(
	<div className="page">
		<PageTitle title={title}></PageTitle>
		{children}
	</div>
);
