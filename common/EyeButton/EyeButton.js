/*
 * @Author: 蓝文怡
 * @Date: 2019-10-24 19:54:42
 * @Description: 空心眼睛 icon
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-05 20:47:46
 */
import React, { Component, Fragment } from 'react';
import { func, bool } from 'prop-types';
import './style';
import clsx from 'clsx';

class EyeButton extends Component {
    render() {
        const { onClick, disabled } = this.props;
        return (<Fragment>
            <div className={clsx('eye-button', disabled && 'disabled')} onClick={onClick}>
                <div className="eye-normal" />
                <div className="eye-hover" />
            </div>
        </Fragment>);
    }
}

EyeButton.propTypes = {
    onClick: func,
    disabled: bool,
};
export default EyeButton;
