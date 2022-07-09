import React, { useEffect, useState } from 'react'
import { CCard, CBadge, CButton, CCardHeader, CCardBody, CCardFooter, CSmartTable, CCol, CRow } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import { cilSend, cilTrash } from '@coreui/icons';
import { getBadge, getOS } from "../common";
import { DeleteDevice, getDevices, SendPushToAll } from "../../OneSignalServer";

const DevicesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve Users Devices

  useEffect(() => {
    Promise.resolve(
      getDevices())
      .then(function (value) {
        setData(value.players);
      });
  }, []);

  const resetData = () => {
    setLoading(true);
    Promise.resolve(
      getDevices())
      .then(function (value) {
        setData(value.players);
        setLoading(false);
      });
  }

  const columns = [
    { key: 'id', label: 'Player ID' },
    { key: 'email' },
    { key: 'device_model' },
    { key: 'device_type' },
    { key: 'language' },
    { key: 'invalid_identifier', label: 'Status' },
    { key: 'delete', label: '', sorter: false, filter: false, _style: { width: '1%' } },
  ];

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Push Service Devices Table</strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                loading={loading}
                sorterValue={{ column: 'id', state: 'asc' }}
                tableProps={{ striped: true, responsive: true }}
                items={data}
                columns={columns}
                itemsPerPage={50}
                pagination
                scopedColumns={{
                  email: (item) => {
                    return (
                      <td>
                        {item.tags.email}
                      </td>
                    )
                  },
                  device_type: (item) => {
                    return (
                      <td>
                        {getOS(item.device_type)}
                      </td>
                    )
                  },
                  classes: (item) => {
                    return (
                      <td>
                        {item.tags.classes}
                      </td>
                    )
                  },
                  invalid_identifier: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.invalid_identifier)}>{(item.invalid_identifier === true) ? 'Unsubscribed' : 'Subscribed'}</CBadge>
                    </td>
                  ),
                  delete: (item) => (
                    <td>

                      <CButton color={'danger'}
                        onClick={() => {
                          let text = 'Are you sure you want to delete device?!'
                          if (confirm(text) == true) {
                            Promise.resolve(
                              DeleteDevice(item.id)
                                .then(() => {
                                  resetData();
                                }))
                          }
                        }}

                      ><CIcon icon={cilTrash} /></CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
            <CCardFooter>
              <CButton color='warning' onClick={() => SendPushToAll()}>Send to all <CIcon icon={cilSend} /></CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DevicesTable

