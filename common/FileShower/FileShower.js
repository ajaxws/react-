/*
 * @Author: lanwenyi
 * @Descrpit: 文件展示组件 [功能相关]
 * @Date: 2019-08-02 15:03:21
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2020-02-04 15:05:10
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';
import { Icon } from 'antd';
import { toDownloadSrc } from '../../../utils/fileSrc';

class FileShower extends Component {
    render() {
        const { name, onClick, className } = this.props;
        return (<div
            className={clsx('file-shower', className)}
            onClick={onClick || this.onDownload}
        >
            <div title={name && name.toLowerCase()} className="file-shower-logo" />
            <div className="file-shower-name">
                {name}
            </div>
            <Icon className="file-shower-btn" type="download" />
        </div>);
    }

    // 文件点击时调用下载
    onDownload = () => {
        const { src, name, disabledDownload } = this.props;
        if (!src || disabledDownload) return;
        const link = document.createElement('a');
        if (!!window.ActiveXObject || 'ActiveXObject' in window || navigator.userAgent.indexOf('Edge') > -1) {
            const elemIF = document.createElement('iframe');
            elemIF.src = toDownloadSrc(src);
            elemIF.name = name;
            elemIF.style.display = 'none';
            document.body.appendChild(elemIF);
            elemIF.click();
            return;
        }
        link.href = toDownloadSrc(src);
        link.setAttribute('download', name);
        // link.setAttribute('target', '_blank');
        link.click();
    }
}

FileShower.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string, // 资源名称, 通过后缀判断文件类型
    src: PropTypes.string,
    onClick: PropTypes.func, // 文件元素点击时的事件, 默认为下载
    disabledDownload: PropTypes.bool, // 是否禁用下载功能
};
export default FileShower;
