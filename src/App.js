
import React, { Component } from 'react';
import {Card, Container, Row, Collapse, Col, Form, Button, ButtonToolbar, ToggleButton, ToggleButtonGroup, Popover, OverlayTrigger} from 'react-bootstrap';
import {Slider, Switch, Icon} from 'antd';
import axios from 'axios';
import './App.css';

const API = '/api/v1/course/filters?'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			courses: [],
			isLoading: false,
			err: false,
			dept: "Nothing",
			weekdays: [],
			semester: "Fall 2019",
			school: "Arts, Science, and Engineering",
			courses_raw_data: [],
			slider_val: [800,2400],
			cur_course: -1
		}

		this.ReMount = this.ReMount.bind(this)
		this.onSliderChange = this.onSliderChange.bind(this)
		this.time_filter = this.time_filter.bind(this)
		this.recordPopUpInfo = this.recordPopUpInfo.bind(this)
	}

	async componentDidMount() {
		this.setState({
			isLoading: true
		});

		console.log("TO ROWS")
		

		try{
			var courseRows = []
			var courseRows_raw = []
			const courseRow = <Card className="classCard" bg="dark" text="white" key="0">
					<Card.Body>
						<Card.Title>You have not chose anything</Card.Title>
						<Card.Text>
							Use the filter or search box to find courses
						</Card.Text>
					</Card.Body>
					<br />
				</Card>
			courseRows.push(courseRow)
			courseRows_raw.push([courseRow],800,2400)
			this.setState({
				courses: courseRows,
				courses_raw_data: courseRows_raw
			})
		} catch {
			this.setState({
				err: true,
				isLoading: false
			})
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			courses: nextProps.courses,
		})
	}

	async ReMount(subject, weekday){
		this.setState({
			isLoading: true,
			courses:[],
			courses_raw_data: [],
		});

		if (subject === 'NONE'){
			subject = this.state.dept
		}else{
			this.setState({
				dept: subject
			})
		}

		//The start_t and end_t
		const a = this.state.slider_val[0]
		const b = this.state.slider_val[1]

		console.log(subject);
		if (weekday !== 'NONE'){
			const weekdays = this.state.weekdays
			if (weekdays.includes(weekday)){
				var index = weekdays.indexOf(weekday)
				const newdays = weekdays.slice(0, index).concat(weekdays.slice(index+1,weekdays.length))
				this.setState({
					weekdays: newdays
				})
			}else{
				let days = this.state.weekdays
				days.push(weekday)
				this.setState({
					weekdays: days
				})
			}
		}

		try{
			var courseRows_raw = []
			let query = 'major=' + encodeURIComponent(subject) + '&semester=' + encodeURIComponent(this.state.semester)
			const weekdays = this.state.weekdays
			console.log(weekdays)
			weekdays.forEach((day)=>{
				query = query + '&weekdays=' + day
			})
			console.log(query)
			const response = await axios.get(API + query)
			console.log("wait over")
			console.log(response)
			var weekdayRow = ""
			const filtered = response.data
			for(var i= 0; i< filtered.length; i++) {
				weekdayRow = "";
				const cur_course = filtered[i];
				while (i < filtered.length && cur_course.id === filtered[i].id){
					weekdayRow = weekdayRow + " " + this.translate_weekday(filtered[i].weekday);
					i++
				}
				i--
				const courseRow = <Card className="classCard" bg="light" text="#383838" key={cur_course.key}>
          <Card.Body>
          <Row>
          <Col xs={10}>
            <Card.Title>{cur_course.cname}&nbsp;&nbsp;{cur_course.title}</Card.Title>
            <Card.Subtitle>CRN&nbsp;{cur_course.crn}&nbsp;&nbsp;Credit:&nbsp;{cur_course.credit}</Card.Subtitle>
            <Card.Text>
              <table>
              	<tbody>     
	          		<tr>
	          		 <td className="rowTitle">Time:</td>
	          		  <td id="time" width="30%">{cur_course.weekday}&nbsp;{cur_course.start_t}-{cur_course.end_t}</td>
	          		  <td className="rowTitle" id="location">Location: </td>
	          		  <td>{cur_course.location}</td>
	          		</tr>
	          		<tr>
	          		 <td className="rowTitle">Instructor:</td>
	          		 <td id="instructor">{cur_course.instructor}</td>
	          		</tr> 
	          	</tbody>
	          </table>
	          <table>
	          	<tbody>
	              <tr>       
	                <td className="rowTitle">Description:</td>
	                <td>{cur_course.description}</td>
	              </tr>
              </tbody>
              </table>
            </Card.Text>
           </Col>
           <Col xs={2}>
           	<div id="flag">
           		{cur_course.score} <br />

           	</div>
           </Col>
            </Row>
            <div className="cardButton">
              <Button id="select" variant="success">Select</Button>
              <Button id="wishlist" variant="danger">Add to wishlist</Button>
            </div>
            <button type="button" class="btn btn-info" data-toggle="modal" value={cur_course.id} data-target="#myModal" onClick={this.recordPopUpInfo}>Open Modal</button>
          </Card.Body>
          <br />
        </Card>
				courseRows_raw.push([courseRow,cur_course.start_t,cur_course.end_t])
			}
			var courseRows = this.time_filter(courseRows_raw, a, b)
			console.log(courseRows)
			this.setState({
				courses: courseRows,
				courses_raw_data: courseRows_raw
				//save raw_data as 3-tuple including elem, start_t, end_t
			})
		} catch {
			console.log("ERROR")
			this.setState({
				err: true,
				isLoading: false
			})
		}
	}

	recordPopUpInfo(e){
		console.log(e.target.value)
		this.setState({
			cur_course: e.target.value
		})
	}

	onSliderChange(value){
		var a = parseFloat(value[0])
		var b = parseFloat(value[1])
		a = parseInt(a/100.0 * 720.0)
		b = parseInt(b/100.0 * 720.0)
		if (a%60 !== 59){
			a = (8+Math.floor(a/60))*100 + (a%60)
		}else{
			a = (8+Math.floor(a/60))*100 + (a%60) + 41
		}
		if (b%60 !== 59){
			b = (8+Math.floor(b/60))*100 + (b%60)
		}else{
			b = (8+Math.floor(b/60))*100 + (b%60) + 41
		}
		if (b === 2000){
			b = 2400
		}
		console.log('onAfterChange: ', a, b);
		this.state.slider_val = [a,b]
		const courses = this.time_filter(this.state.courses_raw_data, a, b)
		console.log()
		this.setState({
			courses: courses
		})
	}

	time_filter(tuples,a,b){
		var courseRows = []
		for (var i=0; i< tuples.length; i++){
			if (tuples[i][1] >= a && tuples[i][2] <= b){
				courseRows.push(tuples[i][0])
			}
		}
		return courseRows
	}


	translate_weekday(abbr){
		if (abbr === "MON"){
			return "Monday"
		}
		if(abbr === "TUE"){
			return "Tuesday"
		}
		if(abbr === "WEN"){
			return "Wednsday"
		}
		if(abbr === "THU"){
			return "Thursday"
		}
		if(abbr === "FRI"){
			return "Friday"
		}
		if(abbr === "SAT"){
			return "Saturday"
		}
		if(abbr === "SUN"){
			return "Sunday"
		}
	}


