import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EditRecipientForm from '../../forms/EditRecipientForm';
import { Table, Typography, Form, Space, Button } from 'antd';
import {
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// Action Imports
import {
  getAllRecipientAction,
  addRecipientAction,
  editRecipientAction,
  deleteRecipientAction,
  getAllHouseholdAction,
} from '../../../state/actions';

const RecipientTable = ({
  getAllHouseholdAction,
  getAllRecipientAction,
  editRecipientAction,
  deleteRecipientAction,
  recipients,
  change,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [sortedInfo, setSortedInfo] = useState('');
  const [filteredInfo, setFilteredInfo] = useState('');
  const [editing, setEditing] = useState(false);
  const [key, setKey] = useState('');

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo('');
  };

  const clearAll = () => {
    setSortedInfo('');
    setFilteredInfo('');
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const setFirstNameSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'first_name',
    });
  };

  useEffect(() => {
    getAllRecipientAction();
    getAllHouseholdAction();
    // change is a one of the attribute in application state, when it
    // changed, the useEffect will be invoke. Any change for the data is
    // just an two moves, one is use axio call to perform a specific move
    // and then grab all the data again.
  }, [change, getAllHouseholdAction, getAllRecipientAction]);

  const deleteRecipient = key => {
    deleteRecipientAction(key);
  };

  const save = async recipientId => {
    try {
      const recipientObj = await form.validateFields();
      editRecipientAction(recipientId, recipientObj);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'last_name',
      key: 'last_name',
      filteredValue: filteredInfo.recipient_last_name || null,
      onFilter: (value, record) => record.recipient_last_name.includes(value),
      sorter: (a, b) =>
        a.recipient_last_name.localeCompare(b.recipient_last_name),
      sortOrder: sortedInfo.columnKey === 'last_name' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return (
          <>{`${record.recipient_first_name}, ${record.recipient_last_name}`}</>
        );
      },
    },
    {
      title: 'Date of Birth',
      dataIndex: 'Date of Birth',
      key: 'Date of Birth',
      width: 140,
      filteredValue: filteredInfo.recipient_date_of_birth || null,
      onFilter: (value, record) =>
        record.recipient_date_of_birth.includes(value),
      sorter: (a, b) =>
        a.recipient_date_of_birth.localeCompare(b.recipient_date_of_birth),
      sortOrder: sortedInfo.columnKey === 'Date of Birth' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {record.recipient_date_of_birth}
          </div>
        );
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 100,
      key: 'gender',
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
        { text: 'Non Binary', value: 'Nonbinary' },
      ],
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record.gender === value,
      sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return <>{record.gender}</>;
      },
    },
    {
      title: 'Race',
      dataIndex: 'race',
      key: 'race',
      filters: [
        { text: 'Indian Native Alaskan', value: 'Indian Native Alaskan' },
        { text: 'Asian', value: 'Asian' },
        { text: 'Black', value: 'Black' },
        {
          text: 'Hawaiian Pacific Islander',
          value: 'Hawaiian Pacific Islander',
        },
        { text: 'White', value: 'White' },
        { text: 'Other', value: 'Some other race' },
      ],
      filteredValue: filteredInfo.race || null,
      onFilter: (value, record) => record.race.includes(value),
      sortOrder: sortedInfo.columnKey === 'race' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return <>{record.race}</>;
      },
    },
    {
      title: 'Ethnicity',
      dataIndex: 'ethnicity',
      key: 'ethnicity',
      width: 150,
      filters: [
        { text: 'Hispanic', value: 'Hispanic' },
        { text: 'Non-Hispanic', value: 'Non-Hispanic' },
      ],
      filteredValue: filteredInfo.ethnicity || null,
      onFilter: (value, record) => record.ethnicity.length === value.length,
      sortOrder: sortedInfo.columnKey === 'ethnicity' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return <>{record.ethnicity}</>;
      },
    },
    {
      title: 'Veteran',
      dataIndex: 'recipient_veteran_status',
      key: 'recipient_veteran_status',
      width: 100,
      filters: [
        { text: 'Veteran', value: true },
        { text: 'Not a Veteran', value: false },
      ],
      filteredValue: filteredInfo.recipient_veteran_status || null,
      onFilter: (value, record) => record.recipient_veteran_status === value,
      sortOrder: sortedInfo.columnKey === 'veteran_status' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {record.recipient_veteran_status ? 'Yes' : 'No'}
          </div>
        );
      },
    },
    {
      title: 'Household ID',
      dataIndex: 'household_id',
      key: 'household_id',
      filteredValue: filteredInfo.household_id || null,
      onFilter: (value, record) => record.household_id.includes(value),
      sorter: (a, b) => a.household_id.localeCompare(b.household_id),
      sortOrder: sortedInfo.columnKey === 'household_id' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return <>{record.household_id}</>;
      },
    },
    {
      title: 'Active',
      dataIndex: 'active_status',
      key: 'active_status',
      width: 100,
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
      filteredValue: filteredInfo.active_status || null,
      onFilter: (value, record) => record.active_status === value,
      sortOrder: sortedInfo.columnKey === 'active_status' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {record.active_status ? (
              <CheckCircleOutlined style={{ color: '#53c31b' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#FF4848' }} />
            )}
          </div>
        );
      },
    },
    {
      title: 'Setting',
      dataIndex: 'setting',
      key: 'setting',
      width: 70,
      render: (_, record) => {
        return (
          <Space
            size="large"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Typography.Link
              disabled={editingKey !== ''}
              style={{ color: '#1890FF' }}
              onClick={() => {
                setKey(record.recipient_id);
                setEditing(true);
              }}
            >
              {<SettingOutlined />}
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{}}>
      <EditRecipientForm
        visible={editing}
        onCreate={() => {
          alert('This is submited');
        }}
        onCancel={() => {
          setEditing(false);
        }}
        recipient_id={key}
      />
      {recipients.length < 1 && <LoadingOutlined className="loader" />},
      {recipients.length >= 1 && (
        <Form form={form} className="recipient-table">
          <Space style={{ marginBottom: 16 }} className="sort-recipient-form">
            <Button onClick={setFirstNameSort}>Sort Name</Button>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
          <Table
            onChange={handleChange}
            className="desktop-table"
            columns={columns}
            dataSource={recipients}
            size="small"
            tableLayout="fixed"
            rowKey={record => record.recipient_id}
          />
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recipients: state.recipient.recipients,
    change: state.recipient.change,
  };
};

export default connect(mapStateToProps, {
  getAllRecipientAction,
  getAllHouseholdAction,
  addRecipientAction,
  editRecipientAction,
  deleteRecipientAction,
})(RecipientTable);
