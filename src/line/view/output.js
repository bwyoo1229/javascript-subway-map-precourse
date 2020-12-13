import StationModel from '/src/station/model/model.js';
import LineInput from './input.js';
import LineModel from '../model/model.js';

export default class LineOutput {
	constructor() {
		this.lineInput = new LineInput();
		
		this.addStationToLineStartStationSelector();
		this.addStationToLineEndStationSelector();
		this.showLineTable();
	}

	addStationToLineStartStationSelector = () => {
		this.addStationsToSelectorTag(this.lineInput.lineStartStationSelector);
	}

	addStationToLineEndStationSelector = () => {
		this.addStationsToSelectorTag(this.lineInput.lineEndStationSelector);
	}

	addStationsToSelectorTag = selector => {
		const stations = new StationModel().getStationStorageData();

		for (let station in stations) {
			let option = document.createElement('option');
			let optionText = document.createTextNode(station);
			option.appendChild(optionText);
			selector.appendChild(option);	
		}
	}

	showLineTable = () => {
		this.clearLineTable();

		const lines = new LineModel().getLineStorageData();
		const lineContainer = document.getElementById('line-container');
		const lineTable = this.createLineTable(lines);

		lineContainer.appendChild(lineTable);
	}

	clearLineTable = () => {
		const lineTable = document.getElementById('line-table');

		if (lineTable != null) {
			lineTable.remove();
		}
	}

	createLineTable = lines => {
		const lineTable = document.createElement('table');
		lineTable.setAttribute('id', 'line-table');
		
		this.createLineTableHeader(lineTable);
		this.createLineTableData(lineTable, lines);

		return lineTable;
	}

	createLineTableHeader = lineTable => {
		lineTable.innerHTML = 
		`
		<tr>
			<th>노선 이름</th>
			<th>상행 종점역</th>
			<th>하행 종점역</th>
			<th>설정</th>
		</tr>
		`;
	}

	createLineTableData = (lineTable, lines) => {
		for (let line in lines) {
			lineTable.innerHTML += 
			`
			<tr data-lineName=${line}>
				<td>${line}</td>
				<td>${lines[line][0]}</td>
				<td>${lines[line][lines[line].length - 1]}</td>
				<td><button class="line-delete-button">삭제</button>
			</tr>
			`;
		}
	}
}