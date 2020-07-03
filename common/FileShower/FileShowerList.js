/*
 * @Author: 蓝文怡
 * @Date: 2019-08-23 16:05:24
 * @Description: 文件列表展示组件 [功能相关]
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-13 15:47:09
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileShower from './FileShower';
import { DEFAULT_VALUE } from '../../../utils/defaultValue';

class FileShowerList extends Component {
    render() {
        const { values, defaultPlaceholder } = this.props;
        return (<div className="comp-fileshower-list">
            {
                values && values.length
                    ? values.map(({
                        id,
                        name,
                        src,
                    }) => (
                        <FileShower
                            key={id}
                            name={name}
                            src={src}
                        />
                    ))
                    : <div className="default-placeholder">{defaultPlaceholder}</div>
            }
        </div>);
    }
}

FileShowerList.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            src: PropTypes.string,
        })
    ),
    defaultPlaceholder: PropTypes.node,
};

FileShowerList.defaultProps = {
    defaultPlaceholder: DEFAULT_VALUE,
};
export default FileShowerList;
