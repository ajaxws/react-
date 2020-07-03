/*
 * @Author: za-xielingjuan
 * @Date: 2018-07-10 14:38:45
 * @Description: 表单项统一管理组件
 * @Last Modified by: za-xudong
 * @Last Modified time: 2019-08-28 15:25:03
 * @ToDo: ''
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, DatePicker } from 'antd';
import SelectDom from '../SelectDom';
import ExpanBar from '../Expand2';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
class FormItemDom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getFormItems = (formItemData) => {
        const { form } = this.props;
        const { LANG } = this.props.state;
        const { getFieldDecorator } = form;
        return formItemData.map((item, index) => {
            let formItem;
            if (item.type === 'empty') {
                formItem = (
                    <FormItem
                        key={index}
                        className={`col-${item.col || 1}`}
                        // label={item.label}
                        // colon={item.colon}
                    />
                );
            } else {
                formItem = (
                    <FormItem
                        className={`col-${item.col || 1}`}
                        label={item.label || ''}
                        key={index}
                        colon={item.colon}
                    >
                        {getFieldDecorator(item.key, {
                            initialValue: item.initialValue,
                            rules: item.rules
                        })(
                            item.type === 'select' ? (
                                <SelectDom {...item.props} list={item.list} onChange={item.onChange} idKey={(item.options && item.options.keyNickName) || 'dictValue'} valueKey={(item.options && item.options.valueNickName) || 'dictValueName'} />
                            ) : item.type === 'search' ? (
                                <SelectDom showSearch disabled={item.disabled} notFoundContent={item.notFoundContent} showArrow={false} filterOption={false} list={item.list} onChange={item.onChange} onSearch={item.onSearch} idKey={(item.options && item.options.keyNickName) || 'dictValue'} valueKey={(item.options && item.options.valueNickName) || 'dictValueName'} />
                            ) : item.type === 'multipleSelect' ? (
                                <SelectDom list={item.list} onChange={item.onChange} mode="multiple" idKey={(item.options && item.options.keyNickName) || 'dictValue'} valueKey={(item.options && item.options.valueNickName) || 'dictValueName'} />
                            ) : item.type === 'date' ? (
                                <DatePicker {...item.props} getCalendarContainer={trigger => trigger.parentNode} />
                            ) : item.type === 'render' ? (
                                item.renderDom
                            ) : item.type === 'textarea' ? <TextArea {...item.props} /> : (
                                <Input onBlur={e => item.onBlur && item.onBlur(e)} placeholder={item.props && item.props.disabled ? '' : item.placeHolder || LANG['text_input']} {...item.props} />
                            )
                        )}
                    </FormItem>
                );
            }
            return formItem;
        });
    }

    render() {
        let { max, formItemData, show, hidden } = this.props;
        const { LANG } = this.props.state;
        let showItemData = [];
        let hiddenItemData = [];
        if (hidden) {
            max = Math.ceil(max / 3) * 3;
            showItemData = formItemData.slice(0, max);
            hiddenItemData = formItemData.slice(max);
        } else {
            showItemData = formItemData;
        }
        return (
            <div>
                {
                    this.getFormItems(showItemData)
                }
                {
                    hiddenItemData.length ? <ExpanBar LANG={LANG} show={show}>{this.getFormItems(hiddenItemData)}</ExpanBar> : ''
                }
            </div>
        );
    }
}

FormItemDom.propTypes = {
    formItemData: PropTypes.array,
    form: PropTypes.object,
    state: PropTypes.object,
    max: PropTypes.number,
    show: PropTypes.bool,
    hidden: PropTypes.bool
};

export default FormItemDom;
