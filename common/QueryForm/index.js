/*
 * @Author: za-zhouzhe
 * @Date: 2018-07-12 11:14:14
 * @Description: '查询组件'
 * @Last Modified by: za-xudong
 * @Last Modified time: 2019-06-26 15:43:33
 * @ToDo: ''
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon } from 'antd';
import FormItemDom from '../FormItemDom';

class QueryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    componentDidMount() {
        this.setState({ show: this.props.show });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const valuesFilter = {};
                Object.keys(values).map(item => {
                    if (values[item]) {
                        valuesFilter[item] = values[item];
                    }
                });
                this.props.onSubmit(valuesFilter);
            }
        });
    }
    // 重置表单数据
    handleReset = () => {
        if (this.props.resetValues) {
            this.props.form.resetFields(this.props.resetValues);
        } else {
            this.props.form.resetFields();
        }
    }
    render() {
        const { max } = this.props;
        const { LANG } = this.props.state;
        const formLayout = 'vertical';
        return (
            <div>
                <Form layout={formLayout} className="former" onSubmit={this.handleSubmit}>
                    <FormItemDom formItemData={this.props.formItem} form={this.props.form} {...this.props} show={this.state.show} hidden />
                    <div className="button-group">
                        {
                            this.props.formItem && this.props.formItem.length > max ? (this.state.show ? <Button type="primary" onClick={() => this.setState({ show: false })}>{LANG.shrink || '收起'} ∧</Button> : <Button type="primary" onClick={() => this.setState({ show: true })}>{LANG.expand || '展开'} ∨</Button>) : ''
                        }
                        <Button type="primary" htmlType="submit">{LANG['btn_search'] || '検索'}</Button>
                        <Button type="default" onClick={this.handleReset}>{LANG['btn_reset_posonline'] || 'リセット'}</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

QueryForm.propTypes = {
    'form': PropTypes.object,
    'onSubmit': PropTypes.func,
    'formItem': PropTypes.array,
    'state': PropTypes.object,
    max: PropTypes.number,
    show: PropTypes.bool,
    resetValues: PropTypes.array
};
QueryForm.defaultProps = {
    'onSubmit': () => { },
    max: 20
};
const WrappedQueryForm = Form.create()(QueryForm);
export default WrappedQueryForm;
