(function(){
  // =========
  //Всплывающее окно в меню
  //Заменил обычный .menu__item:hover sub-menu на JS.
  //Всё ради БЭМ!
  const menuContainer = document.querySelector('.menu__container');
  const menuItemWhithSubMenu = menuContainer.querySelector('.menu__item-with-sub-menu');
  const subMenu = menuItemWhithSubMenu.querySelector('.sub-menu');

  menuItemWhithSubMenu.addEventListener('mouseover', () => {
    // Если не открыт меню бургер
    if (!menuContainer.classList.contains('menu__container_opened')) {
      subMenu.classList.add('sub-menu_visible')
    }
  })

  menuItemWhithSubMenu.addEventListener('mouseout', () => {
    if (!menuContainer.classList.contains('menu__container_opened')) {
      subMenu.classList.remove('sub-menu_visible')
    }
  })
  // /Всплывающее окно в меню
  // =========


  // =========
  // Нажатие по бургеру
  const burgerBtn = document.querySelector('.header__button_type_burger-menu');
  const headerMenuContainer = document.querySelector('.menu__container');

  burgerBtn.addEventListener('click', () => {
    headerMenuContainer.classList.toggle('menu__container_opened');
    burgerBtn.classList.toggle('header__button_type_burger-menu');
    burgerBtn.classList.toggle('header__button_type_close-menu');
  })
  // /Нажатие по бургеру
  // =========


  // =========
  // На обратный скролл меню появляется
  const toggleHeaderHeight = 400; // высота, после которой эта фича начинает работать

  const header = document.querySelector('.header');

  let currentYpos = window.pageYOffset;
  let prevYpos = currentYpos;
  document.addEventListener('scroll', () => {
    currentYpos = window.pageYOffset;

    if (currentYpos < prevYpos && currentYpos > toggleHeaderHeight) {
      header.classList.add('header_fixed');
    }
    else {
      header.classList.remove('header_fixed');
      // Также здесь можно убрать меню бургер, если оно будет открыто:
      headerMenuContainer.classList.remove('menu__container_opened');
      burgerBtn.classList.add('header__button_type_burger-menu');
      burgerBtn.classList.remove('header__button_type_close-menu');
    }

    prevYpos = currentYpos;
  })
  // /На обратный скролл меню появляется
  // =========
})();
