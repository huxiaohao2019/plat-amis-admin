import React, {PureComponent, Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  useParams,
  Route,
  Link,
  HashRouter
} from 'react-router-dom';
import APP from './App';

import mainPlatView from './plat/plat-view';

import {
  render as renderAmis,
  ToastComponent,
  AlertComponent,
  Button
} from 'amis';
import env from './common/amis-env';

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
        <Link to="/invoices/1">Expenses</Link>
        <Link to="/plat/1">plat 1</Link>
      </nav>
    </div>
  );
}
class Plat extends PureComponent {
  render() {
    return <h2>Plat 1</h2>;
  }
}

class Home extends PureComponent {
  render() {
    return <h2>Home</h2>;
  }
}

export default function PlatComponent() {
  let params = useParams();
  console.log(
    '🚀 ~ file: index.tsx ~ line 66 ~ PlatComponent ~ params',
    params
  );
  // return <h2>Invoice: {params.id}</h2>;
  mainPlatView.data={
    params:{
      id:params.id
    }
  }
  return renderAmis(
    // 这里是 amis 的 Json 配置。
    //  rootPage,
    // rootP2,
    mainPlatView,
    // {
    //   "type": "page",
    //   "title": "标题",
    //   "body": "Hello World!"
    // },
    {
      // props...
    },
    env
  );
}

class PlatComponent1 extends React.Component<any, any> {
  render() {
    let params = useParams();
    console.log(
      '🚀 ~ file: index.tsx ~ line 67 ~ PlatComponent ~ render ~ params',
      params
    );
    return renderAmis(
      // 这里是 amis 的 Json 配置。
      //  rootPage,
      // rootP2,
      mainPlatView,
      // {
      //   "type": "page",
      //   "title": "标题",
      //   "body": "Hello World!"
      // },
      {
        // props...
      },
      env
    );
  }
}

class App2 extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div></div>;
  }
}

ReactDOM.render(
  <HashRouter basename="/main">
    <Routes>
      <Route path="/" element={<APP />} />
      <Route path="expenses" element={<Home />} />
      <Route path="plat/:id" element={<PlatComponent />} />
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Plat />} />
      </Route>
    </Routes>
  </HashRouter>,

  document.getElementById('root')
);
