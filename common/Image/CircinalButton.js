import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Icon } from 'antd';
import './style';

class CircinalButton extends Component {
    render() {
        const { iconName, onClick, className } = this.props;
        return (<div className={clsx('circinal-button', className)} onClick={onClick}>
            <Icon type={iconName} className="circinal-button-icon" />
        </div>);
    }
}

CircinalButton.propTypes = {
    className: PropTypes.string,
    iconName: PropTypes.string,
    onClick: PropTypes.func,
};

export default CircinalButton;
