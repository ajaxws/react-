/*
 * @Author: 蓝文怡
 * @Date: 2019-08-23 16:04:16
 * @Description: 图片列表展示组件, 传入图片数组 values, 渲染图片列表
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-13 15:46:56
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { DEFAULT_VALUE } from '../../../utils/defaultValue';

class ImageList extends Component {
    render() {
        const { values, defaultPlaceholder } = this.props;
        return (<div className="comp-image-list">
            {
                values && values.length
                    ? values.map(({
                        id,
                        src,
                        url,
                        name,
                    }) => <Image key={id} src={src || url} name={name} />)
                    : <div className="default-placeholder">{defaultPlaceholder}</div>
            }
        </div>);
    }
}

ImageList.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            url: PropTypes.string, // (不推荐, 待移除)
            src: PropTypes.string, // todo: 移除 url
            name: PropTypes.string,
        })
    ),
    defaultPlaceholder: PropTypes.node,
};

ImageList.defaultProps = {
    defaultPlaceholder: DEFAULT_VALUE,
};
export default ImageList;
