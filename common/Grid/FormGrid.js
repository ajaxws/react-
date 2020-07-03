/*
 * @Author: 蓝文怡
 * @Date: 2019-08-16 11:53:28
 * @Description: 表单数据网格展示 [功能相关]
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-10-21 15:28:26
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseGrid from './BaseGrid';
import { getFieldItems } from '../../../selectors/field';
import { formItemPropTypes } from '../FormItemElement/FormItemElement';

class FormGrid extends Component {
    render() {
        const { data, renderCell } = this.props;
        return (<BaseGrid
            data={data}
            renderCell={renderCell}
        />);
    }
}

FormGrid.propTypes = {
    data: PropTypes.arrayOf(
        formItemPropTypes
    ),
    renderCell: PropTypes.func.isRequired,
};

export default connect((state, { keys, valueSource, basicFieldPath, outputBasicPath }) => ({
    data: getFieldItems(keys, { source: valueSource, basicFieldPath, outputBasicPath })(state),
}))(FormGrid);
