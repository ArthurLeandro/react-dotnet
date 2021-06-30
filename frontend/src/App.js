/* eslint-disable prettier/prettier */
// @ts-nocheck
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom';
import { HeaderWithRouter as Header } from './components/Header';
import HomePage from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { SignInPage } from './components/SignInPage';
import { NotFoundPage } from './components/NotFoundPage';
// eslint-disable-next-line no-unused-vars
import index from './index.css';
import { QuestionPage } from './components/QuestionPage';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/Store';
const AskPage = lazy(() => import('./components/AskPage'));

function App() {
	const store = configureStore();
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="app">
					<Header />
					<Switch>
						<Redirect from="/home" to="/" />
						<Route exact path="/" component={HomePage} />
						<Route path="/search" component={SearchPage} />
						<Route path="/ask">
							<Suspense
								fallback={<div className="loader"> Loading Answer page ...</div>}
							>
								<AskPage />
							</Suspense>
						</Route>
						<Route path="/signin" component={SignInPage} />
						<Route path="/questions/:questionId" component={QuestionPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</div >
			</BrowserRouter >
		</Provider>
	);
}

export default App;
