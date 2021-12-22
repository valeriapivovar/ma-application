import React from 'react';
import ReactDOM from 'react-dom';
import {Layout, Row, Col} from 'antd';

import {ToDo} from './components/ToDo';
import TodoistApi from './helpers/TodoistApi';

import './style.css';
import 'antd/dist/antd.css'
import {ToastProvider} from 'react-toast-notifications';

const {Header, Footer, Content} = Layout;


class App extends React.Component {

    constructor(props) {
        super(props);
        const Todos = new TodoistApi();
        this.state = {
            list: []
        }
        Todos.getTasksList().then((response) => {
            const mappedList = response.data.map(item => {
                item.checked = false;
                item.edited = false;
                return item;
            });
            this.setState({
                list: mappedList
            })
        })
    }

    render() {
        return (
            <Layout>
                <Header></Header>
                <Content>
                    <ToastProvider>
                        <Row>
                            <Col span={12} offset={6} className="todo">
                                <ToDo list={this.state.list}/>
                            </Col>
                        </Row>
                    </ToastProvider>
                </Content>
                <Footer></Footer>
            </Layout>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));