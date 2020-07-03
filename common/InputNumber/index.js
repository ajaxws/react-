import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

class InputNumber extends Component {
    state = {
        imagePreviewVisible: false,
    }

    formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    onChange = (e) => {
        const pureNumber = (e.target.value + '').replace(/,/g, '');
        const fomatValue = this.formatNumber(pureNumber);
        this.props.onChange && this.props.onChange(fomatValue);
    }

    render() {
        const { value } = this.props;
        return (
            <Input onChange={this.onChange} value={value} addonAfter="円" />
        );
    }
}

InputNumber.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
};
export default InputNumber;
