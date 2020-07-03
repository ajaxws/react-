/*
 * @Author: 蓝文怡
 * @Date: 2019-08-03 10:26:16
 * @Description: 表单输入管理组件 [功能相关]
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2020-02-03 21:33:25
 */

import React, { Component, Fragment } from 'react';
import { oneOf, oneOfType, arrayOf, shape, func, bool, string, any, object, number } from 'prop-types';
import { Select, Input, DatePicker, Icon, Button, Checkbox, Radio, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import { connect } from 'react-redux';
import './style';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Upload from '../Upload/Upload';
// import InputNumber from '../InputNumber';

const { RangePicker } = DatePicker;

class FormItemElement extends Component {
    inputRef = React.createRef()

    render() {
        const {
            type,
            LANG,
            dispatch,
            elementProps = {},
            ...formProps
        } = this.props;
        const disabled = _.get(elementProps, 'disabled') ||
            _.get(formProps, 'disabled');
        return (<div
            className={clsx(
                'form-item-element',
                disabled && 'form-item-element-disabled',
            )}
        >
            {this._renderContent()}
        </div>);
    }

    _renderContent() {
        const {
            type,
            LANG,
            dispatch,
            elementProps = {},
            elementConfig = {},
            ...formProps
        } = this.props;

        if (type === 'select') {
            return (<Select
                placeholder={LANG.please_select || '選択してください'}
                {...elementProps}
                {...formProps}
            >
                {this._renderSelectorOptions()}
            </Select>);
        }
        if (type === 'date') {
            return <DatePicker format="YYYY-MM-DD" placeholder="選択してください" {...elementProps} {...formProps} />; // todo: lang
        }
        if (type === 'rangeDate') {
            return <RangePicker format="YYYY-MM-DD" placeholder="選択してください" {...elementProps} {...formProps} />; // todo: lang
        }
        if (type === 'textArea') {
            return (<TextArea
                placeholder={LANG.text_input || '内容を入力してください'}
                {...elementProps}
                {...formProps}
            />);
        }
        if (type === 'checkboxGroup') {
            return (<Checkbox.Group {...elementProps} {...formProps}>
                {this._renderCheckBoxs()}
            </Checkbox.Group>);
        }
        if (type === 'radioGroup') {
            return (<Radio.Group {...elementProps} {...formProps}>
                {this._renderRadios()}
            </Radio.Group>);
        }
        if (type === 'fileList') {
            return (<Upload
                action="/api/claim/claim/uploadDeviceImage"
                uploadData={this.getUploadData}
                {..._.pick(elementConfig, ['max', 'maxSize', 'placeText'])}
                {...elementProps}
                {...formProps}
            />);
        }
        if (type === 'imageList') {
            return (<Upload
                uploadData={this.getUploadData}
                type="image"
                {..._.pick(elementConfig, ['max', 'maxSize', 'placeText'])}
                {...elementProps}
                {...formProps}
            />);
        }
        if (type === 'number') {
            const addonAfter = _.get(this.props, ['elementProps', 'addonAfter']);
            const maxNumLength = _.get(this.props, 'elementProps.maxNumLength');
            return (<div className="comp-input-number">
                <InputNumber
                    ref={this.inputRef}
                    placeholder={LANG.text_input}
                    onCompositionStart={this.onCompositionStart}
                    {...elementProps}
                    {...formProps}
                    maxLength={maxNumLength && Math.floor((4 * maxNumLength - 1) / 3)}
                    onChange={this.onInputNumberChange}
                />
                {addonAfter && <span className="ant-input-group-addon">{LANG.jp_yen || '円'}</span>}
            </div>);
        }
        if (type === 'richText') {
            return (<ReactQuill
                modules={{ toolbar: null }}
                {...elementProps}
                {...formProps}
                value={formProps.value || '<p> </p>'}
                readOnly={elementProps.disabled}
            />);
            // return <BraftEditor placeholder={LANG.text_input || '内容を入力してください'} language="jpn" controls={[]} {...elementProps} {...formProps} />;
        }

        return <Input placeholder={LANG.text_input} {...elementProps} {...formProps} />;
    }

    onInputNumberChange = (v) => {
        const onChange = this.props.onChange;
        const maxNumLength = _.get(this.props, 'elementProps.maxNumLength');
        if (!onChange) return;
        if (!_.isNumber(v) && maxNumLength) {
            onChange(v && this.toHalfCharNum(v.substr(0, maxNumLength)));
        } else {
            onChange(v);
        }
    }

    getUploadData = (file) => {
        const fileType = _.get(this.props, ['elementProps', 'fileType']);
        const fileTypeEnum = _.get(this.props, ['elementProps', 'fileTypeEnum']);
        const refNo = _.get(this.props, ['elementProps', 'refNo']);
        return _.omitBy({
            refNo,
            imageType: fileType,
            imageRefTypeEnum: fileTypeEnum,
            imageFiles: file,
        }, _.isUndefined);
    }

    _renderSelectorOptions() {
        const availableSelections = _.get(this.props, ['elementConfig', 'availableSelections']);
        const keyName = _.get(this.props, ['elementConfig', 'selectionOptions', 'keyName']);
        const valueName = _.get(this.props, ['elementConfig', 'selectionOptions', 'valueName']);
        const labelName = _.get(this.props, ['elementConfig', 'selectionOptions', 'labelName']);
        if (availableSelections) {
            return availableSelections.map(v => (
                <Select.Option
                    key={v[keyName] || v[valueName] || v}
                    value={v[valueName] || v}
                >
                    {labelName ? v[labelName] || '' : `${v}`}
                </Select.Option>
            ));
        }
    }

    _renderCheckBoxs() {
        const availableSelections = _.get(this.props, ['elementConfig', 'availableSelections']);
        const keyName = _.get(this.props, ['elementConfig', 'selectionOptions', 'keyName']);
        const valueName = _.get(this.props, ['elementConfig', 'selectionOptions', 'valueName']);
        const labelName = _.get(this.props, ['elementConfig', 'selectionOptions', 'labelName']);
        return availableSelections && availableSelections
            .map((selection) => (<Checkbox
                key={selection[keyName] || selection[valueName] || selection.value}
                value={selection[valueName] || selection.value}
            >
                {labelName ? selection[labelName] : selection.label}
            </Checkbox>));
    }

    _renderRadios() {
        const availableSelections = _.get(this.props, ['elementConfig', 'availableSelections']);
        const keyName = _.get(this.props, ['elementConfig', 'selectionOptions', 'keyName']);
        const valueName = _.get(this.props, ['elementConfig', 'selectionOptions', 'valueName']);
        const labelName = _.get(this.props, ['elementConfig', 'selectionOptions', 'labelName']);
        return availableSelections && availableSelections
            .map((selection) => (<Radio
                key={selection[keyName] || selection[valueName] || selection.value}
                value={selection[valueName] || selection.value}
            >
                {selection[labelName] || selection.label}
            </Radio>));
    }

    toHalfCharNum = num => {
        const halfNumChar = num.split('')
            .filter(v => !isNaN(v))
            .join('');
        return halfNumChar && _.toNumber(halfNumChar);
    }
}

export const formItemPropTypes = {
    type: oneOf([ // 渲染的 item 类型, 根据不同类型渲染不同输入组件
        'input',
        'select',
        'textArea',
        'date',
        'rangeDate',
        'checkboxGroup',
        'radioGroup',
        'fileList',
        'imageList',
        'number',
        'richText',
        // todo: 单个 check, radio 待支持
    ]),
    elementProps: shape({ // 放入子元素中的参数, 需是 antd 相应组件接收的参数
        // 若与 getFieldDecorator 连用, onChange 事件需要放在 props 最外层, 放在此处的 onChange 会被 getFieldDecorator 的 onChange 所覆盖
        placeholder: oneOfType([
            string,
            arrayOf(string),
        ]),
        mode: oneOfType([
            string,
            arrayOf(string),
        ]),
        format: string,
        accept: string, // 接收的文件类型
        allowClear: bool,
        formatter: func,
        parser: func,
        addonAfter: string,
        onPreview: func,
        onRemove: func,
        onCheckError: func, // 上传组件上传文件不符合要求时触发
        onFileListChange: func,
        max: number, // type 为 'fileList' 或 'imageList' 时, 最大文件数量限制
        maxSize: number, // type 为 'fileList' 或 'imageList' 时, 最大文件大小限制
        placeText: string, // type 为 'fileList' 或 'imageList' 时, 提示文本
        refNo: string, // type 为 'fileUpload' 或 'imageUpload' 时, 需要向接口发送的 refNo 参数
        fileType: string, // type 为 'fileUpload' 或 'imageUpload' 时, 需要向接口发送的文件类型参数
        fileTypeEnum: string, // type 为 'fileUpload' 或 'imageUpload' 时, 需要向接口发送的文件类型参数
    }),
    elementConfig: shape({ // 不向下传递的参数, 用于本组件渲染逻辑 (*在考虑与 elementProps 整合)
        availableSelections: arrayOf( // type 为 'checkboxGroup' 或 'radioGroup', 'select' 时, 用于渲染列表数据
            oneOfType([
                string,
                shape({
                    key: string,
                    label: string,
                    value: oneOfType([
                        number,
                        bool,
                        string,
                    ]),
                }),
                object,
            ])
        ),
        selectionOptions: shape({
            keyName: string,
            valueName: string,
            labelName: string,
        }),
    }),
};

FormItemElement.propTypes = {
    className: string,
    ...formItemPropTypes,

    // connect 参数
    LANG: object,
    dispatch: func,

    // 事件处理方法与字段值, 若与 getFieldDecorator 结合使用, 可不手动传递
    id: string,
    value: any,
    defaultValue: any,
    onChange: func,
    onFocus: func,
    onBlur: func,
    onSearch: func,
};

FormItemElement.defaultProps = {
    type: 'input',
};

export default connect(state => ({ LANG: state.LANG }))(FormItemElement);
