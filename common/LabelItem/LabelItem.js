/*
 * @Author: lanwenyi
 * @Date: 2019-07-11 12:00:47
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-10-22 16:35:25
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';
import Label from './Label';

class LabelItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.any,
        defaultValue: PropTypes.node,
        render: PropTypes.func,
    }

    render() {
        const { className, label, render, value } = this.props;
        return (<div className={clsx('label-item', className)}>
            <Label>
                {label}
            </Label>
            <div className="value">
                {render ? render(value) : this._renderValueText()}
            </div>
        </div>);
    }

    _renderValueText() {
        const { value, defaultValue } = this.props;
        if (typeof value === 'undefined') return defaultValue || '';
        return `${value}`;
    }
}

export default LabelItem;
