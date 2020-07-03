import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './step.less';

class Step extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { LANG, now } = this.props;
        return (
            <div className="step-progress">
                <div className="step-progress-line" />
                <div className="step-item-group">
                    <div className={`step-item step-3 ${now === 1 ? 'active' : ''}`}>
                        <span>{LANG.claim_text_input || 'ご入力'}</span>
                        <i className="iconfont">&#xe613;</i>
                    </div>
                    <div className={`step-item step-3 ${now === 2 ? 'active' : ''}`}>
                        <span>{LANG.confirm_input_content || '入力内容の確認'}</span>
                        <i className="iconfont">&#xe619;</i>
                    </div>
                    <div className={`step-item ${now === 3 ? 'active' : ''}`}>
                        <span>{LANG.request_compensation_finished || 'ご請求手続き完了'}</span>
                        <i className="iconfont">&#xe618;</i>
                    </div>
                </div>
            </div>
        );
    }
}

Step.propTypes = {
    LANG: propTypes.object,
    now: propTypes.number,
};

export default connect(state => ({
    LANG: state.LANG,
}))(Step);
