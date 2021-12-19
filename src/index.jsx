import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';

import { ToDo } from './components/ToDo';

import 'antd/dist/antd.css'
import './index.css';
import { ToastProvider } from 'react-toast-notifications';

const { Header, Footer, Content } = Layout;


const App = () => {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <ToastProvider>
        <Row>
          <Col span={12} offset={6} className="todo">
            <ToDo />
          </Col>
        </Row>
        </ToastProvider>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));