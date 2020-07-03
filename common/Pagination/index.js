/*
 * @Author: za-huoyanpeng
 * @Date: 2018-07-11 17:54:05
 * @Description: '分页'
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-08-06 10:50:28
 * @ToDo: ''
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComplexTable from '../Table/ComplexTable';
import { message } from 'antd';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: false,
            total: 1,
            pageSize: 10,
            current: 1,
            sorter: {},
            condition: {
                start: 0,
                limit: 10,
                condition: {
                }
            },
        };
    }

    componentDidMount() {
        if (!this.props.noLoad) {
            this.loadTableData(this.props.param || {});
        }
    }

    handleSearch = (values) => {
        const { condition } = this.state;
        condition.condition = values;
        this.setState({ condition });
        this.loadFirstPage({ ...values });
    }

    loadTableData = (param) => {
        const { tips = false } = this.props;
        const condition = { ...this.state.condition, ...param };
        this.setState({ loading: true });
        if (this.props.request) {
            this.props.request(condition).then(res => {
                if (res.success && res.value && res.value.results && !res.value.results.length && tips) {
                    message.warning('データは見つかりませんでした。');
                }
                if (res.success && res.value && res.value.results && res.value.results.length) {
                    // 处理加载
                    this.setState({
                        dataSource: res.value.results.map((item, index) => {
                            item.key = condition.start + (index + 1);
                            return item;
                        }),
                        condition,
                        total: res.value.total,
                        pageSize: res.value.limit,
                        current: res.value.start / res.value.limit + 1
                    });
                } else {
                    this.setState({ dataSource: [], condition: {}, total: 0, pageSize: 10, current: 1 });
                }
                this.tableComp.clearSelect();
            }).finally(() => {
                // 不论成功与否，都要将表格的loading状态置为false
                this.tableComp.clearSelect();
                this.setState({ loading: false });
            });
        }
    }

    handleTableChange = (pagination, filters, sorterObj) => {
        let sorter = { ...this.state.condition.condition };
        const oldSorter = this.state.sorter;
        if (Object.keys(sorterObj).length) {
            sorter = { ...sorter, 'sortName': sorterObj.field || '', 'sortOrder': sorterObj.order ? sorterObj.order.replace('end', '') : 'asc' };
            this.setState({ sorter });
        }
        if (oldSorter && oldSorter.sortName !== sorterObj.field) {
            this.loadFirstPage({ ...sorter });
        } else {
            this.loadTableData({ start: pagination.pageSize * (pagination.current - 1), limit: pagination.pageSize, condition: sorter });
        }
    }

    loadFirstPage = (param = {}) => {
        this.loadTableData({
            start: 0,
            limit: 10,
            condition: param
        });
    }

    render() {
        let props = this.props;
        props = {
            ...{
                isSelection: false,
                dataSource: this.state.dataSource,
                columns: this.props.columns,
                onSelect: this.handleSelect,
                loading: this.state.loading,
                selectionType: 'checkbox',
                pagination: true,
                theme: 'complex',
                total: this.state.total,
                pageSize: 10,
                defaultCurrent: 1,
                handleTableChange: this.handleTableChange,
                current: this.state.current,
            },
            ...props
        };
        return (
            <div>
                <ComplexTable
                    ref={(table) => { this.tableComp = table; }}
                    {...props}
                />
            </div>
        );
    }
}

Pagination.propTypes = {
    columns: PropTypes.array,
    request: PropTypes.func,
    param: PropTypes.object,
    noLoad: PropTypes.bool,
    // state: PropTypes.object,
    tips: PropTypes.bool,
    LANG: PropTypes.object,
};

Pagination.defaultProps = {
};

export default Pagination;
