import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import './style';
import { Icon } from 'antd';
class ImagePreview extends Component {
    render() {
        const { visible, src } = this.props;
        if (visible) {
            return (<div className="image-preview">
                <Icon className="image-preview-close-btn" type="close" />
                <OutsideClickHandler
                    onOutsideClick={this.closeLayout}
                >
                    <img src={src} onClick={e => e.stopPropagation()} />
                </OutsideClickHandler>
            </div>);
        }
        return null;
    }

    closeLayout = () => {
        const { onVisibleChange } = this.props;
        onVisibleChange && onVisibleChange(false);
    }
}

ImagePreview.propTypes = {
    src: PropTypes.string,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
};

export default ImagePreview;
