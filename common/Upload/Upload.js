import React, { Component, Fragment } from 'react';
import { string, object, any, func, bool, number, oneOf } from 'prop-types';
import _ from 'lodash';
import withLang from '../../hoc/withLang';
import clsx from 'clsx';
import { Icon, Upload as AntUpload, Button } from 'antd';
import { getPlaceholderImage } from '../../../utils/getPlaceholderImage';
import { getFileSrc } from '../../../utils/fileSrc';
import './style';

class Upload extends Component {
    render() {
        const {
            fileList,
            uploadData,
            type,
            accept,
            placeText,
            LANG,
            disabled,
            action,
            className,
            onPreview,
        } = this.props;
        const disabledUpload = this.props.disabledUpload ||
            this.calculateIsExceedMaxCountLimit() ||
            this.handleThrottle();
        let list;
        if (fileList && !Array.isArray(fileList)) {
            console.error('FileList must be an array');
        } else {
            list = fileList;
        }
        if (type === 'image') {
            return (<AntUpload
                className={clsx('comp-upload', className, disabledUpload && 'disabled-upload')}
                accept={accept}
                action={action}
                data={uploadData}
                disabledUpload={disabledUpload}
                beforeUpload={this.beforeUpload}
                onChange={this.onUploadChange}
                onRemove={this.onFileRemove}
                fileList={list}
                listType="picture-card"
                onPreview={onPreview}
            >
                {this._renderPictureUploadButton()}
            </AntUpload>);
        }
        return (<AntUpload
            className={clsx('comp-upload', className, disabledUpload && 'disabled-upload')}
            accept={accept}
            action={action}
            data={uploadData}
            disabledUpload={disabledUpload}
            beforeUpload={this.beforeUpload}
            onChange={this.onUploadChange}
            onRemove={this.onFileRemove}
            fileList={list}
        >
            <Button
                className="upload-button"
                disabled={disabled || disabledUpload}
            >
                <Icon type="upload" />&nbsp;
                {placeText || LANG.add_file || '添付ファイル追加'}
            </Button>
        </AntUpload>);
    }

    _renderPictureUploadButton() {
        const { LANG, placeText, disabled } = this.props;
        const disabledUpload = this.props.disabledUpload ||
            this.calculateIsExceedMaxCountLimit() ||
            this.handleThrottle();
        if (!this.calculateIsExceedMaxCountLimit()) {
            return (<Fragment>
                <Icon type="plus" />
                <div className={clsx('ant-upload-text', (disabled || disabledUpload) && 'disabled-button')}>
                    {placeText || LANG.upload || 'Upload'}
                </div>
            </Fragment>);
        }
    }

    calculateIsExceedMaxCountLimit = () => {
        const { max, fileList } = this.props;
        const length = _.get(fileList, 'length', 0);
        return max && length >= max;
    }

    handleThrottle = () => {
        const { throttle, fileList } = this.props;
        if (throttle) {
            if (fileList && fileList.some(({ status }) => status === 'uploading')) return true;
        }
        return false;
    }

    onUploadChange = ({ fileList = [], file, event } = {}) => {
        const { onChange, onFileListChange, normalizeResponse } = this.props;
        if (_.get(event, 'percent') === 100) {
            onFileListChange && onFileListChange(
                fileList.filter(({ status, response }) => status !== 'error' && _.get(response, 'success') === true)
            );
        }
        onChange && onChange(fileList.filter(({ status, response }) => status !== 'error' && _.get(response, 'success') !== false).map(f => {
            const response = _.get(f, 'response');
            const responseFile = normalizeResponse(response);
            if (responseFile) {
                const url = getPlaceholderImage(f.name, getFileSrc({ // tif, svg 显示特殊占位图片
                    name: f.name,
                    fileUniqueCode: _.get(responseFile, 'imageUrl'),
                    refNo: _.get(responseFile, 'refNo'),
                }));
                return {
                    ...f,
                    thumbUrl: url,
                    url,
                    response: responseFile,
                };
            }
            return f;
        }));
    }

    // getUploadData = (file) => {
    //     const fileType = _.get(this.props, ['elementConfig', 'fileType']);
    //     const fileTypeEnum = _.get(this.props, ['elementConfig', 'fileTypeEnum']);
    //     const refNo = _.get(this.props, ['elementConfig', 'refNo']);
    //     return {
    //         refNo,
    //         imageType: fileType,
    //         imageRefTypeEnum: fileTypeEnum || 'CHECK',
    //         imageFiles: file,
    //     };
    // }

