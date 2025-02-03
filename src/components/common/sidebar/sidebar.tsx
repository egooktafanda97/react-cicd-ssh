import { Fragment, useState, useEffect, FC, useContext } from 'react';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import Menuloop from './menuloop';
// import { MenuItems } from './nav';

import store from '../../../redux/store';
import { Link, useLocation } from 'react-router-dom';
import { ThemeChanger } from '../../../redux/action';
import logo1 from '../../../assets/images/brand-logos/desktop-logo.png';
import logo2 from '../../../assets/images/brand-logos/toggle-logo.png';
import logo3 from '../../../assets/images/brand-logos/desktop-dark.png';
import logo4 from '../../../assets/images/brand-logos/toggle-dark.png';
import logo5 from '../../../assets/images/brand-logos/desktop-white.png';
import logo6 from '../../../assets/images/brand-logos/toggle-white.png';
import LogoEsapa from '../../../assets/images/logo/e-SAPA 400x128.png';

import SpkButton from '../../../@spk/uielements/spk-button';
import { MenuItems } from '@/routes/sidebar.nav';
import { PermissionContext } from '@/contex/PermissionProviderContex';
// import SpkButton from "../../../@spk/uielements/spk-button";
// import SpkOverlay from "../../../@spk/uielements/spk-overlay";
import { isEmpty } from '../../../utils/helpers';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const [menuitems, setMenuitems] = useState(MenuItems);
  const contextPermissions: any = useContext(PermissionContext);
  // console.log(contextPermissions.hasPermissionName("GENERAL-REGISTER"));

  console.log("contextPermissions", contextPermissions);

  function closeMenu() {
    const closeMenudata = (items: any) => {
      items?.forEach((item: any) => {
        item.active = false;
        closeMenudata(item.children);
      });
    };
    closeMenudata(MenuItems);
    setMenuitems((arr: any) => [...arr]);
  }

  useEffect(() => {
    window.addEventListener('resize', menuResizeFn);
    window.addEventListener('resize', checkHoriMenu);
    const mainContent = document.querySelector('.main-content');
    if (window.innerWidth <= 992) {
      if (mainContent) {
        const theme = store.getState();
        ThemeChanger({ ...theme, dataToggled: 'close' });
      } else if (
        document.documentElement.getAttribute('data-nav-layout') == 'horizontal'
      ) {
        closeMenu();
      }
    }
    mainContent!.addEventListener('click', menuClose);
    return () => {
      window.removeEventListener('resize', menuResizeFn);
      window.removeEventListener('resize', checkHoriMenu);
    };
  }, []);

  // const router = useRouter();
  // const pathname = usePathname()
  const location = useLocation();

  function Onhover() {
    const theme = store.getState();
    if (
      (theme.dataToggled == 'icon-overlay-close' ||
        theme.dataToggled == 'detached-close') &&
      theme.iconOverlay != 'open'
    ) {
      ThemeChanger({ ...theme, iconOverlay: 'open' });
    }
  }
  function Outhover() {
    const theme = store.getState();
    if (
      (theme.dataToggled == 'icon-overlay-close' ||
        theme.dataToggled == 'detached-close') &&
      theme.iconOverlay == 'open'
    ) {
      ThemeChanger({ ...theme, iconOverlay: '' });
    }
  }

  function menuClose() {
    const theme = store.getState();
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, dataToggled: 'close' });
    }
    const overlayElement = document.querySelector(
      '#responsive-overlay'
    ) as HTMLElement | null;
    if (overlayElement) {
      overlayElement.classList.remove('active');
    }
    if (
      theme.dataNavLayout == 'horizontal' ||
      theme.dataNavStyle == 'menu-click' ||
      theme.dataNavStyle == 'icon-click'
    ) {
      closeMenu();
    }
  }

  const WindowPreSize =
    typeof window !== 'undefined' ? [window.innerWidth] : [];

  function menuResizeFn() {
    if (typeof window === 'undefined') {
      // Handle the case where window is not available (server-side rendering)
      return;
    }

    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }

    const theme = store.getState();
    const currentWidth = WindowPreSize[WindowPreSize.length - 1];
    const prevWidth = WindowPreSize[WindowPreSize.length - 2];

    if (WindowPreSize.length > 1) {
      if (currentWidth < 992 && prevWidth >= 992) {
        // less than 992;
        ThemeChanger({ ...theme, dataToggled: 'close' });
      }

      if (currentWidth >= 992 && prevWidth < 992) {
        // greater than 992
        ThemeChanger({
          ...theme,
          dataToggled:
            theme.dataVerticalStyle === 'doublemenu' ? 'double-menu-open' : '',
        });
      }
    }
  }

  function switcherArrowFn(): void {
    // Used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick(): void {
      const slide = document.querySelectorAll<HTMLElement>('.slide');
      const slideMenu = document.querySelectorAll<HTMLElement>('.slide-menu');

      slide.forEach((element) => {
        if (element.classList.contains('is-expanded')) {
          element.classList.remove('is-expanded');
        }
      });

      slideMenu.forEach((element) => {
        if (element.classList.contains('open')) {
          element.classList.remove('open');
          element.style.display = 'none';
        }
      });
    }

    slideClick();
  }

  const checkHoriMenu = () => {
    const menuNav = document.querySelector('.main-menu') as HTMLElement;
    const mainContainer1 = document.querySelector(
      '.main-sidebar'
    ) as HTMLElement;

    const marginLeftValue = Math.ceil(
      Number(window.getComputedStyle(menuNav).marginLeft.split('px')[0])
    );
    const marginRightValue = Math.ceil(
      Number(window.getComputedStyle(menuNav).marginRight.split('px')[0])
    );
    const check = menuNav.scrollWidth - mainContainer1.offsetWidth;

    // Show/Hide the arrows
    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
    } else {
      menuNav.style.marginLeft = '0px';
      menuNav.style.marginRight = '0px';
      menuNav.style.marginInlineStart = '0px';
    }

    if (!(document.querySelector('html')?.getAttribute('dir') === 'rtl')) {
      // LTR check the width and adjust the menu in screen
      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (Math.abs(check) < Math.abs(marginLeftValue)) {
          menuNav.style.marginLeft = -check + 'px';
        }
      }
    } else {
      // RTL check the width and adjust the menu in screen
      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (Math.abs(check) < Math.abs(marginRightValue)) {
          menuNav.style.marginRight = -check + 'px';
        }
      }
    }
  };

  function slideRight(): void {
    const menuNav = document.querySelector<HTMLElement>('.main-menu');
    const mainContainer1 = document.querySelector<HTMLElement>('.main-sidebar');

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split('px')[0]
        )
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split('px')[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === 'rtl')) {
          if (Math.abs(check) > Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineEnd = '0';

            if (
              !(
                Math.abs(check) >
                Math.abs(marginLeftValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
              const slideRightButton =
                document.querySelector<HTMLElement>('#slide-right');
              if (slideRightButton) {
                slideRightButton.classList.add('hidden');
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split('px')[0]) -
              Math.abs(mainContainer1Width) +
              'px';

            const slideRightButton =
              document.querySelector<HTMLElement>('#slide-right');
            if (slideRightButton) {
              slideRightButton.classList.remove('hidden');
            }
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineEnd = '0';

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton =
                document.querySelector<HTMLElement>('#slide-right');
              if (slideRightButton) {
                slideRightButton.classList.add('hidden');
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split('px')[0]) -
              Math.abs(mainContainer1Width) +
              'px';

            const slideLeftButton =
              document.querySelector<HTMLElement>('#slide-left');
            if (slideLeftButton) {
              slideLeftButton.classList.remove('hidden');
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(
        '.main-menu > .slide.open'
      );
      const element1 = document.querySelector<HTMLElement>(
        '.main-menu > .slide.open > ul'
      );
      if (element) {
        element.classList.remove('active');
      }
      if (element1) {
        element1.style.display = 'none';
      }
    }

    switcherArrowFn();
    checkHoriMenu();
  }

  function slideLeft(): void {
    const menuNav = document.querySelector<HTMLElement>('.main-menu');
    const mainContainer1 = document.querySelector<HTMLElement>('.main-sidebar');

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split('px')[0]
        )
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split('px')[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === 'rtl')) {
          if (Math.abs(check) <= Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineStart = '0px';
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineStart = '0';

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton =
                document.querySelector<HTMLElement>('#slide-right');
              if (slideRightButton) {
                slideRightButton.classList.add('hidden');
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split('px')[0]) -
              Math.abs(mainContainer1Width) +
              'px';

            const slideLeftButton =
              document.querySelector<HTMLElement>('#slide-left');
            if (slideLeftButton) {
              slideLeftButton.classList.remove('hidden');
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(
        '.main-menu > .slide.open'
      );
      const element1 = document.querySelector<HTMLElement>(
        '.main-menu > .slide.open > ul'
      );
      if (element) {
        element.classList.remove('active');
      }
      if (element1) {
        element1.style.display = 'none';
      }
    }

    switcherArrowFn();
  }

  const Topup = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 30 && document.querySelector('.app-sidebar')) {
        const Scolls = document.querySelectorAll('.app-sidebar');
        Scolls.forEach((e) => {
          e.classList.add('sticky-pin');
        });
      } else {
        const Scolls = document.querySelectorAll('.app-sidebar');
        Scolls.forEach((e) => {
          e.classList.remove('sticky-pin');
        });
      }
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', Topup);
  }

  const level = 0;
  let hasParent = false;
  let hasParentLevel = 0;

  function setSubmenu(event: any, targetObject: any, MenuItems = menuitems) {
    const theme = store.getState();
    if (
      (window.screen.availWidth <= 992 || theme.dataNavStyle != 'icon-hover') &&
      (window.screen.availWidth <= 992 || theme.dataNavStyle != 'menu-hover')
    ) {
      if (!event?.ctrlKey) {
        for (const item of MenuItems) {
          if (item === targetObject) {
            item.active = true;
            item.selected = true;
            setMenuAncestorsActive(item);
          } else if (!item.active && !item.selected) {
            item.active = false; // Set active to false for items not matching the target
            item.selected = false; // Set active to false for items not matching the target
          } else {
            removeActiveOtherMenus(item);
          }
          if (item.children && item.children.length > 0) {
            setSubmenu(event, targetObject, item.children);
          }
        }
      }
    }
    setMenuitems((arr: any) => [...arr]);
  }

  function getParentObject(obj: any, childObject: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === 'object' &&
          JSON.stringify(obj[key]) === JSON.stringify(childObject)
        ) {
          return obj; // Return the parent object
        }
        if (typeof obj[key] === 'object') {
          const parentObject: any = getParentObject(obj[key], childObject);
          if (parentObject !== null) {
            return parentObject;
          }
        }
      }
    }
    return null; // Object not found
  }

  function setMenuAncestorsActive(targetObject: any) {
    const parent = getParentObject(menuitems, targetObject);
    const theme = store.getState();
    if (parent) {
      if (hasParentLevel > 2) {
        hasParent = true;
      }
      parent.active = true;
      parent.selected = true;
      hasParentLevel += 1;
      setMenuAncestorsActive(parent);
    } else if (!hasParent) {
      if (theme.dataVerticalStyle == 'doublemenu') {
        ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
      }
    }
  }

  function removeActiveOtherMenus(item: any) {
    if (item) {
      if (Array.isArray(item)) {
        for (const val of item) {
          val.active = false;
          val.selected = false;
        }
      }
      item.active = false;
      item.selected = false;

      if (item.children && item.children.length > 0) {
        removeActiveOtherMenus(item.children);
      }
    } else {
    }
  }

  function setMenuUsingUrl(currentPath: any) {
    hasParent = false;
    hasParentLevel = 1;
    // Check current url and trigger the setSidemenu method to active the menu.
    const setSubmenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        if (item.path == '') {
        } else if (item.path === currentPath) {
          setSubmenu(null, item);
        }
        setSubmenuRecursively(item.children);
      });
    };
    setSubmenuRecursively(MenuItems);
  }
  const [previousUrl, setPreviousUrl] = useState('/');

  useEffect(() => {
    // Select the target element
    const targetElement = document.documentElement;

    // Create a MutationObserver instance
    const observer = new MutationObserver(handleAttributeChange);

    // Configure the observer to watch for attribute changes
    const config = { attributes: true };

    // Start observing the target element
    observer.observe(targetElement, config);
    let currentPath = location.pathname.endsWith('/')
      ? location.pathname.slice(0, -1)
      : location.pathname;
    if (currentPath !== previousUrl) {
      setMenuUsingUrl(currentPath);
      setPreviousUrl(currentPath);
    }
  }, [location]);

  function toggleSidemenu(
    event: any,
    targetObject: any,
    MenuItems = menuitems
  ) {
    const theme = store.getState();
    let element = event.target;
    if (
      (theme.dataNavStyle != 'icon-hover' &&
        theme.dataNavStyle != 'menu-hover') ||
      window.innerWidth < 992 ||
      (theme.dataNavLayout != 'horizontal' &&
        theme.dataToggled != 'icon-hover-closed' &&
        theme.dataToggled != 'menu-hover-closed')
    ) {
      // {
      for (const item of MenuItems) {
        if (item === targetObject) {
          if (theme.dataVerticalStyle == 'doublemenu' && item.active) {
            return;
          }
          item.active = !item.active;

          if (item.active) {
            closeOtherMenus(MenuItems, item);
          } else {
            if (theme.dataVerticalStyle == 'doublemenu') {
              ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
            }
          }
          setAncestorsActive(MenuItems, item);
        } else if (!item.active) {
          if (theme.dataVerticalStyle != 'doublemenu') {
            item.active = false; // Set active to false for items not matching the target
          }
        }
        if (item.children && item.children.length > 0) {
          toggleSidemenu(event, targetObject, item.children);
        }
      }
      if (targetObject?.children && targetObject.active) {
        if (
          theme.dataVerticalStyle == 'doublemenu' &&
          theme.dataToggled != 'double-menu-open'
        ) {
          ThemeChanger({ ...theme, dataToggled: 'double-menu-open' });
        }
      }
      if (
        element &&
        theme.dataNavLayout == 'horizontal' &&
        (theme.dataNavStyle == 'menu-click' ||
          theme.dataNavStyle == 'icon-click')
      ) {
        const listItem = element.closest('li');
        if (listItem) {
          // Find the first sibling <ul> element
          const siblingUL = listItem.querySelector('ul');
          let outterUlWidth = 0;
          let listItemUL = listItem.closest('ul:not(.main-menu)');
          while (listItemUL) {
            listItemUL = listItemUL.parentElement.closest('ul:not(.main-menu)');
            if (listItemUL) {
              outterUlWidth += listItemUL.clientWidth;
            }
          }
          if (siblingUL) {
            // You've found the sibling <ul> element
            let siblingULRect = listItem.getBoundingClientRect();
            if (theme.dir == 'rtl') {
              if (
                siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                0 &&
                outterUlWidth < window.innerWidth &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            } else {
              if (
                outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                window.innerWidth &&
                siblingULRect.right >= 0 &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            }
          }
        }
      }
    }
    setMenuitems((arr: any) => [...arr]);
  }

  function setAncestorsActive(MenuItems: any, targetObject: any) {
    const theme = store.getState();
    const parent = findParent(MenuItems, targetObject);
    if (parent) {
      parent.active = true;
      if (parent.active) {
        ThemeChanger({ ...theme, dataToggled: 'double-menu-open' });
      }

      setAncestorsActive(MenuItems, parent);
    } else {
      if (theme.dataVerticalStyle == 'doublemenu') {
        ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
      }
    }
  }
  function closeOtherMenus(MenuItems: any, targetObject: any) {
    for (const item of MenuItems) {
      if (item !== targetObject) {
        item.active = false;
        if (item.children && item.children.length > 0) {
          closeOtherMenus(item.children, targetObject);
        }
      }
    }
  }
  function findParent(MenuItems: any, targetObject: any) {
    for (const item of MenuItems) {
      if (item.children && item.children.includes(targetObject)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const parent: any = findParent(
          (MenuItems = item.children),
          targetObject
        );
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  function HoverToggleInnerMenuFn(event: any, item: any) {
    const theme = store.getState();
    let element = event.target;
    if (
      element &&
      theme.dataNavLayout == 'horizontal' &&
      (theme.dataNavStyle == 'menu-hover' || theme.dataNavStyle == 'icon-hover')
    ) {
      const listItem = element.closest('li');
      if (listItem) {
        // Find the first sibling <ul> element
        const siblingUL = listItem.querySelector('ul');
        let outterUlWidth = 0;
        let listItemUL = listItem.closest('ul:not(.main-menu)');
        while (listItemUL) {
          listItemUL = listItemUL.parentElement.closest('ul:not(.main-menu)');
          if (listItemUL) {
            outterUlWidth += listItemUL.clientWidth;
          }
        }
        if (siblingUL) {
          // You've found the sibling <ul> element
          let siblingULRect = listItem.getBoundingClientRect();
          if (theme.dir == 'rtl') {
            if (
              siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
              0 &&
              outterUlWidth < window.innerWidth &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
              window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          } else {
            if (
              outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
              window.innerWidth &&
              siblingULRect.right >= 0 &&
              outterUlWidth + siblingULRect.width + siblingULRect.width <
              window.innerWidth
            ) {
              item.dirchange = true;
            } else {
              item.dirchange = false;
            }
          }
        }
      }
    }
  }
  function handleAttributeChange(mutationsList: any) {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-nav-layout'
      ) {
        const newValue = mutation.target.getAttribute('data-nav-layout');
        if (newValue == 'vertical') {
          let currentPath = location.pathname.endsWith('/')
            ? location.pathname.slice(0, -1)
            : location.pathname;
          currentPath = !currentPath ? '/dashboard' : currentPath;
          setMenuUsingUrl(currentPath);
        } else {
          closeMenu();
        }
      }
    }
  }
  const handleClick = (event: any) => {
    // Your logic here
    event.preventDefault(); // Prevents the default anchor behavior (navigation)
    // ... other logic you want to perform on click
  };
  return (
    <Fragment>
      <div
        id='responsive-overlay'
        onClick={() => {
          menuClose();
        }}></div>
      <aside
        className='app-sidebar'
        id='sidebar'
        onMouseOver={() => Onhover()}
        onMouseLeave={() => Outhover()}>
        <div className='main-sidebar-header'>
          <Link
            to={`${import.meta.env.BASE_URL}dashboards/crm/`}
            className='header-logo'>
            <img src={LogoEsapa} alt='logo' className='desktop-logo' />
            <img src={logo2} alt='logo' className='toggle-logo' />
            <img src={logo3} alt='logo' className='desktop-dark' />
            <img src={logo4} alt='logo' className='toggle-dark' />
            <img src={logo5} alt='logo' className='desktop-white' />
            <img src={logo6} alt='logo' className='toggle-white' />
          </Link>
        </div>

        <SimpleBar className='main-sidebar ' id='sidebar-scroll'>
          <nav className='main-menu-container nav nav-pills flex-column sub-open'>
            <div
              className='slide-left'
              id='slide-left'
              onClick={() => {
                slideLeft();
              }}>
              {/* logo */}
            </div>

            <ul className='main-menu'>
              {MenuItems.map((levelone: any, index: any) => (
                <Fragment key={index}>
                  {
                    !isEmpty(levelone?.permission) &&
                    (
                      contextPermissions.hasPermissionName(levelone?.permission ?? "") ||
                      levelone?.permission == "AUTH-ACCESS-PUBLIC" ||
                      levelone?.permission == "ALL")
                    && (
                      <li
                        className={`${levelone.menutitle ? 'slide__category' : ''
                          } ${levelone.type === 'link' ? 'slide' : ''}
                                           ${levelone.type === 'sub'
                            ? 'slide has-sub'
                            : ''
                          } ${levelone?.active ? 'open' : ''
                          } ${levelone?.selected ? 'active' : ''}`}>
                        {levelone.menutitle ? (
                          <span className='category-name'>
                            {levelone.menutitle}
                          </span>
                        ) : (
                          ''
                        )}
                        {levelone.type === 'link' ? (
                          <Link
                            to={levelone.path + '/'}
                            className={`side-menu__item ${levelone.selected ? 'active' : ''
                              }`}>
                            <span
                              className={`hs-tooltip inline-block [--placement:right] leading-none ${local_varaiable?.dataVerticalStyle == 'doublemenu'
                                ? ''
                                : 'hidden'
                                }`}>
                              <SpkButton
                                buttontype='button'
                                customClass='hs-tooltip-toggle  inline-flex justify-center items-center'>
                                {levelone.icon}
                                <span
                                  className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 !py-2 !px-3 !rounded-md bg-black text-xs font-medium text-white shadow-sm dark:bg-neutral-700'
                                  role='tooltip'>
                                  {levelone.title}
                                </span>
                              </SpkButton>
                            </span>

                            {local_varaiable.dataVerticalStyle != 'doublemenu'
                              ? levelone.icon
                              : ''}

                            <span className='side-menu__label'>
                              {levelone.title}{' '}
                              {levelone.badgetxt ? (
                                <span className={levelone.class}>
                                  {' '}
                                  {levelone.badgetxt}
                                </span>
                              ) : (
                                ''
                              )}
                            </span>
                          </Link>
                        ) : (
                          ''
                        )}
                        {levelone.type === 'empty' ? (
                          <Link
                            to='#'
                            className='side-menu__item'
                            onClick={handleClick}>
                            {levelone.icon}
                            <span className=''>
                              {' '}
                              {levelone.title}{' '}
                              {levelone.badgetxt ? (
                                <span className={levelone.class}>
                                  {levelone.badgetxt}{' '}
                                </span>
                              ) : (
                                ''
                              )}
                            </span>
                          </Link>
                        ) : (
                          ''
                        )}
                        {levelone.type === 'sub' ? (
                          <Menuloop
                            MenuItems={levelone}
                            level={level + 1}
                            toggleSidemenu={toggleSidemenu}
                            HoverToggleInnerMenuFn={HoverToggleInnerMenuFn}
                          />
                        ) : (
                          ''
                        )}
                      </li>
                    )
                  }
                </Fragment>
              ))}
            </ul>

            <div
              className='slide-right'
              onClick={() => {
                slideRight();
              }}
              id='slide-right'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#7b8191'
                width='24'
                height='24'
                viewBox='0 0 24 24'>
                <path d='M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z'></path>
              </svg>
            </div>
          </nav>
        </SimpleBar>
      </aside>
    </Fragment >
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);
