import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import APP from './App';

export function Expenses() {
  return (
    <main style={{padding: '1rem 0'}}>
      <h2>Expenses</h2>
    </main>
  );
}

export function Invoices() {
  return (
    <main style={{padding: '1rem 0'}}>
      <h2>Invoices</h2>
    </main>
  );
}

export function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}
      >
        <Link to="/invoices">Invoices</Link> |{' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

class Home extends PureComponent {
  render() {
    return <h2>Home</h2>;
  }
}

ReactDOM.render(
  <BrowserRouter basename='main2'>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Home />} />
      <Route path="main2" element={<Home />}>
        <Route path="expenses" element={<Expenses />} />
      </Route>
      <Route path="main2/invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById('root')
);
