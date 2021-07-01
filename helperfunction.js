function create_element(
	type,
	innertext = '',
	classNames = [],
	id = '',
	attributes = {},
	children = []
) {
	let new_element = document.createElement(type);

	new_element.innerText = innertext;
	if (classNames) {
		for (let className of classNames) {
			new_element.classList.add(className);
		}
	}
	if (attributes) {
		for (let attribute_type in attributes) {
			new_element.setAttribute(attribute_type, attributes[attribute_type]);
		}
	}
	if (id) {
		new_element.id = id;
	}
	if (children) {
		for (child of children) {
			create_element(
				new_element,
				child.innertext,
				child.type,
				child.classNames,
				child.id,
				child.attributes,
				child.children
			);
		}
	}
	return new_element;
}
let tussendoor = [
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/armen omhoog.gif',
		}),
		text: 'handen omhoog',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/zwaaien.gif',
		}),
		text: 'zwaaien',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/rondje draaien.gif',
		}),
		text: 'rondje draaien',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			src: './resources/pickupfromtheground.png',
		}),
		text: 'bloemetje plukken',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/spring.gif',
		}),
		text: 'springen',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/opstaan.gif',
		}),
		text: 'staan en weer zitten',
		type: 'giphy',
	},

	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/schouders optrekken.gif',
		}),
		text: 'schouders ophalen',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/gekkebektrekken.gif',
		}),
		text: 'gekke bek trekken',
		type: 'giphy',
	},

	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/klappen.gif',
		}),
		text: 'klappen',
		type: 'giphy',
	},
	{
		element: create_element('img', '', ['giphy-embed'], '', {
			width: '99%',
			height: '99%',
			frameBorder: '0',
			src: './resources/glimlach.gif',
		}),
		text: 'glimlach :D',
		type: 'giphy',
	},
];

function toggle(elements = [], aspect = [], values = []) {
	console.log(elements, aspect, values);
	// takes two elements with the aspect that's toggled and two values that they toggle with, both provided in a list.
	if (elements[0][aspect[0]][aspect[1]] == values[0]) {
		elements[0][aspect[0]][aspect[1]] = values[1];
		//elements[1][aspect[0]][aspect[1]] = values[0];
	} else {
		elements[0][aspect[0]][aspect[1]] = values[0];
		//elements[1][aspect[0]][aspect[1]] = values[1];
	}
}

showBloemInfo = function (e) {
	clearAfbeeldingen();
	let tableRow = e.target.closest('tr');
	//highlightBloemInConfig(tableRow);
	let bloemnaam = tableRow.getAttribute('naam');
	let positioning = ['1/1/6/6', '1/5/6/11', '5/1/11/6', '5/5/11/11'];
	let grid = create_element('div', '', ['mainGrid']);
	for (let i = 0; i < 4; i++) {
		let bloemAfbeelding = create_element('img', '', [], '', {
			src: `./resources/photos_big/${bloemnaam}${i + 1}.jpg`,
			style: `grid-area: ${positioning[i]}`,
		});
		grid.appendChild(bloemAfbeelding);
	}
	weergaveSectie.appendChild(grid);
};
let getChosenFlowers = function () {
	let chosenFlowersList = document.getElementsByClassName('chosen');
	let chosenFlowers = [];
	for (let flowerElement of chosenFlowersList) {
		chosenFlowers.push(flowerElement.getAttribute('naam'));
	}
	return chosenFlowers;
};

flowerShowTime = function () {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, document.getElementById('flitsShowTime').value - showNameTime);
	});
};
nameShowTime = function () {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, showNameTime);
	});
};
function getFlitsAfbeelding(chosenFlowers, previous) {
	let chanceTussendoortje = document.getElementById(
		'chanceTussendoortje'
	).value;
	console.log(chanceTussendoortje);
	//als de vorige afbeelding een giphy was of het is de eerste afbeelding, dan wordt het sowieso een bloemafbeelding.
	if (previous.type !== 'afbeelding') {
		chanceTussendoortje = 0;
	}

	// als showPicture true is dan wordt een bloemafbeelding gekozen, anders een giphy.
	let showPicture = Math.random() > chanceTussendoortje;
	let chosenFlower = '';

	if (showPicture) {
		// voorkom dat je twee keer dezelfde afbeelding krijgt, zelfs als er maar één bloem geflitst wordt.
		while (
			chosenFlower === '' ||
			(chosenFlower === previous.text &&
				pictureNumber === previous.pictureNumber)
		) {
			chosenFlower =
				chosenFlowers[Math.floor(Math.random() * chosenFlowers.length)];
			pictureNumber = Math.floor(Math.random() * 4) + 1;
		}
		let picture = document.createElement('img');
		picture.setAttribute(
			'src',
			`./resources/photos_big/${chosenFlower}${pictureNumber}.jpg`
		);
		picture.setAttribute('type', chosenFlower);
		return {
			element: picture,
			text: chosenFlower,
			pictureNumber,
			type: 'afbeelding',
		};
	} else {
		return tussendoor[Math.floor(Math.random() * tussendoor.length)];
	}
}

