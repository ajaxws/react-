/*
 * @Author: 李欢欢
 * @Date: 2019-11-13 11:10:36
 * @Description: 两个DatePicker实现RangePiker
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { func, object, array } from 'prop-types';
import { DatePicker } from 'antd';
import './style.less';

class RangePicker extends Component {
    render() {
        const { LANG, value } = this.props;
        const dateStart = _.get(value, 0);
        const dateEnd = _.get(value, 1);
        return (
            <div className="render-picker">
                <DatePicker
                    style={{ width: '45%' }}
                    placeholder={LANG.start_date_1 || '開始日付'}
                    value={dateStart || undefined}
                    format="YYYY-MM-DD"
                    onChange={(value) => {
                        if (value) {
                            this.props.onChange([value, dateEnd]);
                        } else {
                            this.props.onChange();
                        }
                    }}
                    disabledDate={(current) => dateEnd && moment(current).isAfter(moment(dateEnd, 'YYYY-MM-DD').endOf('day'))}
                />
                <span style={{ display: 'inline-block', margin: '0 10px 0 11px', maxWidth: '9px' }}>~</span>
                <DatePicker
                    style={{ width: '45%' }}
                    placeholder={LANG.end_date_1 || '終了日付'}
                    value={dateEnd || undefined}
                    format="YYYY-MM-DD"
                    onChange={(value) => {
                        if (value) {
                            this.props.onChange([dateStart, value]);
                        } else {
                            this.props.onChange();
                        }
                    }}
                    disabledDate={(current) => dateStart && moment(current).isBefore(moment(dateStart, 'YYYY-MM-DD'))}
                />
            </div>
        );
    }
}

RangePicker.propTypes = {
    LANG: object,
    onChange: func,
    value: array,
};

export default connect((state) => ({
    LANG: state.LANG,
}))(RangePicker);
