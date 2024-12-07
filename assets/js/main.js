console.log("script on");
// Ждем, пока DOM будет загружен
document.addEventListener('DOMContentLoaded', () => {
    const sliderImages = document.querySelectorAll('.about__slider-bg');
    const controlsContainer = document.querySelector('.about__slider-controls');
    let currentIndex = 0;

    let startX = 0; // Начальная позиция свайпа/курсорного движения
    let endX = 0;   // Конечная позиция свайпа/курсорного движения
    let isDragging = false; // Флаг для отслеживания состояния нажатия мыши
    const swipeThreshold = 50; // Минимальное расстояние для распознавания свайпа

    // Создание кнопок пагинации
    sliderImages.forEach((_, index) => {
        const button = document.createElement('button');
        button.classList.add('about__slider-btn');
        if (index === 0) button.classList.add('active'); // Первая кнопка активна по умолчанию
        button.dataset.index = index; // Устанавливаем индекс как data-атрибут
        controlsContainer.appendChild(button);
    });

    const sliderButtons = controlsContainer.querySelectorAll('.about__slider-btn');

    // Функция обновления слайдера
    function updateSlider(index) {
        sliderImages[currentIndex].classList.remove('active');
        sliderButtons[currentIndex].classList.remove('active');
        currentIndex = index;
        sliderImages[currentIndex].classList.add('active');
        sliderButtons[currentIndex].classList.add('active');
    }

    // Навешиваем обработчики на кнопки пагинации
    sliderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);
            updateSlider(index);
        });
    });

    // Для стрелок (если они нужны)
    const prevButton = document.querySelector('.about__slider-btn[data-direction="prev"]');
    const nextButton = document.querySelector('.about__slider-btn[data-direction="next"]');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
            updateSlider(newIndex);
        });

        nextButton.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % sliderImages.length;
            updateSlider(newIndex);
        });
    }

    // Функция для обработки свайпа
    function handleSwipe() {
        const swipeDistance = endX - startX;

        if (swipeDistance > swipeThreshold) {
            // Свайп вправо
            const newIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
            updateSlider(newIndex);
        } else if (swipeDistance < -swipeThreshold) {
            // Свайп влево
            const newIndex = (currentIndex + 1) % sliderImages.length;
            updateSlider(newIndex);
        }
    }

    // Обработчики для сенсорных устройств
    sliderImages.forEach(image => {
        // Отключаем перетаскивание изображения по умолчанию
        image.addEventListener('dragstart', (e) => e.preventDefault());

        // Для сенсорного ввода
        image.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Предотвращает нежелательные действия браузера
            startX = e.touches[0].pageX; // Запоминаем начальную точку
        });

        image.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].pageX; // Запоминаем конечную точку
            handleSwipe(); // Вызываем функцию для определения направления свайпа
        });

        // Для мыши
        image.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Предотвращает стандартное поведение браузера
            isDragging = true;
            startX = e.pageX; // Запоминаем начальную точку
        });

        image.addEventListener('mousemove', (e) => {
            if (isDragging) {
                endX = e.pageX; // Обновляем конечную точку при перемещении мыши
            }
        });

        image.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                handleSwipe(); // Вызываем функцию для определения направления свайпа
            }
        });

        image.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false; // Сбрасываем флаг, если мышь вышла за пределы слайда
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.gallery-container', {
        loop: true,  // Бесконечный слайд
        slidesPerView: 3,  // Количество слайдов на экране
        centeredSlides: true,  // Центрирование активного слайда
        spaceBetween: -50,  // Отрицательный отступ между слайдами для выхода за пределы контейнера
        pagination: {
            el: '.gallery-pagination',  // Контейнер для пагинации
            clickable: true,  // Делаем пагинацию кликабельной
            renderBullet: function (index, className) {
                // Рендерим иконки для пагинации
                return '<button class="' + className + '"><svg width="45" height="48" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.47853 36.75L24.5 9L40.5215 36.75H8.47853Z" stroke="#8FAD16" stroke-width="2"/><line x1="44.1709" y1="0.469897" x2="0.170874" y2="16.4699" stroke="#151515"/></svg></button>';
            }
        },
        navigation: {
            nextEl: '.gallery-button-next',  // Кнопка "Вперед"
            prevEl: '.gallery-button-prev',  // Кнопка "Назад"
        },
        breakpoints: {
            1300: {
                slidesPerView: 3,  // Количество слайдов для больших экранов
                spaceBetween: -50,
            },
            900: {
                slidesPerView: 2,  // Для меньших экранов показываем 2 слайда
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,  // Для меньших экранов показываем 2 слайда
                spaceBetween: 20,
            },
            360: {
                slidesPerView: 1,  // Для мобильных экранов показываем 1 слайд
                spaceBetween: 20,
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Инициализируем Swiper
    const swiper = new Swiper('.reviews-container', {
        loop: true, // Бесконечный слайд
        slidesPerView: 4, // Количество слайдов на экране
        spaceBetween: 20, // Отступ между слайдами
        pagination: {
            el: '.review-pagination', // Контейнер для пагинации
            clickable: true, // Делаем пагинацию кликабельной
            renderBullet: function (index, className) {
                return `<button class="${className}" data-index="${index}">
                            <svg width="45" height="48" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.47853 36.75L24.5 9L40.5215 36.75H8.47853Z" stroke="#8FAD16" stroke-width="2"/>
                                <line x1="44.1709" y1="0.469897" x2="0.170874" y2="16.4699" stroke="#151515"/>
                            </svg>
                        </button>`;
            },
        },
        // effect: 'slide', // Тип анимации
        // speed: 900, // Скорость анимации
        // autoplay: {
        //     delay: 4000, // Интервал между слайдами
        // },
        on: {
            init: function () {
                updatePaginationVisibility(this); // Обновляем пагинацию при инициализации
            },
            slideChange: function () {
                updatePaginationVisibility(this); // Обновляем пагинацию при смене слайда
            },
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            450: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },
            350: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
        },
        navigation: {
            nextEl: '.review-button-next', // Кнопка "Вперед"
            prevEl: '.review-button-prev', // Кнопка "Назад"
        },
    });

    // Функция для управления видимостью кнопок пагинации
    function updatePaginationVisibility(swiperInstance) {
        const bullets = document.querySelectorAll('.review-pagination .swiper-pagination-bullet');
        const total = bullets.length; // Общее количество кнопок
        const current = swiperInstance.realIndex; // Текущий активный индекс
        const prev = (current - 1 + total) % total; // Предыдущий индекс
        const next = (current + 1) % total; // Следующий индекс

        bullets.forEach((bullet, index) => {
            if (index === current || index === prev || index === next) {
                bullet.classList.remove('hidden');
            } else {
                bullet.classList.add('hidden');
            }
        });
    }
});



