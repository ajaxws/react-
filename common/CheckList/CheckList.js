/*
 * @Author: 蓝文怡
 * @Date: 2019-08-23 19:10:59
 * @Description: 渲染仅用于展示的 checkbox 列表
 * 接收参数:
 * list: 列表值 (字符串数组, 字符串为枚举的 key), 如不传则显示所有枚举项
 * selectedList: 已选值 (字符串数组)
 * mapEnum: 字段映射字符串, 如: 'common.YESNOEnum'
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-11 16:04:40
 */
import React, { Component } from 'react';
import { string, object, array } from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import './style';
import { getPureEnums } from '../../../selectors/enum';
import checkboxRes from './checkbox.svg';
import checkboxBorderRes from './checkbox_border.svg';

class CheckList extends Component {
    render() {
        const { list, selectedList = [], enums = {}, addition } = this.props;
        const displayList = list || Object.keys(enums) || [];
        return displayList.map(i =>
            (<div className="comp-repair-list" key={i}>
                {/* <span className={clsx('tick-icon', { 'is-shown': selectedList.includes(i) })} /> */}
                {this._renderIcon(selectedList.includes(i))}
                {enums[i]}{addition}
            </div>)
        );
    }

    _renderIcon(checked) {
        if (checked) return <div className="item-icon" style={{ backgroundImage: `url(${checkboxRes})` }} />;
        return <div className="item-icon" style={{ backgroundImage: `url(${checkboxBorderRes})` }} />;
    }
}

CheckList.propTypes = {
    list: array,
    selectedList: array,
    enums: object,
    addition: string,
};
export default connect(
    (state, { mapEnum }) => ({
        enums: getPureEnums(state)[mapEnum],
    })
)(CheckList);