    beforeUpload = (file) => {
        const { accept, onCheckError, maxSize, maxMainFilenameLength, maxFilenameLength } = this.props;
        const { size, name } = file;

        const errorPromise = (err) => new Promise((resolve, reject) => {
            // 此处 reject 不会触发传入的 onError 属性, onError 仅在接口请求失败时触发 (antd v3.8.4)
            onCheckError && onCheckError(err);
            reject(new Error(err));
        });

        if (size > maxSize) {
            const error = new Error();
            error.type = 'size';
            error.message = 'Exceed the max size.';
            return errorPromise(error); // return false 后文件仍然会添加到 fileList 里 (antd v3.8.4)
        }

        // 检测文件类型
        if (accept && !_.replace(accept, '.', '').split(',.').includes(name.split('.').pop().toLowerCase())) {
            const error = new Error();
            error.type = 'type';
            error.message = 'Unexpected file type.';
            return errorPromise(error);
        }
        const arr = name.split('.');
        arr.pop();
        const mainFileName = arr.join('');
        if ((mainFileName && maxMainFilenameLength && (mainFileName.length > maxMainFilenameLength)) ||
            (name && maxFilenameLength && (name.length > maxFilenameLength))) {
            const error = new Error();
            error.type = 'name';
            error.message = 'Exceed the max filename length.';
            return errorPromise(error);
        }
        return true;
    }

    onFileRemove = (file) => {
        const { fileRemovePromise, onRemove, onFileListChange } = this.props;
        const { isOriginal, response = {} } = file;
        const imageUrl = isOriginal ? file.imageUrl : _.get(response, 'imageUrl');
        if (imageUrl) {
            if (fileRemovePromise) {
                fileRemovePromise(file).then(() => {
                    onFileListChange && onFileListChange();
                });
            } else {
                onFileListChange && onFileListChange();
            }
        } else {
            return new Promise(resolve => { resolve(true); });
        }
        onRemove && onRemove(file);
    }

    // customUploadRequest = (v) => {
    //     const { onProgress, onSuccess, onError, file } = v;
    //     const { LANG } = this.props;
    //     const fileType = _.get(this.props, ['elementConfig', 'fileType']);
    //     const fileTypeEnum = _.get(this.props, ['elementConfig', 'fileTypeEnum']);
    //     const refNo = _.get(this.props, ['elementConfig', 'refNo']);
    //     const data = new FormData();

    //     data.append('refNo', refNo);
    //     data.append('imageType', fileType);
    //     data.append('imageRefTypeEnum', fileTypeEnum || 'CHECK');
    //     data.append('imageFiles', file);
    //     req.uploadDeviceImage( // todo: custom request promise
    //         data,
    //         {
    //             onUploadProgress: ({ loaded, total }) => {
    //                 onProgress({ percent: loaded / total * 100 }, file);
    //             },
    //         }
    //     ).then(({ value, code }) => {
    //         const resultFile = _.get(value, ['imageResDTOS', 0]); // todo: custom value mapping
    //         if (resultFile) {
    //             onSuccess(resultFile, file);
    //         } else {
    //             if (code) {
    //                 onError(new Error(LANG[code]), { value, code }, file);
    //                 return;
    //             }
    //             onError(new Error('Error on file uploading.'), { value, code }, file); // todo: lang
    //         }
    //     }).catch((e) => {
    //         onError(e, undefined, file);
    //     });
    // }
}

Upload.propTypes = {
    LANG: object,
    type: oneOf(['normal', 'image']),
    fileList: any,
    className: string,
    action: string, // 接口请求的路径
    accept: string, // 接受的文件类型
    onCheckError: func, // 文件上传前校验错误时触发
    onChange: func, // 在文件数量变更时, 上传进度或上传状态改变时触发
    onFileListChange: func, // 仅在文件数量变更时触发
    onPreview: func,
    onRemove: func, // 文件删除时触发
    disabled: bool, // 禁止上传和删除操作
    disabledUpload: bool, // 禁止上传操作
    placeText: string, // 按钮提示文本
    max: number, // 最大上传数量
    maxSize: number, // 单个文件的最大上传尺寸
    maxMainFilenameLength: number, // 单个文件的最大文件名长度(不包含后缀)
    maxFilenameLength: number, // 单个文件的最大文件名长度(包含后缀)
    normalizeResponse: func, // 格式化接口返回值, 映射到 value
    uploadData: func,
    fileRemovePromise: func, // 文件移除执行的动作(调用接口删除等)
    throttle: bool, // 如果该属性为 true, 每次只能上传一个文件, 必须等待上传完成后才可再次上传
};

Upload.defaultProps = {
    type: 'normal',
    action: '/api/claim/claim/uploadDeviceImage',
    normalizeResponse: v => _.get(v, ['value', 'imageResDTOS', 0]),
    uploadData: v => v,
    maxMainFilenameLength: 64,
    LANG: {},
};
export default withLang(Upload);
