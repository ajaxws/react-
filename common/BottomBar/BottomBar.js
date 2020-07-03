import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';

class BottomBar extends Component {
    render() {
        const { className, style, separation, children } = this.props;
        const cls = clsx(
            'comp-bottom-bar',
            { [`border-${separation}`]: separation },
            className
        );
        return <div className={cls} style={style}>{children}</div>;
    }
}

BottomBar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    separation: PropTypes.oneOf(['dashed', 'solid']),
};
export default BottomBar;
