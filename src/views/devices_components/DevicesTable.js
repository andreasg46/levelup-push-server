import React, {useEffect, useState} from 'react'
import {CCard, CBadge, CButton, CCardHeader, CCardBody, CCardFooter, CSmartTable, CCol, CRow} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import {cilSend} from '@coreui/icons';
import {getBadge, getOS} from "../common";
import {SendPushToAll} from "../../OneSignalServer";

const DevicesTable = () => {
  const [data, setData] = useState([]);

  // Retrieve Users Devices
  useEffect(async () => {
    const url = 'https://onesignal.com/api/v1/players?app_id='.concat(process.env.REACT_APP_APP_ID) + '&limit=300&offset=offset';
    const options = {
      method: 'GET',
      headers: {Accept: 'text/plain', Authorization: 'Basic ' + `${process.env.REACT_APP_API_KEY}`}
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setData(json.players);
      })
      .catch(err => console.error('error:' + err));
  }, []);

  const columns = [
    {key: 'id', label: 'Player ID'},
    {key: 'email'},
    {key: 'device_model'},
    {key: 'device_type'},
    // { key: 'tags', _style: { width: '35%' } },
    {key: 'language'},
    {key: 'invalid_identifier', label: 'Status'},
    // {key: 'send', label: '', sorter: false, filter: false, _style: {width: '1%'}},
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
                sorterValue={{column: 'id', state: 'asc'}}
                tableProps={{striped: true, responsive: true}}
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
                  // send: (item) => (
                  //   <td>
                  //     <CButton color={'info'} value={JSON.stringify(item)} onClick={() => SendPushByEmail(item)}><CIcon icon={cilSend} /></CButton>
                  //   </td>
                  // ),
                }}
              />
            </CCardBody>
            <CCardFooter>
              <CButton color='warning' onClick={() => SendPushToAll()}>Send to all <CIcon icon={cilSend}/></CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DevicesTable

