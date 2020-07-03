/*
 * @Author: lanwenyi
 * @Date: 2019-07-10 16:46:48
 * @Description: 根据传入 data 生成详情 Grid,可配置列数, 默认列数为 3 [功能相关]
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-19 18:12:40
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from 'antd';
import clsx from 'clsx';
import './style.less';

class BaseGrid extends Component {
    render() {
        const { className, data, columnCount, style } = this.props;
        const itemsArray = _.chunk(data, columnCount);
        return (<div className={clsx('item-grid', className)} style={style}>
            {this._renderRows(itemsArray)}
        </div>);
    }

    _renderRows(itemsArray) {
        const { rowClassName, gutter } = this.props;
        return itemsArray.map((items, index) => (<Row
            className={rowClassName}
            key={`row.${index}`}
            gutter={gutter}
        >
            {this._renderCell(items, index)}
        </Row>));
    }

    _renderCell(items, rowIndex) {
        const { columnCount, renderCell, keyName, cellClassName } = this.props;
        return items.map((item, index) => (<Col className={cellClassName} key={item[keyName]} span={24 / columnCount}>
            {renderCell(item, rowIndex * columnCount + index)}
        </Col>));
    }
}

BaseGrid.propTypes = {
    data: PropTypes.array, // 传入的数据数组, 数据必须有唯一 key 值, 默认为 'key'
    keyName: PropTypes.string, // 自定义 key 值字段
    renderCell: PropTypes.func, // 定义渲染内容, 函数接收参数: [1]data 在该列的数据, [2]index
    columnCount: PropTypes.number, // 数据分为几列显示, 必须是 24 的约数
    gutter: PropTypes.number, // 列的间隙
    className: PropTypes.string,
    rowClassName: PropTypes.string,
    cellClassName: PropTypes.string,
    style: PropTypes.object,
};

BaseGrid.defaultProps = {
    columnCount: 3,
    keyName: 'key',
    gutter: 100,
};

export default BaseGrid;
