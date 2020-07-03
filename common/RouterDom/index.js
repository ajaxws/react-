/*
 * @Author: za-xielingjuan
 * @Date: 2018-07-10 14:38:45
 * @Description: 选择框组件
 * @Last Modified by: za-huoyanpeng
 * @Last Modified time: 2019-03-22 14:18:30
 * @ToDo: ''
 */

import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.array.isRequired
};

export default App;
