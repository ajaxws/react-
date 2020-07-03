import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import req from '../../../request';
class CommonUpload extends Component {
    render() {
        return (<Upload
            customRequest={this.customUploadRequest}
            {...this.props}
            accept=".jpg,.jpeg,.png"
            listType="picture-card"
        >
            {this._renderPictureUploadButton()}
        </Upload>);
    }

    customUploadRequest = ({ onProgress, onSuccess, onError, file }) => {
        const { LANG } = this.props;
        const { size, name } = file;
        const fileType = _.get(this.props, ['elementConfig', 'fileType']);
        const fileTypeEnum = _.get(this.props, ['elementConfig', 'imageRefTypeEnum']);
        const refNo = _.get(this.props, ['elementConfig', 'refNo']);
        const accept = _.get(this.props, ['elementProps', 'accept']);
        const maxFileSize = _.get(this.props, ['elementConfig', 'maxSize']);
        if (size > maxFileSize) {
            message.error('Exceed the max size.');
            return false;
        }

        // 检测文件类型
        if (accept && !_.replace(accept, '.', '').split(',').includes(name.split('.').pop())) {
            onError(new Error('Unexpected file type.'));
        }
        const data = new FormData();
        data.append('refNo', refNo);
        data.append('imageType', fileType);
        data.append('imageRefTypeEnum', fileTypeEnum || 'CHECK');
        data.append('imageFiles', file);
        req.uploadDeviceImage( // todo: custom request promise
            data,
            {
                onUploadProgress: ({ loaded, total }) => {
                    onProgress({ percent: loaded / total * 100 }, file);
                },
            }
        ).then(({ value, code }) => {
            const resultFile = _.get(value, ['imageResDTOS', 0]); // todo: custom value mapping
            if (resultFile) {
                onSuccess(resultFile, file);
            } else {
                if (code) {
                    onError(new Error(LANG[code]));
                    return;
                }
                onError(new Error('Error on file uploading.')); // todo: lang
            }
        }).catch((e) => {
            onError(e);
        });
    }
}

CommonUpload.propTypes = {
    fileList: PropTypes.func,
    onChange: PropTypes.func,
    listType: PropTypes.string,
    LANG: PropTypes.func,
};
export default connect(state => ({ LANG: state.LANG }))(CommonUpload);
