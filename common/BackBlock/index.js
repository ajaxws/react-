/*
 * @Author: za-xielingjuan
 * @Date: 2018-09-13 18:20:58
 * @Description: 最顶部返回的block
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-11-12 15:29:52
 * @ToDo: ''
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class BackBlock extends React.Component {
    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const { LANG } = this.props;
        return (
            <div className="block back-block">
                <p className="hover-main-color" onClick={this.goBack}>
                    <Icon type="left" />
                    <span>{LANG.go_back || '戻る'}</span>
                </p>
            </div>
        );
    }
}

BackBlock.propTypes = {
    LANG: PropTypes.object,
    history: PropTypes.object,
};

export default withRouter(
    connect(state => ({
        LANG: state.LANG,
    }))(BackBlock)
);
