import React, {useEffect, useState} from 'react'
import {
  CCard,
  CButton,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CSmartTable,
  CCol,
  CRow,
  CForm, CFormLabel, CFormSelect, CFormInput, CFormTextarea
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import {cilSend} from '@coreui/icons';
import {today, currentTime} from "../helpers";
import {SendPushByEmail} from "../../OneSignalServer";

const columns = [
  {key: 'id', label: 'ID'},
  {key: 'code', label: 'Classroom code'},
  {key: 'email', label: 'Student email'},
  {key: 'send', label: '', sorter: false, filter: false, _style: {width: '1%'}},
];

const MainComponent = () => {
  const [enrolmentsData, setEnrolmentsData] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const [campaign, setCampaign] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [deliveryTime, setDeliveryTime] = useState('09:00');
  const [message, setMessage] = useState('');

  let selectedClassroomAPI = '';
  // let emailsList = [];
  const [emailsList, setEmailsList] = useState([]);

  // Retrieve Classrooms for Dropdown
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}` + '/classrooms';
    const options = {
      method: 'GET',
      headers: {Accept: 'text/plain'}
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        let arr = [...[{code: "Select Classroom"}], ...json.data];
        arr.map(item => item['label'] = (item.title) ? (item.code) : ('Select Classroom'))
        arr.map(item => item['value'] = item.code);
        setClassrooms(arr);
      })
      .catch(err => console.error('error:' + err));
  }, []);

  // Retrieve Enrolments by Class Code
  const GetEnrolmentsByCode = () => {
    const url = `${process.env.REACT_APP_API_URL}` + '/enrolment/' + selectedClassroomAPI;
    const options = {
      method: 'GET',
      headers: {Accept: 'text/plain'}
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        let tmpEmailsList = [];
        setEnrolmentsData(json.data);

        if (json.data.length > 0) {
          json.data.map((item) => {
            tmpEmailsList.push(item.email);
          })
        }
        setEmailsList(tmpEmailsList);
      })
      .catch(err => console.error('error:' + err));
  }

  // Change Selected Classroom
  const handleSelectClassroom = (e) => {
    setSelectedClassroom(e.target.value);
    selectedClassroomAPI = (e.target.value);

    GetEnrolmentsByCode();

  }

  const handleSubmit = () => {
    let startDatetime = new Date(startDate + ', ' + deliveryTime);
    let endDatetime = new Date(startDate + ', ' + '23:59');
    let body = {
      classroom: selectedClassroom,
      campaign: campaign,
      frequency: frequency,
      startDate: startDatetime,
      endDate: endDatetime,
      message: message
    }

    console.log(body);


    if (selectedClassroom === '' || message === '') {
      alert('Please select classroom and enter a push message!')
    } else if (emailsList.length > 0) {
      emailsList.map((item) => {
        SendPushByEmail(item, message, campaign, startDatetime)
      })
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CForm onSubmit={handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Send Push notifications</strong> <small>Enrolments Table</small>
              </CCardHeader>
              <CCardBody>
                <CRow className="g-3">
                  <CCol md={3}>
                    <CFormLabel htmlFor="inputState">Class</CFormLabel>
                    <CFormSelect
                      required
                      value={selectedClassroom}
                      onChange={handleSelectClassroom}
                      options={classrooms}/>
                  </CCol>
                  <br></br>
                  <CSmartTable
                    sorterValue={{column: 'id', state: 'asc'}}
                    tableProps={{striped: true, responsive: true}}
                    items={enrolmentsData}
                    columns={columns}
                    columnSorter
                    itemsPerPage={50}
                    pagination
                    scopedColumns={{
                      send: (item) => (
                        <td>
                          <CButton color={'info'} value={JSON.stringify(item)}
                                   onClick={() => SendPushByEmail(item.email, message)}><CIcon
                            icon={cilSend}/></CButton>
                        </td>
                      ),
                    }}
                  />
                  <CCol md={3}>
                    <CFormLabel htmlFor="inputState">Campaign Name</CFormLabel>
                    <CFormInput placeholder="My Campaign" aria-label="Campaign"
                                onChange={(e) => setCampaign(e.target.value)}/>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="inputState">Frequency</CFormLabel>
                    <CFormSelect id="inputState" defaultValue={'Once per day'}
                                 onChange={(e) => setFrequency(e.target.value)}>
                      <option>Once per day</option>
                      <option>Once per week</option>
                      <option>Once per month</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel htmlFor="inputState">Start Date</CFormLabel>
                    <CFormInput type={'date'} defaultValue={today} onChange={(e) => setStartDate(e.target.value)}
                                aria-label="Date"/>
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel htmlFor="inputState">End Date</CFormLabel>
                    <CFormInput type={'date'} defaultValue={today} onChange={(e) => setEndDate(e.target.value)}
                                aria-label="Date"/>
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel htmlFor="inputState">Delivery Time</CFormLabel>
                    <CFormInput type={'time'} defaultValue={currentTime}
                                onChange={(e) => setDeliveryTime(e.target.value)}
                                aria-label="Time"/>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="inputState">Message</CFormLabel>
                    <CFormTextarea onChange={(e) => setMessage(e.target.value)}
                                   placeholder="Type your push notification message" aria-label="Message"/>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter style={{textAlign: 'end'}}>
                <CButton type={"submit"}>Submit <CIcon icon={cilSend}/></CButton>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}

export default MainComponent

