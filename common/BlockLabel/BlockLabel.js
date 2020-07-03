import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';
class BlockLabel extends Component {
    render() {
        const { className, children } = this.props;
        return (<div className={clsx('comp-block-label', className)}>
            {children}
        </div>);
    }
}

BlockLabel.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};
export default BlockLabel;
