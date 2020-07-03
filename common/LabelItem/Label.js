import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style';
import clsx from 'clsx';

class Label extends Component {
    render() {
        const { children, top } = this.props;
        return (<div className={clsx('comp-label', top && 'top')}>
            {children}
        </div>);
    }
}

Label.propTypes = {
    top: PropTypes.bool,
    children: PropTypes.node,
};
export default Label;