let flitsFlowers = async function (chosenFlowers) {
	flitsende = true;
	paused = false;

	let showFlits = document.getElementById('showFlits');
	let previous = {};

	while (flitsende) {
		if (!paused) {
			showFlits.innerHTML = '';
			let newAfbeelding = getFlitsAfbeelding(chosenFlowers, previous);

			let textContainer = create_element('div', '', ['textContainer']);
			textContainer.appendChild(create_element('p', newAfbeelding.text));
			showFlits.appendChild(newAfbeelding.element);

			// Als er een bloemafbeelding geflitst wordt, komt de naam niet gelijk in beeld zodat ook de lezende kleuters naar de afbeelding kijken.
			// Is het een giphy dan komt de naam wel gelijk in beeld zodat de leerkracht kan zeggen wat de kleuters erbij kunnen doen.
			if (newAfbeelding.type === 'afbeelding') {
				await flowerShowTime();
				if (flitsende) {
					showFlits.appendChild(textContainer);
				}
			} else {
				showFlits.appendChild(textContainer);
				await flowerShowTime();
				await nameShowTime();
			}
			await nameShowTime();
			previous = newAfbeelding;
		} else {
			// beetje ongelukkig genaamd maar de nameShowTime is 0 seconde, dus als het flitsen gepauseerd is, wacht hij steeds 1 sec.
			await nameShowTime();
		}
	}
};
getChanceTussendoortjeSlider = function () {
	let sliderDiv = create_element('div', '', ['intermezzoContainer']);
	sliderDiv.appendChild(create_element('p', "intermezzo's"));
	sliderDiv.appendChild(
		create_element('input', '', [], 'chanceTussendoortje', {
			type: 'range',
			min: '0.0',
			step: '0.05',
			max: '1',
			value: '0.2',
		})
	);
	return sliderDiv;
};
getFlitsSpeedSlider = function () {
	let sliderDiv = create_element('div', '', ['snelheidSliderContainer']);
	sliderDiv.appendChild(create_element('p', 'flitssnelheid'));
	sliderDiv.appendChild(
		create_element('input', '', [], 'flitsShowTime', {
			type: 'range',
			min: '1000',
			step: '50',
			max: '10000',
			value: '4000',
		})
	);
	return sliderDiv;
};
getPauseBtn = function () {
	let pauseDiv = create_element('div');
	let pauseBtn = create_element(
		'button',
		'pauze',
		['pause', 'unclicked'],
		'',
		{}
	);
	pauseDiv.appendChild(pauseBtn);
	pauseBtn.onclick = pauseFlitsen;
	return pauseDiv;
};
getStopBtn = function () {
	let stopDiv = create_element('div');
	let stopBtn = create_element('button', 'stop.', ['stop'], '', {});
	stopDiv.appendChild(stopBtn);
	stopBtn.onclick = stopFlitsen;
	return stopDiv;
};
clearAfbeeldingen = function () {
	weergaveSectie.innerHTML = '';
	flitsSectie.innerHTML = '';
};
createFlitsSectie = function () {
	clearAfbeeldingen();
	toggleConfigView();
	let showFlits = create_element('div', '', [], 'showFlits');
	flitsSectie.appendChild(showFlits);

	let flitsButtonsContainer = create_element('div', '', ['buttonsContainer']);
	flitsButtonsContainer.appendChild(getChanceTussendoortjeSlider());
	flitsButtonsContainer.appendChild(getFlitsSpeedSlider());
	flitsButtonsContainer.appendChild(getPauseBtn());
	flitsButtonsContainer.appendChild(getStopBtn());
	flitsSectie.appendChild(flitsButtonsContainer);
};
let startFlitsen = function () {
	createFlitsSectie();
	let chosenFlowers = getChosenFlowers();
	flitsFlowers(chosenFlowers);
};
let pauseFlitsen = function (e) {
	if (paused) {
		paused = false;
		e.target.classList.remove('clicked');
		e.target.classList.add('unclicked');
		e.target.innerText = 'pauze';
	} else {
		paused = true;
		e.target.classList.add('clicked');
		e.target.classList.remove('unclicked');
		e.target.innerText = 'gepauzeerd';
	}
};
let stopFlitsen = function () {
	clearAfbeeldingen();
	flitsende = false;
	toggleConfigView();
	console.log('flitsen is gestopt.');
};
