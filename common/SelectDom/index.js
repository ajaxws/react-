/*
 * @Author: za-xielingjuan
 * @Date: 2018-07-10 14:38:45
 * @Description: 选择框组件
 * @Last Modified by: za-huoyanpeng
 * @Last Modified time: 2018-12-04 11:17:58
 * @ToDo: ''
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, Tooltip } from 'antd';
const Option = Select.Option;

class SelectDom extends React.Component {
    render() {
        const { list, idKey, valueKey, ...rest } = this.props;
        let selectDom = <Select {...rest} getPopupContainer={triggerNode => triggerNode.parentElement}>
            {
                this.props.list.map((item, index) => {
                    return <Option key={index} value={item[idKey]}>
                        <Tooltip title={item[valueKey]}>
                            {item[valueKey]}
                        </Tooltip>
                    </Option>;
                })
            }
        </Select>;
        if (rest.showSearch) {
            return (
                <div className='search-select-dom'>
                    <Icon type="search" />
                    {selectDom}
                </div>
            );
        } else {
            return selectDom;
        }
    }
}

SelectDom.propTypes = {
    list: PropTypes.array,
    idKey: PropTypes.string,
    valueKey: PropTypes.string,
};

export default SelectDom;
