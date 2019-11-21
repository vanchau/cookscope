/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import '../css/ReportWindow.css'

const ReportWindow = ({ show, handleClose, recipeID, reporterID }) => {

  const emptyReport = {
    reportType: '',
    description: '',
    recipeID: recipeID,
    reporterID: reporterID
  }

  const [report, setReport] = useState(emptyReport)
  const [error, setError] = useState(null)
  const [completed, setCompleted] = useState(false)

  const handleChange = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value
    setReport({
      ...report,
      [targetName]: targetValue
    })
  }

  const closeWindow = () => {
    setCompleted(false)
    setReport(emptyReport)
    setError(null)
    handleClose()
  }

  const submitReport = (event) => {
    event.preventDefault()
    if (!report.reportType) {
      setError('Please select a problem type')
    } else {
      setCompleted(true)
    }
  }

  return (
    <Modal show={show} onHide={closeWindow}>
      {completed
        ?
        <React.Fragment>
          <Modal.Header>
            <Modal.Title>Thank you</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						We will look into the problem and take necessary measures.
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeWindow}>
							Close
            </Button>
          </Modal.Footer>
        </React.Fragment>
        :
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title className='report-text' >File a report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitReport}>
              <Form.Group className='report-text'>
                <Form.Label style={{ fontWeight: 'bold' }}>Tell us the problem</Form.Label>
                <br></br>
                <div key='default-radio'>
                  <Form.Check
                    label='This account may be compromised'
                    name='reportType'
                    type='radio'
                    id='type-A'
                    value='type-A'
                    checked={report.reportType === 'type-A'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    label='This user is abusive'
                    name='reportType'
                    type='radio'
                    id='type-B'
                    value='type-B'
                    checked={report.reportType === 'type-B'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    label='This recipe may be subjected to plagiarism'
                    name='reportType'
                    type='radio'
                    id='type-C'
                    value='type-C'
                    checked={report.reportType === 'type-C'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    label='Other'
                    name='reportType'
                    type='radio'
                    id='itype-D'
                    value='type-D'
                    checked={report.reportType === 'type-D'}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              <Form.Group className='report-text' controlId='recipeStory'>
                <Form.Label>Please provide any additional info here</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='2'
                  name='description'
                  onChange={handleChange}
                />
              </Form.Group>

              <div className='text-right'>
                <Button variant='danger' type='submit' style={{ marginTop: '1em' }} >Report</Button>
                {error && <p style={{ color: 'red', fontSize: '1rem', textAlign: 'center' }}>{error}</p>}
              </div>
            </Form>
          </Modal.Body>
        </React.Fragment>
      }
    </Modal>)
}

export default ReportWindow