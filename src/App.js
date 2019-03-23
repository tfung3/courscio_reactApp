
import React, { Component } from 'react';
import {Card, Container, Row, Col, Form, Button, ButtonToolbar, ToggleButton, ToggleButtonGroup, Popover, OverlayTrigger} from 'react-bootstrap';
import {Slider, Switch, Icon} from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    const course = [
      {id: 0, title: "Math", overview:"bullshit"},
      {id: 1, title: "Heat", overview:"bullshit"},
    ] 

    var courseRows = []
    course.forEach((course) => {
      console.log(course.title)
      const courseRow = <Card className="classCard" bg="dark" text="white" key={course.id}>
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>
                {course.overview}
              </Card.Text>
            </Card.Body>
            <br />
          </Card>
      
      courseRows.push(courseRow)
    })

    this.state = {rows: courseRows }


  }
  render(){ 
    const marks = {
      0: '8am',
      8.33: '',
      16.66: '',
      25: '11am',
      33.32: '',
      41.65: '',
      50: '2pm',
      58.31: '',
      66.64: '',
      74.97: '5pm',
      83.3: '',
      91.63: '',
      100: '8pm+'
    };

    const popover = (
                <Popover id="popover-basic" title="Popover right">
                  And here's some <strong>amazing</strong> content. It's very engaging. right?
                </Popover>
              );

    return (
      <div className="App">
        <div Container>

          <Row>
            <Col className="filterLarge" xs={0} md={0} lg={1}>
            </Col>
            <Col className="filterLarge" xs={12} md={3} lg={2}>
              <div container className="filtersmall">

                <p id="filterWord">FILTER BY</p>

                <Form.Group as={Col} className="formGroup" controlId="formGridTerm">
                  <Form.Control as="select" className="formControl">
                    <option hidden>Term</option>
                    <option>Fall 2019</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} className="formGroup" controlId="formGridSchool">
                  <Form.Control as="select" className="formControl">
                    <option hidden>School</option>
                    <option>Arts, Science, and Engineering</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} className="formGroup" controlId="formGridDept">
                    <Form.Control as="select" className="formControl">
                        <option hidden>Department</option>
                        <option value="AAS">AAS - African &amp; African-American Studies</option>
                        <option value="AH">AH - Art &amp; Art History-Art History</option>
                        <option value="ANT">ANT - Anthropology</option>
                        <option value="ARA">ARA - Religion &amp; Classics - Arabic</option>
                        <option value="ASL">ASL - American Sign Language</option>
                        <option value="AME">AME - Audio Music Engineering</option>
                        <option value="AMS">AMS - American Studies</option>
                        <option value="AST">AST - Astronomy</option>
                        <option value="ATH">ATH - Archeology Tech &amp; Hist Structure</option>
                        <option value="BCS">BCS - Brain and Cognitive Sciences</option>
                        <option value="BIO">BIO - Biology</option>
                        <option value="BME">BME - Biomedical Engineering</option>
                        <option value="CAS">CAS - College of Arts &amp; Science</option>
                        <option value="CGR">CGR - Religion &amp; Classics - Classical Greek</option>
                        <option value="CHE">CHE - Chemical Engineering</option>
                        <option value="CHI">CHI - Modern Languages &amp; Cultures - Chinese</option>
                        <option value="CHM">CHM - Chemistry</option>
                        <option value="CLA">CLA - Religion &amp; Classics - Classical Studies</option>
                        <option value="CLT">CLT - Modern Languages &amp; Cultures - Comparative Literature</option>
                        <option value="CSC">CSC - Computer Science</option>
                        <option value="CSP">CSP - Clinical and Social Sciences in Psychology</option>
                        <option value="CVS">CVS - Center for Visual Science</option>
                        <option value="DAN">DAN - Dance</option>
                        <option value="DSC">DSC - Data Science &amp; Computation</option>
                        <option value="DH">DH - Digital Humanities</option>
                        <option value="DMS">DMS - Digital Media Studies</option>
                        <option value="EAS">EAS - Engineering and Applied Sciences</option>
                        <option value="ECE">ECE - Electrical and Computer Engineering</option>
                        <option value="ECO">ECO - Economics</option>
                        <option value="EES">EES - Earth &amp; Environmental Science</option>
                        <option value="EHU">EHU - Environmental Humanities</option>
                        <option value="ELP">ELP - English Language Program</option>
                        <option value="ENG">ENG - English</option>
                        <option value="ERG">ERG - Alternative Energy</option>
                        <option value="FMS">FMS - Film and Media Studies</option>
                        <option value="FR">FR - Modern Languages &amp; Cultures - French</option>
                        <option value="GER">GER - Modern Languages &amp; Cultures - German</option>
                        <option value="GSW">GSW - Gender, Sexuality &amp; Women's Studies</option>
                        <option value="GRK">GRK - Religion &amp; Classics - Greek</option>
                        <option value="HEB">HEB - Religion &amp; Classics - Hebrew</option>
                        <option value="HIS">HIS - History</option>
                        <option value="HLS">HLS - Health and Society</option>
                        <option value="IEP">IEP - Intensive English Program</option>
                        <option value="IR">IR - International Relations</option>
                        <option value="IT">IT - Modern Languages &amp; Cultures - Italian</option>
                        <option value="JPN">JPN - Modern Languages &amp; Cultures - Japanese</option>
                        <option value="JST">JST - Judaic Studies</option>
                        <option value="KOR">KOR - Modern Languages &amp; Cultures - Korean</option>
                        <option value="LAT">LAT - Religion &amp; Classics - Latin</option>
                        <option value="LIN">LIN - Linguistics</option>
                        <option value="LTS">LTS - Literary Translation Studies</option>
                        <option value="MTH">MTH - Mathematics</option>
                        <option value="MSC">MSC - Materials Science</option>
                        <option value="ME">ME - Mechanical Engineering</option>
                        <option value="MUR">MUR - Music</option>
                        <option value="NAV">NAV - Naval Science</option>
                        <option value="NSC">NSC - Neuroscience</option>
                        <option value="OPT">OPT - Optics</option>
                        <option value="PEC">PEC - Wallis Institute of Political Economics</option>
                        <option value="PH">PH - Public Health</option>
                        <option value="PHL">PHL - Philosophy</option>
                        <option value="PPC">PPC - Photographic Preservation &amp; Collections Management</option>
                        <option value="PHY">PHY - Physics</option>
                        <option value="POL">POL - Modern Languages &amp; Cultures - Polish</option>
                        <option value="POR">POR - Modern Languages &amp; Cultures - Portuguese</option>
                        <option value="PSC">PSC - Political Science</option>
                        <option value="PSY">PSY - Psychology</option>
                        <option value="REL">REL - Religion and Classics</option>
                        <option value="RST">RST - Modern Languages &amp; Cultures - Russian Studies</option>
                        <option value="RUS">RUS - Modern Languages &amp; Cultures - Russian</option>
                        <option value="SA">SA - Art &amp; Art History-Studio Arts</option>
                        <option value="SAB">SAB - Study Abroad</option>
                        <option value="SEN">SEN - Social Entrepreneurship</option>
                        <option value="SKT">SKT - Religion &amp; Classics - Sanskrit</option>
                        <option value="SOC">SOC - Sociology</option>
                        <option value="SP">SP - Modern Languages &amp; Cultures - Spanish</option>
                        <option value="STT">STT - Statistics</option>
                        <option value="SUS">SUS - Sustainability</option>
                        <option value="TCS">TCS - TEAM Computer Science</option>
                        <option value="TEB">TEB - TEAM Biomedical Engineering</option>
                        <option value="TEC">TEC - TEAM Chemical Engineering</option>
                        <option value="TEE">TEE - TEAM Electrical Engineering</option>
                        <option value="TEM">TEM - Technical Entrepreneurship Management</option>
                        <option value="TEO">TEO - TEAM Optics</option>
                        <option value="TME">TME - TEAM Mechanical Engineering</option>
                        <option value="TUR">TUR - Religion &amp; Classics - Turkish</option>
                        <option value="WST">WST - Women's Studies (see GSW for current courses)</option>
                        <option value="WRT">WRT - Writing Program</option>
                      </Form.Control>

                <div className="sliderbox">
                    <Slider range marks={marks} step={null} tooltipVisible={false} defaultValue={[0,38.45]} />
                </div>

                <ButtonToolbar>
                  <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
                    <ToggleButton value={'Mon'}>M</ToggleButton>
                    <ToggleButton value={'Tues'}>T</ToggleButton>
                    <ToggleButton value={'Wed'}>W</ToggleButton>
                    <ToggleButton value={'Thurs'}>Th</ToggleButton>
                    <ToggleButton value={'Fri'}>F</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>



                </Form.Group>
                



              </div>
            </Col>
            <Col xs={12} md={7} lg={7}>
              {this.state.rows}
            </Col>
            <Col xs={0} md={2} lg={1}>
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                  <Button className="schedulePop" variant="success">Schedule</Button>
                </OverlayTrigger>

                <OverlayTrigger  trigger="click" placement="left" overlay={popover}>
                  <Button className="dashPop" variant="success">Dashboard</Button>
                </OverlayTrigger>
              

            </Col>
            <Col xs={0} md={0} lg={1}>
            </Col>
          </Row>
        </div>
      </div>


    );
  }
}

export default App;
