import SectionOutput from '../view/output.js';
import SectionInput from '../view/input.js';
import LineModel from '../../line/model/model.js';

export default class SectionController {
	constructor() {
		this.sectionOutput = new SectionOutput;
		this.sectionInput = new SectionInput;
		this.selectedLine;

		this.setLineNameButtonsHandler();
	}

	setLineNameButtonsHandler = () => {
		const sectionLineMenuButtons = this.sectionInput.sectionLineMenuButtons;

		for (let sectionLineMenuButton of sectionLineMenuButtons) {
			sectionLineMenuButton.addEventListener('click', this.selectLine);
		}
	}

	selectLine = event => {
		this.selectedLine = event.target.getAttribute('data-lineName');
		
		this.sectionOutput.showSelectedLineSectionContainer(this.selectedLine);

		this.setSectionAddButtonHandler();
		this.setDeleteButtonsHandler();
	}

	setSectionAddButtonHandler = () => {
		const sectionAddButton = document.getElementById('section-add-button');

		sectionAddButton.addEventListener('click', this.addSection);
	}

	addSection = () => {
		const sectionStationSelect = document.getElementById('section-station-selector').value;
		const sectionOrderInput = Number(document.getElementById('section-order-input').value);

		const lines = new LineModel().getLineStorageData();
		
		lines[this.selectedLine].splice(sectionOrderInput, 0, sectionStationSelect);

		new LineModel().setLineStorageData(lines);

		this.sectionOutput.showSelectedLineSectionContainer(this.selectedLine);
		this.setDeleteButtonsHandler();
	}

	setDeleteButtonsHandler = () => {
		const deleteButtons = document.getElementsByClassName('section-delete-button');
		for (let deleteButton of deleteButtons) {
			deleteButton.addEventListener('click', this.deleteSection);
		}
	}

	deleteSection = event => {
		const checkDelete = confirm('정말로 삭제하시겠습니까?');
		
		if (checkDelete === false) {
			return;
		}

		const tableRowToDelete = event.target.parentNode.parentNode;
		const selectedLineNameToDelete = tableRowToDelete.dataset.selectedlinename;
		const stationIndexToDelete = tableRowToDelete.dataset.stationindex;

		const lines = new LineModel().getLineStorageData();
		
		lines[this.selectedLine].splice(stationIndexToDelete, 1);

		new LineModel().setLineStorageData(lines);
		this.sectionOutput.showSelectedLineSectionContainer(this.selectedLine);
		this.setSectionAddButtonHandler();
		this.setDeleteButtonsHandler();
	}
}
