/* eslint-disable prettier/prettier */
// @ts-nocheck
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { AskPage } from './components/AskPage';
import { SearchPage } from './components/SearchPage';
import { SignInPage } from './components/SignInPage';
import { NotFoundPage } from './components/NotFoundPage';
// eslint-disable-next-line no-unused-vars
import index from './index.css';
import { QuestionPage } from './components/QuestionPage';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<Switch>
					<Redirect from="/home" to="/" />
					<Route exact path="/" component={HomePage} />
					<Route path="/search" component={SearchPage} />
					<Route path="/ask" component={AskPage} />
					<Route path="/signin" component={SignInPage} />
					<Route path="/questions/:questionId" component={QuestionPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
