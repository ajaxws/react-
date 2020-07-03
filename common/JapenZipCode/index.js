/*
 * @Author: za-zhouzhe
 * @Date: 2018-07-16 17:18:26
 * @Description: '日本邮编'
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-09-18 16:08:59
 * @ToDo: ''
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import classNames from 'classnames';
import axios from 'axios';

class JapenZipCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            status: 'default'
        };
    }
    componentDidMount() {}
    handleBlur = (e) => {
        let value = e.target.value;
        let result = this.validate(value);
        if (!result) {
            this.setState({ status: 'error' });
        } else {
            if (e.target.value.indexOf('-') <= 0) {
                this.setState({value: value.substr(0, 3) + '-' + value.substr(3, value.length - 3)});
            }
            this.setState({ status: 'success' });
            this.getAddress(value);
        }
    }
    getAddress = (value) => {
        axios.post('/api/foundation/postcode/queryAddress', {
            postcode: value.split('-').join('')
        }).then(res => {
            if (res.data.success) {
                let data = res.data.value || [];
                this.props.onAddress(data);
            }
        });
    }
    handleFocus = (e) => {
        let value = e.target.value;
        this.setState({value: value.split('-').join('')});
    }
    handleChange = (e) => {
        let re = /^[0-9]{0,7}$/;
        if (re.test(e.target.value)) {
            this.setState({value: e.target.value});
        }
    }
    validate = (value) => {
        if (value.length > 8) return false;
        let re = /^[0-9]{3}[-]{0,1}[0-9]{4}$/;
        if (!re.test(value)) {
            return false;
        }
        return true;
    }
    render() {
        let inputClass = classNames({
            'input-content': true,
            'has-icon': true,
            'has-error': this.state.status === 'error',
            'has-success': this.state.status === 'success',
            'has-loading': this.state.status === 'loading',
        });
        const { LANG } = this.props;
        return (
            <div className="Japen-zipcode">
                <label htmlFor="name">{LANG.zip_code || '郵便番号'}</label>
                <div className={inputClass}>
                    <Input
                        id="name"
                        autoComplete="off"
                        value={this.state.value}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

JapenZipCode.propTypes = {
    onAddress: PropTypes.func,
    LANG: PropTypes.object,
};

JapenZipCode.defaultProps = {
    onAddress: () => {}
};

export default connect(state => ({
    LANG: state.LANG,
}))(JapenZipCode);
