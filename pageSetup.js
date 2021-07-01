// setting up config section

body.onload = () => (configSectie.style.left = '65%');

toggleConfigView = function () {
	toggle([configSectie], ['style', 'left'], ['65%', '99%']);
};
configPuller.onclick = toggleConfigView;
toggleVinkje = function (e) {
	let bloemetje = e.target.closest('tr');
	let vinkje = bloemetje.getElementsByTagName('img')[0];
	if (vinkje.style.visibility === 'visible') {
		vinkje.style.visibility = 'hidden';
		bloemetje.style['font-weight'] = 'normal';
		bloemetje.classList.remove('chosen');
	} else {
		vinkje.style.visibility = 'visible';
		bloemetje.style['font-weight'] = 'bold';
		bloemetje.classList.add('chosen');
	}
};
highlightBloemInConfig = function (e) {
	//let tableBody = document.getElementById('configTableBody');
	let rowElement = e.target.closest('tr');
	for (let row of rowElement.parentElement.children) {
		row.style.fontWeight = 'normal';
	}
	rowElement.style.fontWeight = 'bold';
};
highlightConfigHeader = function (highLightedElement) {
	let configHeaders = document.getElementById('configTabs');
	for (child of configHeaders.children) {
		child.style.opacity = '0.6';
		child.style.fontWeight = 'normal';
	}
	highLightedElement.style.opacity = '1';
	highLightedElement.style.fontWeight = 'bold';
};
function clearTemp() {
	configInhoud.innerHTML = '';
	flitsSectie.innerHTML = '';
	weergaveSectie.innerHTML = '';
}

function createBloemElementen(withVinkje = true) {
	let table = create_element('table');
	let tableHead = create_element('thead');
	let headerRow = create_element('tr');
	let headerName = create_element('th', 'naam');
	let headerBloeitijd = create_element('th', 'bloeitijd');
	headerRow.appendChild(headerName);
	headerRow.appendChild(headerBloeitijd);
	tableHead.appendChild(headerRow);
	table.appendChild(tableHead);

	let tableBody = create_element('tbody', '', [], 'configTableBody');
	for (let bloem of bloemen) {
		let newRow = create_element('tr', '', ['bloemRow'], '', {
			naam: bloem.naam,
		});
		let nameData = create_element('td', '', ['bloemnaamContainer']);

		let bloemP = create_element('p', bloem.naam);
		if (withVinkje) {
			let vinkje = create_element('img', '', [], '', {
				src: './resources/vinkje.jpeg',
			});
			newRow.onclick = toggleVinkje;
			nameData.appendChild(vinkje);
		} else {
			newRow.addEventListener('click', highlightBloemInConfig);
			newRow.addEventListener('click', showBloemInfo);
		}
		nameData.appendChild(bloemP);
		newRow.appendChild(nameData);
		let bloeitijdData = create_element('td', '', ['bloeitijdContainer']);
		let bloeitijdP = create_element('p', bloem.bloeitijd);
		bloeitijdData.appendChild(bloeitijdP);
		newRow.append(bloeitijdData);
		tableBody.append(newRow);
	}
	table.appendChild(tableBody);
	configInhoud.appendChild(table);
}

function createFlitsConfigSectie() {
	clearTemp();
	highlightConfigHeader(flitsConfigHeader);

	configInhoud.appendChild(
		create_element('h3', 'kies de bloemen waar je mee wilt flitsen.')
	);
	createBloemElementen(true);

	let flitsBtn = create_element('button', 'begin met flitsen.');
	flitsBtn.onclick = startFlitsen;
	configInhoud.appendChild(flitsBtn);
}

function createInfoConfigSectie() {
	clearTemp();
	highlightConfigHeader(infoConfigHeader);

	configInhoud.appendChild(
		create_element('h3', 'kies de bloemen waar je over wilt vertellen.')
	);
	createBloemElementen(false);
}

infoConfigHeader.onclick = createInfoConfigSectie;
flitsConfigHeader.onclick = createFlitsConfigSectie;