///Header fix
// Функция для установки фиксированного хедера
function updateHeaderOnScroll() {
    const header = document.querySelector('.header__container');
    const heroLogo = document.querySelector('.hero__logo');

    // Проверяем, если ширина экрана меньше 768px или есть прокрутка
    if (window.innerWidth < 768 || window.scrollY > 0) {
        if (!header.classList.contains('fixed')) {
            header.classList.add('fixed'); // Добавляем класс для фиксированного хедера
        }
    } else { // Если экран больше 768px и прокрутки нет
        if (header.classList.contains('fixed')) {
            header.classList.remove('fixed'); // Убираем фиксированный хедер
        }
    }
}

// Обработчик события для прокрутки
window.addEventListener('scroll', updateHeaderOnScroll);

// Обработчик события для изменения размера окна
window.addEventListener('resize', function () {
    updateHeaderOnScroll(); // Обновляем состояние хедера при изменении размера экрана
});

// Инициализация на загрузке страницы
window.addEventListener('DOMContentLoaded', updateHeaderOnScroll);


//popup

document.addEventListener('DOMContentLoaded', function() {
    let openPopup = document.getElementById('openPopup');
    let closePopup = document.getElementById('popupClose');
    let popup = document.getElementById('popup');
    let overLayActive = document.querySelector(".overlay");
    openPopup.addEventListener("click", function () {
        popup.classList.add('active');
        overLayActive.classList.add('active');
     
    });
    closePopup.addEventListener("click", function () {       
        popup.classList.remove('active');
        overLayActive.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
let navMenu = document.querySelector('.header__nav');
const hamburger = document.querySelector('.header__hamburger');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active'); // Добавляем/удаляем класс 'active' при клике
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active'); // Включает/выключает фон
});
});