//  }
render(){ 

	const marks = {
			0: '8am',
			8.33: '',
			16.66: '',
			25: '',
			33.32: 'Noon',
			41.65: '',
			50: '',
			58.31: '',
			66.64: '4pm',
			74.97: '',
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
				<div className="Container">
					<Row>
						<Col xs={0} md={0} lg={1}>
						</Col>
						<Col className="filterLarge" xs={12} md={3} lg={2}>
							<div container="true" className="filtersmall">

								<p id="filterWord">FILTER BY</p>

								<Form.Group as={Col} className="formGroup" controlId="formGridTerm">
									<Form.Control as="select" className="formControl" defaultValue= "Fall 2019">
										<option hidden>Term</option>
										<option></option>
										<option>Fall 2019</option>
									</Form.Control>
								</Form.Group>

								<Form.Group as={Col} className="formGroup" controlId="formGridSchool">
									<Form.Control as="select" className="formControl" defaultValue= "Arts, Science, and Engineering">
										<option hidden>School</option>
										<option></option>
										<option>Arts, Science, and Engineering</option>
									</Form.Control>
								</Form.Group>

								<Form.Group as={Col} className="formGroup" controlId="formGridDept">
										<Form.Control as="select" className="formControl" onChange={(event) => this.ReMount(event.target.value,"NONE")}>
												<option hidden>Department</option>
												<option></option>
												<option value="African &amp; African-American Studies">AAS - African &amp; African-American Studies</option>
												<option value="Art &amp; Art History">AH - Art &amp; Art History</option>
												<option value="Anthropology">ANT - Anthropology</option>
												<option value="Religion &amp; Classics  Arabic">ARA - Religion &amp; Classics - Arabic</option>
												<option value="American Sign Language">ASL - American Sign Language</option>
												<option value="Audio Music Engineering">AME - Audio Music Engineering</option>
												<option value="American Studies">AMS - American Studies</option>
												<option value="Astronomy">AST - Astronomy</option>
												<option value="Archeology Tech &amp; Hist Structure">ATH - Archeology Tech &amp; Hist Structure</option>
												<option value="Brain and Cognitive Sciences">BCS - Brain and Cognitive Sciences</option>
												<option value="Biology">BIO - Biology</option>
												<option value="Biomedical Engineering">BME - Biomedical Engineering</option>
												<option value="College of Arts &amp; Science">CAS - College of Arts &amp; Science</option>
												<option value="Religion &amp; Classics  Classical Greek">CGR - Religion &amp; Classics - Classical Greek</option>
												<option value="Chemical Engineering">CHE - Chemical Engineering</option>
												<option value="Modern Languages &amp; Cultures  Chinese">CHI - Modern Languages &amp; Cultures - Chinese</option>
												<option value="Chemistry">CHM - Chemistry</option>
												<option value="Religion &amp; Classics  Classical Studies">CLA - Religion &amp; Classics - Classical Studies</option>
												<option value="Modern Languages &amp; Cultures  Comparative Literature">CLT - Modern Languages &amp; Cultures - Comparative Literature</option>
												<option value="Computer Science">CSC - Computer Science</option>
												<option value="Clinical and Social Sciences in Psychology">CSP - Clinical and Social Sciences in Psychology</option>
												<option value="Center for Visual Science">CVS - Center for Visual Science</option>
												<option value="Dance">DAN - Dance</option>
												<option value="Data Science &amp; Computation">DSC - Data Science &amp; Computation</option>
												<option value="Digital Humanities">DH - Digital Humanities</option>
												<option value="Digital Media Studies">DMS - Digital Media Studies</option>
												<option value="Engineering and Applied Sciences">EAS - Engineering and Applied Sciences</option>
												<option value="Electrical and Computer Engineering">ECE - Electrical and Computer Engineering</option>
												<option value="Economics">ECO - Economics</option>
												<option value="Earth &amp; Environmental Science">EES - Earth &amp; Environmental Science</option>
												<option value="Environmental Humanities">EHU - Environmental Humanities</option>
												<option value="English Language Program">ELP - English Language Program</option>
												<option value="English">ENG - English</option>
												<option value="Alternative Energy">ERG - Alternative Energy</option>
												<option value="Film and Media Studies">FMS - Film and Media Studies</option>
												<option value="Modern Languages &amp; Cultures  French">FR - Modern Languages &amp; Cultures - French</option>
												<option value="Modern Languages &amp; Cultures  German">GER - Modern Languages &amp; Cultures - German</option>
												<option value="Gender, Sexuality &amp; Women's Studies">GSW - Gender, Sexuality &amp; Women's Studies</option>
												<option value="Religion &amp; Classics  Greek">GRK - Religion &amp; Classics - Greek</option>
												<option value="Religion &amp; Classics  Hebrew">HEB - Religion &amp; Classics - Hebrew</option>
												<option value="History">HIS - History</option>
												<option value="Health and Society">HLS - Health and Society</option>
												<option value="Intensive English Program">IEP - Intensive English Program</option>
												<option value="International Relations">IR - International Relations</option>
												<option value="Modern Languages &amp; Cultures  Italian">IT - Modern Languages &amp; Cultures - Italian</option>
												<option value="Modern Languages &amp; Cultures  Japanese">JPN - Modern Languages &amp; Cultures - Japanese</option>
												<option value="Judaic Studies">JST - Judaic Studies</option>
												<option value="Modern Languages &amp; Cultures  Korean">KOR - Modern Languages &amp; Cultures - Korean</option>
												<option value="Religion &amp; Classics  Latin">LAT - Religion &amp; Classics - Latin</option>
												<option value="Linguistics">LIN - Linguistics</option>
												<option value="Literary Translation Studies">LTS - Literary Translation Studies</option>
												<option value="Mathematics">MTH - Mathematics</option>
												<option value="Materials Science">MSC - Materials Science</option>
												<option value="Mechanical Engineering">ME - Mechanical Engineering</option>
												<option value="Music">MUR - Music</option>
												<option value="Naval Science">NAV - Naval Science</option>
												<option value="Neuroscience">NSC - Neuroscience</option>
												<option value="Optics">OPT - Optics</option>
												<option value="Wallis Institute of Political Economics">PEC - Wallis Institute of Political Economics</option>
												<option value="Public Health">PH - Public Health</option>
												<option value="Philosophy">PHL - Philosophy</option>
												<option value="Photographic Preservation &amp; Collections Management">PPC - Photographic Preservation &amp; Collections Management</option>
												<option value="Physics">PHY - Physics</option>
												<option value="Modern Languages &amp; Cultures  Polish">POL - Modern Languages &amp; Cultures - Polish</option>
												<option value="Modern Languages &amp; Cultures  Portuguese">POR - Modern Languages &amp; Cultures - Portuguese</option>
												<option value="Political Science">PSC - Political Science</option>
												<option value="Psychology">PSY - Psychology</option>
												<option value="Religion and Classics">REL - Religion and Classics</option>
												<option value="Modern Languages &amp; Cultures  Russian Studies">RST - Modern Languages &amp; Cultures - Russian Studies</option>
												<option value="Modern Languages &amp; Cultures  Russian">RUS - Modern Languages &amp; Cultures - Russian</option>
												<option value="Art &amp; Art HistoryStudio Arts">SA - Art &amp; Art History-Studio Arts</option>
												<option value="Study Abroad">SAB - Study Abroad</option>
												<option value="Social Entrepreneurship">SEN - Social Entrepreneurship</option>
												<option value="Religion &amp; Classics  Sanskrit">SKT - Religion &amp; Classics - Sanskrit</option>
												<option value="Sociology">SOC - Sociology</option>
												<option value="Modern Languages &amp; Cultures  Spanish">SP - Modern Languages &amp; Cultures - Spanish</option>
												<option value="Statistics">STT - Statistics</option>
												<option value="Sustainability">SUS - Sustainability</option>
												<option value="TEAM Computer Science">TCS - TEAM Computer Science</option>
												<option value="TEAM Biomedical Engineering">TEB - TEAM Biomedical Engineering</option>
												<option value="TEAM Chemical Engineering">TEC - TEAM Chemical Engineering</option>
												<option value="TEAM Electrical Engineering">TEE - TEAM Electrical Engineering</option>
												<option value="Technical Entrepreneurship Management">TEM - Technical Entrepreneurship Management</option>
												<option value="TEAM Optics">TEO - TEAM Optics</option>
												<option value="TEAM Mechanical Engineering">TME - TEAM Mechanical Engineering</option>
												<option value="Religion &amp; Classics  Turkis">TUR - Religion &amp; Classics - Turkish</option>
												<option value="Gender, Sexuality &amp; Women's Studies">WST - Women's Studies (see GSW for current courses)</option>
												<option value="Writing Program">WRT - Writing Program</option>
										</Form.Control>

								<div className="sliderbox">
										<Slider range marks={marks} step={null} tooltipVisible={false} defaultValue={[0,100]} onAfterChange={this.onSliderChange}/>
								</div>

								<ButtonToolbar xs={12} md={3} lg={2}>
									<ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
										<ToggleButton value={'MON'} onChange={(event) => this.ReMount('NONE', event.target.value)}>M</ToggleButton>
										<ToggleButton value={'TUE'} onChange={(event) => this.ReMount('NONE', event.target.value)}>T</ToggleButton>
										<ToggleButton value={'WEN'} onChange={(event) => this.ReMount('NONE', event.target.value)}>W</ToggleButton>
										<ToggleButton value={'THU'} onChange={(event) => this.ReMount('NONE', event.target.value)}>Th</ToggleButton>
										<ToggleButton value={'FRI'} onChange={(event) => this.ReMount('NONE', event.target.value)}>F</ToggleButton>
									</ToggleButtonGroup>
								</ButtonToolbar>

								</Form.Group>
								
							</div>
						</Col>
						<Col xs={12} md={7} lg={7}>
							{this.state.courses}
						</Col>
						<Col xs={0} md={2} lg={1}>
								<OverlayTrigger trigger="click" placement="left" overlay={popover}>
									<Button className="schedulePop btn-info" variant="success">Schedule</Button>
								</OverlayTrigger>

								<OverlayTrigger  trigger="click" placement="left" overlay={popover}>
									<Button className="dashPop btn-info" variant="success">Dashboard</Button>
								</OverlayTrigger>
							

						</Col>
						<Col xs={0} md={0} lg={1}>
						</Col>
					</Row>

				<div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			    <div class="modal-dialog">
			        <div class="modal-content">
			            <div class="modal-header">
			                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			                <h4 class="modal-title" id="myModalLabel">{this.state.cur_course}</h4>
			            </div>
			            <div class="modal-body">
			            	<Row>
			            		<Col xs={8}>
		            			  <Card className="classCard" bg="light" text="#383838" key={this.state.cur_course.key}>
	            			           <Card.Body>
	            			           <Row>
		            			           <Col xs={10}>
		            			             <Card.Title>{this.state.cur_course}&nbsp;&nbsp;TITLE</Card.Title>
		            			             <Card.Subtitle>CRN&nbsp;12345&nbsp;&nbsp;Credit:&nbsp;4.0</Card.Subtitle>
		            			             <Card.Text>
		            			               <table>
		            			               	<tbody>      
		            			                   <tr>       
		            			                     <td className="rowTitle">Description:</td>
		            			                     <td>Lorem Ipsum</td>
		            			                   </tr>
		            			                   <tr>
		            			                    <td className="rowTitle">Time:</td>
		            			                     <td id="time">Monday&nbsp;900-1015</td>
		            			                   </tr>
		            			                   <tr>
		            			                     <td className="rowTitle" id="location">Location: </td>
		            			                     <td>Wegmans 1101</td>
		            			                   </tr>
		            			                   <tr>
		            			                    <td className="rowTitle">Instructor:</td>
		            			                    <td id="instructor">Ferguson, George</td>
		            			                   </tr>
		            			               </tbody>
		            			               </table>
		            			             </Card.Text>
		            			            </Col>
		            			            <Col xs={2}>
		            			            	<div id="flag">
		            			            		10 <br />

		            			            	</div>
		            			            </Col>
		            			             </Row>
		            			             <div className="cardButton">
		            			               <Button id="select" variant="success">Select</Button>
		            			               <Button id="wishlist" variant="danger">Add to wishlist</Button>
		            			             </div>
		            			           </Card.Body>
		            			           <br />
		            			         </Card>
				            			</Col>
			            		<Col xs={4}>
			            			<div class="flip-div">
            			               <div class="flip-main">
            			                   <div class="front">
            			                       <div class="card">
            			                           <div class="card-body text-center pb-2">
            			                               <p><img class="rounded-circle" src="http://nicesnippets.com/demo/profile-2.png" /></p>
            			                               <h5 class="card-title"><strong>Nike Tyson</strong></h5>
            			                               <p class="card-text">This is basic user profile with image, title, detail and button.</p>
            			                               <a href="#" class="btn btn-info btn-sm"><i class="fa fa-arrow-right"></i></a>
            			                           </div>
            			                       </div>
            			                   </div>
            			                   <div class="back rounded">
            			                       <div class="card">
            			                           <div class="card-body text-center">
            			                               <h4 class="card-title"><strong>Nike Tyson</strong></h4>
            			                               <p class="card-text">University</p>
            			     
            			                           </div>
            			                       </div>
            			                   </div>
			            			    </div>
			            			</div>           
			            		</Col>
			            	</Row>
			            </div>
			            
			        </div>
			    </div>
			</div>
				</div>
			</div>
		);
	}
}

export default App;
