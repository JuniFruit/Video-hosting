import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './main/App';
import reportWebVitals from './main/reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
