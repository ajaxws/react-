/*
 * @Author: za-zhouzhe
 * @Date: 2018-07-12 11:14:14
 * @Description: '查询组件'
 * @Last Modified by: za-xudong
 * @Last Modified time: 2019-07-31 10:22:41
 * @ToDo: ''
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon } from 'antd';
import FormItemDom from '../FormItemDom';
import './index.less';

class CommonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    componentDidMount() {
        if (this.props.show) {
            this.setState({ show: this.props.show });
        }
    }
    handleSubmit = (cb) => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const valuesFilter = {};
                Object.keys(values).map(item => {
                    // 去除空字符串数据
                    if (values[item]) {
                        valuesFilter[item] = values[item];
                    }
                });
                cb && cb(valuesFilter);
                // this.props.onSubmit(valuesFilter);
            }
        });
    }
    // 重置表单数据
    handleReset = async() => {
        if (this.props.resetValues) {
            this.props.form.resetFields(this.props.resetValues);
        } else {
            // if (this.props.resetCallBack) await this.props.resetCallBack();
            this.props.form.resetFields();
        }
    }
    render() {
        const { max, formLayout = 'vertical', col = 3, hideRequiredMark } = this.props;
        const { LANG } = this.props.state;
        const className = col === 3 ? 'col3' : 'col2';
        return (
            <div>
                <Form layout={formLayout} hideRequiredMark={hideRequiredMark} className={`query former ${className}`} onSubmit={this.handleSubmit}>
                    <FormItemDom formItemData={this.props.formItem} form={this.props.form} {...this.props} show={this.state.show} hidden />
                </Form>
            </div>
        );
    }
}

CommonForm.propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    formItem: PropTypes.array,
    state: PropTypes.object,
    max: PropTypes.number,
    show: PropTypes.bool,
    resetValues: PropTypes.array,
    resetCallBack: PropTypes.func,
    actionAlone: PropTypes.bool,
    formLayout: PropTypes.object,
    col: PropTypes.number,
    hideRequiredMark: PropTypes.bool,
};
CommonForm.defaultProps = {
    'onSubmit': () => { },
    state: {
        LANG: {}
    },
    max: 20
};
const WrappedCommonForm = Form.create()(CommonForm);
export default WrappedCommonForm;
