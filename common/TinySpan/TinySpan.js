/*
 * @Author: lanwenyi
 * @Date: 2019-07-11 12:00:47
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-08-17 14:26:02
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';

class TinySpan extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    }

    render() {
        const { className, children } = this.props;
        return (<span className={clsx('tiny-span', className)}>
            {children}
        </span>);
    }
}

export default TinySpan;
