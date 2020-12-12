import StationModel from '../../station/model/model.js';
import LineModel from '../../line/model/model.js';
import SectionModel from '../model/model.js';

export default class SectionOutput {
	constructor() {

		this.showLineNameButtons();
	}

	showLineNameButtons = () => {
		const lines = new LineModel().getLineStorageData();
		const sectionContainer = document.getElementById('section-container');
		const sectionLineMenuButtonContainer = document.createElement('div');
		sectionContainer.appendChild(sectionLineMenuButtonContainer);
		sectionLineMenuButtonContainer.setAttribute('id', 'section-line-menu-button-container');
		
		for (let line of lines) {
			sectionLineMenuButtonContainer.innerHTML += `<button class="section-line-menu-button" data-lineName=${line.lineName}>${line.lineName}</button> `;
		}
	}

	showSelectedLineSectionContainer = selectedLine => {
		const sectionContainer = document.getElementById('section-container');
		const selectedLineSectionContainer = document.createElement('div');

		selectedLineSectionContainer.setAttribute('id', 'selected-line-section-container');
		sectionContainer.appendChild(selectedLineSectionContainer);
		selectedLineSectionContainer.innerHTML = 
		`
		<h3>${selectedLine}</h3>
		<h4>구간 등록</h4>
		<select id="section-station-selector"></select>
		<input type="number" id="section-order-input" placeholder="순서"/>
		<button id="section-add-button">등록</button>
		`;

		this.addStationsToSelectorTag();
	}

	addStationsToSelectorTag = () => {
		const stations = new StationModel().getStationStorageData();
		const sectionStationSelector = document.getElementById('section-station-selector');

		for (let station of stations) {
			let option = document.createElement('option');
			let optionText = document.createTextNode(station.stationName);
			option.appendChild(optionText);
			sectionStationSelector.appendChild(option);
		}
	}
}