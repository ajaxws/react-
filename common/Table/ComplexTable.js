/*
 * @Author: za-zhouzhe
 * @Date: 2018-07-11 17:54:05
 * @Description: 'Table组件'
 * @Last Modified by: 蓝文怡
 * @Last Modified time: 2019-08-06 10:51:26
 * @ToDo: ''
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Icon } from 'antd';

class ComplexTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    clearSelect = () => {
        // console.log('clear...');
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.selectionType === 'checkbox') {
            this.setState({ selectedRowKeys, selectedRows });
            this.props.onSelect(selectedRowKeys.length === 0 ? [] : selectedRows);
        }
    }
    onSelect = (record, selected) => {
        if (this.props.selectionType === 'radio') {
            const newKeys = selected ? [record.key] : [];
            this.setState({ selectedRowKeys: newKeys, selectedRows: [record] });
            this.props.onSelect(newKeys.length === 0 ? [] : [record]);
        }
    }
    selectRow = (record) => {
        if (this.props.theme === 'basic') return;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];
        if (this.props.selectionType === 'checkbox') {
            if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRows.splice(selectedRowKeys.indexOf(record.key), 1);
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            } else {
                selectedRowKeys.push(record.key);
                selectedRows.push(record);
            }
            this.props.onSelect(selectedRowKeys.length === 0 ? [] : selectedRows);
        } else if (this.props.selectionType === 'radio') {
            if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(0, selectedRowKeys.length);
            } else {
                selectedRowKeys.splice(0, selectedRowKeys.length);
                selectedRowKeys.push(record.key);
            }
            this.props.onSelect(selectedRowKeys.length === 0 ? [] : [record]);
        }
        this.setState({ selectedRowKeys, selectedRows });
    }
    handleDelete = (record) => {
        this.props.onDelete(record);
    }
    getColumns = (data) => {
        const newData = [...data];
        if (this.props.theme === 'complex') {
            return data;
        }
        if (!this.props.noDelete) {
            newData.push({
                title: '',
                dataIndex: 'delete',
                key: 'delete',
                width: '10%',
                render: (text, record) => {
                    return (
                        <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record)}>
                            <Icon type="delete" style={{ fontSize: 16 }} />
                        </Popconfirm>
                    );
                }
            });
        }
        return newData;
    }
    // 点击分页 onChange 事件
    handlePageChange = (page, pageSize) => {
        this.props.onPageChange(page, pageSize);
    }
    handleTableChange = (pagination, filters, sorter) => {
        if (this.props.handleTableChange) {
            this.props.handleTableChange(pagination, filters, sorter);
        }
    }
    render() {
        const pagination = this.props.pagination && {
            total: this.props.total,
            pageSize: this.props.pageSize,
            hideOnSinglePage: false,
            onChange: this.handlePageChange,
            defaultCurrent: this.props.defaultCurrent,
            current: this.props.current,
            showQuickJumper: true,
            showSizeChanger: this.props.showSizeChanger
        };
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            type: this.props.selectionType || 'radio',
            onSelect: this.onSelect,
        };
        if (this.props.getCheckboxProps) {
            rowSelection.getCheckboxProps = this.props.getCheckboxProps;
        }
        const classStr = this.props.theme === 'complex' ? 'complex-table' : 'basic-table';
        return (
            <div className={classStr}>
                <Table
                    showHeader={this.props.showHeader}
                    dataSource={this.props.dataSource}
                    columns={this.getColumns(this.props.columns)}
                    pagination={pagination}
                    loading={this.props.loading}
                    rowSelection={this.props.isSelection ? rowSelection : null}
                    onChange={this.handleTableChange}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        }
                    })}
                    scroll={this.props.scroll}
                />
            </div>
        );
    }
}

ComplexTable.propTypes = {
    /*
        表格的主要数据源
    */
    dataSource: PropTypes.array,
    /*
        表格列的配置数据
    */
    columns: PropTypes.arrayOf(PropTypes.object),
    /*
        加载状态 默认为false
    */
    loading: PropTypes.bool,
    /*
        每页显示多少条数据 默认为15条
    */
    pageSize: PropTypes.number,
    /*
        选中某行的回调函数
    */
    onSelect: PropTypes.func,
    /*
        选中类型 单选radio 或者 多选checkbox 默认为单选
    */
    selectionType: PropTypes.string,
    /*
        是否开启 单选 或者 多选 默认为开启
    */
    isSelection: PropTypes.bool,
    /*
        主题类型 分 complex 和  basic, 默认为 complex
    */
    theme: PropTypes.string,
    /*
        点击删除图标回调函数
    */
    onDelete: PropTypes.func,
    /*
        点击分页 回调函数
    */
    onPageChange: PropTypes.func,
    /*
        默认的当前页数  默认为1
    */
    defaultCurrent: PropTypes.number,
    /*
        数据总数
    */
    total: PropTypes.number,
    /*
        当前页数
    */
    current: PropTypes.number,
    /*
        不包含删除按钮
    */
    noDelete: PropTypes.bool,
    /*
        选择每页条数
    */
    showSizeChanger: PropTypes.bool,
    pagination: PropTypes.bool,
    handleTableChange: PropTypes.func,
    scroll: PropTypes.object,
    showHeader: PropTypes.bool,
    getCheckboxProps: PropTypes.func
};

ComplexTable.defaultProps = {
    theme: 'complex',
    loading: false,
    pageSize: 10,
    onSelect: () => { },
    onDelete: () => { },
    onPageChange: () => { },
    selectionType: 'radio',
    isSelection: true,
    defaultCurrent: 1,
    total: 0,
    showHeader: true,
};

export default ComplexTable;
