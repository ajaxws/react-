import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CircinalButton from './CircinalButton';
import './style';
import ImagePreview from '../ImagePreview/ImagePreview';
import { getPlaceholderImage, getPreviewImage } from '../../../utils/getPlaceholderImage';
import { toDownloadSrc } from '../../../utils/fileSrc';
class Image extends Component {
    state = {
        imagePreviewVisible: false,
    }

    render() {
        const { onPreview, onDownload, className, name, src } = this.props;
        const { imagePreviewVisible } = this.state;
        return (<div className={clsx('image-component', className)}>
            <div className="image-component-inner" style={{ backgroundImage: `url("${getPlaceholderImage(name, src)}")` }} />
            <div className="image-component-mask">
                <CircinalButton
                    iconName="search"
                    className="image-component-mask-btn"
                    onClick={onPreview || this.showImage}
                />
                <CircinalButton
                    iconName="download"
                    className="image-component-mask-btn"
                    onClick={onDownload || this.downloadImage}
                />
            </div>
            <ImagePreview
                src={getPreviewImage(name, src)}
                visible={imagePreviewVisible}
                onVisibleChange={this.onImagePreviewVisibleChange}
            />
        </div>);
    }

    showImage = () => {
        this.setState({ imagePreviewVisible: true });
    }

    onImagePreviewVisibleChange = () => {
        this.setState(({ imagePreviewVisible }) => ({ imagePreviewVisible: !imagePreviewVisible }));
    }

    downloadImage = () => {
        const { src, name } = this.props;
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

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    name: PropTypes.string,
    onPreview: PropTypes.func,
    onDownload: PropTypes.func,
};
export default Image;
