/*
 * @Author: 蓝文怡
 * @Date: 2019-08-07 13:19:58
 * @Description: 纯输出数据网格展示
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-08-30 15:22:52
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFieldInfos } from '../../../selectors/field';
import BaseGrid from './BaseGrid';
import LabelItem from '../LabelItem/LabelItem';

class InfoGrid extends Component {
    render() {
        const { info, renderCell, ...restProps } = this.props;
        return (<BaseGrid
            data={info}
            renderCell={renderCell || this.renderGridCell}
            {...restProps}
        />);
    }

    renderGridCell = (cellData) => <LabelItem label={cellData.label} value={cellData.value} />
}

InfoGrid.propTypes = {
    info: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    renderCell: PropTypes.func,
    keyName: PropTypes.string, // 自定义 key 值字段
    columnCount: PropTypes.number, // 数据分为几列显示, 必须是 24 的约数
    gutter: PropTypes.number, // 列的间隙
    className: PropTypes.string,
    rowClassName: PropTypes.string,
    cellClassName: PropTypes.string,
};

export default connect((state, { keys, basicFieldPath, valueSource, defaultValue }) => ({
    info: getFieldInfos(keys, basicFieldPath, valueSource, { defaultValue })(state),
}))(InfoGrid);
