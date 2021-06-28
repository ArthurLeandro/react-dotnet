/* eslint-disable prettier/prettier */
import { FC } from "react";
import { PageTitle } from "./PageTitle";

interface Props{
	title?:string;
	titleClass?:string;
	page?:string;
}

export const Page:FC<Props> = ({title, titleClass, page,  children}) =>(
	<div className={page ? page : "page"}>
		<PageTitle title={title} titleClass={titleClass} ></PageTitle>
		{children}
	</div>
);
