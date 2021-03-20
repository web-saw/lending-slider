let wrapper = document.querySelector('.wrapper')

let pageSlider = new Swiper('.page', {
	
	//Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	//Вертикальный слайдер
	direction: 'vertical',

	//Кол-во слайдов для показа
	slidesPerView: 'auto',

	//Включаем параллакс
	parallax: true,

	//Управление клавиатурой
	keyboard:{
		//Включить\выключить
		enabled: true,
		//вкл\выкл только когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		//вкл\выкл управление клавиатурой
		pageUpDown: true,

	},
	//Управление колесом мыши
	mousewheel:{
		//Чувствительность колеса
		sensitivity: 1,
		//Класс обьекта на который будет срабатывать
		// прокрутка eventsTarget: ".image-slider"
	},
	//Отключение функционала
	//если слайдов меньше чем нужно
	watchOverflow: true,
	//Скорость
	speed: 800,
	//Обновить слайдер при изменении элементов
	observer: true,
	//Обновить слайдер при изменении родительских элементов слайдера
	observeParents: true,
	//Обновить слайдер при изменении дочерних элементов слайдера
	observeSlideChildren: true,

	//Навигация
	//Буллеты, текущее положение, прогрессбар
	pagination:{
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	//Скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		//Возможность перетаскивать скролл
		draggable: true
	},

	//Отключаем автоинициализацию
	init: false,

	//События
	on: {
		//Событие инициализации
		init: function() {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
		},
		//Событие смены слайдов
		slideChange: function() {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function() {
			setScrollType();
		}
	},

});


let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for(let index = 0; index < menuLinks.length; index++){
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}
function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if(menuLinkActive){
		menuLinkActive.classList.remove('_active');
	}
}
function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}

	for (let index = 0; index < pageSlider.slides.length; index++){
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');
		if (pageSlideContent) {
			const pageSlideContentHight = pageSlideContent.offsetHeight;
			if (pageSlideContentHight > window.innerHeight){
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}

pageSlider.init();