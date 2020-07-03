import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import './step.less';

class Step extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { LANG, now, className } = this.props;
        return (
            <div className={clsx('step-progress', className)}>
                <div className="step-progress-line" />
                <div className="step-item-group">
                    <div className={`step-item step-5 ${now === 1 ? 'active' : ''}`}>
                        <span>{LANG.process_accident_report || '事故の受付'}</span>
                        <i className="iconfont">&#xe615;</i>
                    </div>
                    <div className={`step-item step-5 ${now === 2 ? 'active' : ''}`}>
                        <span>{LANG.process_damaged_confirm || '損害状況の確認'}</span>
                        <i className="iconfont">&#xe616;</i>
                    </div>
                    <div className={`step-item step-5 ${now === 3 ? 'active' : ''}`}>
                        <span>{LANG.process_correspondence_reply || 'ご請求への対応'}</span>
                        <i className="iconfont">&#xe617;</i>
                    </div>
                    <div className={`step-item step-5 ${now === 4 ? 'active' : ''}`}>
                        <span>{LANG.process_correspondence_reply_finished || 'ご請求への対応完了'}</span>
                        <i className="iconfont">&#xe614;</i>
                    </div>
                    <div className={`step-item ${now === 5 ? 'active' : ''}`}>
                        <span>{'事故対応\n完了'}</span>
                        <i className="iconfont">&#xe618;</i>
                    </div>
                </div>
            </div>
        );
    }
}

Step.propTypes = {
    LANG: propTypes.object,
    className: propTypes.string,
    now: propTypes.number,
};

export default connect(state => ({
    LANG: state.LANG,
}))(Step);
