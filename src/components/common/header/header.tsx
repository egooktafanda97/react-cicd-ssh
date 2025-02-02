import React, { FC, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modalsearch from '../modal-search/modalsearch';
import { connect, useSelector } from 'react-redux';
import { ThemeChanger } from '../../../../src/redux/action';
import store from '../../../../src/redux/store';
import us from '../../../assets/images/flags/us_flag.jpg';
import spain from '../../../assets/images/flags/spain_flag.jpg';
import french from '../../../assets/images/flags/french_flag.jpg';
import germany from '../../../assets/images/flags/germany_flag.jpg';
import italy from '../../../assets/images/flags/italy_flag.jpg';
import russia from '../../../assets/images/flags/russia_flag.jpg';
import figma from '../../../assets/images/apps/figma.png';
import powerpoint from '../../../assets/images/apps/microsoft-powerpoint.png';
import word from '../../../assets/images/apps/microsoft-word.png';
import calender from '../../../assets/images/apps/calender.png';
import sketch from '../../../assets/images/apps/sketch.png';
import googledocs from '../../../assets/images/apps/google-docs.png';
import google from '../../../assets/images/apps/google.png';
import translate from '../../../assets/images/apps/translate.png';
import googlesheets from '../../../assets/images/apps/google-sheets.png';
import face9 from '../../../assets/images/faces/9.jpg';
import desktoplogo from '../../../assets/images/brand-logos/desktop-logo.png';
import togglelogo from '../../../assets/images/brand-logos/toggle-logo.png';
import desktopdark from '../../../assets/images/brand-logos/desktop-dark.png';
import toggledark from '../../../assets/images/brand-logos/toggle-dark.png';
import desktopwhite from '../../../assets/images/brand-logos/desktop-white.png';
import togglewhite from '../../../assets/images/brand-logos/toggle-white.png';
import product1 from '../../../assets/images/ecommerce/jpg/1.jpg';
import product3 from '../../../assets/images/ecommerce/jpg/3.jpg';
import product5 from '../../../assets/images/ecommerce/jpg/5.jpg';
import product4 from '../../../assets/images/ecommerce/jpg/4.jpg';
import product6 from '../../../assets/images/ecommerce/jpg/6.jpg';
import SpkDropdown from '../../../../src/@spk/uielements/spk-dropdown';
import SpkButton from '../../../../src/@spk/uielements/spk-button';
import { userAuthDto } from '@/dto/user.dto';
import { authAvatarImageUrl } from '@/services/AssetResourcesService';

interface HeaderProps { }

const Header: FC<HeaderProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const globalStateRedux: { user: userAuthDto } = useSelector((state: any) => state.auth);



  const data = (
    <span className='font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pinkmain/10 text-pinkmain text-[0.625rem]'>
      Free shipping
    </span>
  );

  const cartProduct = [
    {
      id: 1,
      src: product1,
      name: 'SomeThing Phone',
      price: '$1,299.00',
      color: 'Metallic Blue',
      text: '6gb Ram',
      class: '',
    },
    {
      id: 2,
      src: product3,
      name: 'Stop Watch',
      price: '$179.29',
      color: 'Analog',
      text: data,
      class: '',
    },
    {
      id: 3,
      src: product5,
      name: 'Photo Frame',
      price: '$29.00',
      color: 'Decorative',
      text: '',
      class: '',
    },
    {
      id: 4,
      src: product4,
      name: 'Kikon Camera',
      price: '$4,999.00',
      color: 'Black',
      text: '50MM',
      class: '',
    },
    {
      id: 5,
      src: product6,
      name: 'Canvas Shoes',
      price: '$129.00',
      color: 'Gray',
      text: 'Sports',
      class: 'border-b-0',
    },
  ];

  const [cartItems, setCartItems] = useState([...cartProduct]);
  const [cartItemCount, setCartItemCount] = useState(cartProduct.length);
  const handleRemove = (
    itemId: number,
    event: { stopPropagation: () => void }
  ) => {
    event.stopPropagation();
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length);
  };

  //Notifications

  const span1 = <span className='text-warning'>ID: #1116773</span>;
  const span2 = <span className='text-success'>ID: 7731116</span>;

  //  const span3 = <span className="font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pinkmain/10 text-pinkmain text-[0.625rem]">Free shipping</span>

  const notifydata = [
    {
      id: 1,
      class: 'Your Order Has Been Shipped',
      data: 'Order No: 123456 Has Shipped To Your Delivery Address',
      icon: 'gift',
      class2: '',
      color: '!bg-primary/10',
      color2: 'primary',
    },
    {
      id: 2,
      class: 'Discount Available',
      data: 'Discount Available On Selected Products',
      icon: 'discount-2',
      class2: '',
      color: '!bg-secondary/10',
      color2: 'secondary',
    },
    {
      id: 3,
      class: 'Account Has Been Verified',
      data: 'Your Account Has Been Verified Sucessfully',
      icon: 'user-check',
      class2: '',
      color: '!bg-pinkmain/10',
      color2: 'pink',
    },
    {
      id: 4,
      class: 'Order Placed',
      data: 'Order Placed Successfully',
      icon: 'circle-check',
      class2: span1,
      color: '!bg-warning/10',
      color2: 'warning',
    },
    {
      id: 5,
      class: 'Order Delayed',
      data: 'Order Delayed Unfortunately',
      icon: 'clock',
      class2: span2,
      color: '!bg-success/10',
      color2: 'success',
    },
  ];

  const [notifications, setNotifications] = useState([...notifydata]);

  const handleNotificationClose = (
    index: number,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (event) {
      event.stopPropagation();
    }
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  //full screen
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        // ThemeChanger({ ...local_varaiable, "dataToggled": "close" })
      } else {
        // ThemeChanger({...local_varaiable,"dataToggled":""})
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function menuClose() {
    const theme = store.getState();
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, dataToggled: 'close' });
    }
    if (window.innerWidth >= 992) {
      ThemeChanger({
        ...theme,
        dataToggled: local_varaiable.dataToggled
          ? local_varaiable.dataToggled
          : '',
      });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
      } else {
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const theme = store.getState();
    const sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === 'vertical') {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case 'closed':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'close-menu-close') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'close-menu-close' });
            }
            break;
          // icon-overlay
          case 'overlay':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'icon-overlay-close') {
              ThemeChanger({ ...theme, dataToggled: '', iconOverlay: '' });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({
                  ...theme,
                  dataToggled: 'icon-overlay-close',
                  iconOverlay: '',
                });
              }
            }
            break;
          // icon-text
          case 'icontext':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'icon-text-close') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-text-close' });
            }
            break;
          // doublemenu
          case 'doublemenu':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'double-menu-open') {
              ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
            } else {
              const sidemenu = document.querySelector(
                '.side-menu__item.active'
              );
              if (sidemenu) {
                ThemeChanger({ ...theme, dataToggled: 'double-menu-open' });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    'double-menu-active'
                  );
                } else {
                  ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
                  // ThemeChanger({ ...theme, "dataToggled": "" });
                }
              }
            }
            // doublemenu(ThemeChanger);
            break;
          // detached
          case 'detached':
            if (theme.dataToggled === 'detached-close') {
              ThemeChanger({ ...theme, dataToggled: '', iconOverlay: '' });
            } else {
              ThemeChanger({
                ...theme,
                dataToggled: 'detached-close',
                iconOverlay: '',
              });
            }

            break;

          // default
          case 'default':
            ThemeChanger({ ...theme, dataToggled: '' });
        }
        switch (navStyle) {
          case 'menu-click':
            if (theme.dataToggled === 'menu-click-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'menu-click-closed' });
            }
            break;
          // icon-overlay
          case 'menu-hover':
            if (theme.dataToggled === 'menu-hover-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'menu-hover-closed' });
            }
            break;
          case 'icon-click':
            if (theme.dataToggled === 'icon-click-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-click-closed' });
            }
            break;
          case 'icon-hover':
            if (theme.dataToggled === 'icon-hover-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-hover-closed' });
            }
            break;
        }
      }
    } else {
      if (theme.dataToggled === 'close') {
        ThemeChanger({ ...theme, dataToggled: 'open' });

        setTimeout(() => {
          if (theme.dataToggled == 'open') {
            const overlay = document.querySelector('#responsive-overlay');

            if (overlay) {
              overlay.classList.add('active');
              overlay.addEventListener('click', () => {
                const overlay = document.querySelector('#responsive-overlay');

                if (overlay) {
                  overlay.classList.remove('active');
                  menuClose();
                }
              });
            }
          }

          window.addEventListener('resize', () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector('#responsive-overlay');

              if (overlay) {
                overlay.classList.remove('active');
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, dataToggled: 'close' });
      }
    }
  };
  //Dark Model

  const ToggleDark = () => {
    ThemeChanger({
      ...local_varaiable,
      class: local_varaiable.class == 'dark' ? 'light' : 'dark',
      dataHeaderStyles: local_varaiable.class == 'dark' ? 'light' : 'dark',
      dataMenuStyles:
        local_varaiable.dataNavLayout == 'horizontal'
          ? local_varaiable.class == 'dark'
            ? 'light'
            : 'dark'
          : 'dark',
    });
    const theme = store.getState();

    if (theme.class != 'dark') {
      ThemeChanger({
        ...theme,
        bodyBg: '',
        Light: '',
        darkBg: '',
        inputBorder: '',
      });
      localStorage.setItem('ynexlighttheme', 'light');
      localStorage.removeItem('ynexdarktheme');
      localStorage.removeItem('ynexMenu');
      localStorage.removeItem('ynexHeader');
      localStorage.removeItem('darkBgRGB');
      localStorage.removeItem('bodyBgRGB');
      localStorage.removeItem('Light');
    } else {
      localStorage.setItem('ynexdarktheme', 'dark');
      localStorage.removeItem('ynexlighttheme');
      localStorage.removeItem('ynexMenu');
      localStorage.removeItem('ynexHeader');
    }
  };

  useEffect(() => {
    const navbar = document?.querySelector('.header');
    const navbar1 = document?.querySelector('.app-sidebar');
    const sticky: any = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add('sticky-pin');
        navbar1?.classList.add('sticky-pin');
      } else {
        navbar?.classList.remove('sticky-pin');
        navbar1?.classList.remove('sticky-pin');
      }
    }

    window.addEventListener('scroll', stickyFn);
    window.addEventListener('DOMContentLoaded', stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', stickyFn);
      window.removeEventListener('DOMContentLoaded', stickyFn);
    };
  }, []);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `${import.meta.env.BASE_URL}login`
    navigate(path);
    console.log('navigate', path);
    console.log('path', path);
  };
  return (
    <Fragment>
      <div className='app-header'>
        <nav className='main-header !h-[3.75rem]' aria-label='Global'>
          <div className='main-header-container ps-[0.725rem] pe-[1rem] '>
            <div className='header-content-left'>
              <div className='header-element'>
                <div className='horizontal-logo'>
                  <Link
                    to={`${import.meta.env.BASE_URL}dashboards/crm`
                    }
                    className='header-logo' >
                    <img
                      src={desktoplogo}
                      alt='logo'
                      className='desktop-logo'
                    />
                    <img src={togglelogo} alt='logo' className='toggle-logo' />
                    <img
                      src={desktopdark}
                      alt='logo'
                      className='desktop-dark'
                    />
                    <img src={toggledark} alt='logo' className='toggle-dark' />
                    <img
                      src={desktopwhite}
                      alt='logo'
                      className='desktop-white'
                    />
                    <img
                      src={togglewhite}
                      alt='logo'
                      className='toggle-white'
                    />
                  </Link >
                </div >
              </div >
              <div
                className='header-element md:px-[0.325rem] !items-center'
                onClick={() => toggleSidebar()}>
                <Link
                  aria-label='Hide Sidebar'
                  className='sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center'
                  to='#'>
                  <span></span>
                </Link>
              </div>
            </div >
            <div className='header-content-right'>
              <div className='header-element py-[1rem] md:px-[0.65rem] px-2 header-search'>
                <SpkButton
                  Label='button'
                  buttontype='button'
                  Overlay='#search-modal'
                  customClass='inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10'>
                  <i className='bx bx-search-alt-2 header-link-icon'></i>
                </SpkButton>
              </div>
              <SpkDropdown
                Customclass='header-element py-[1rem] md:px-[0.65rem] px-2  header-country hidden sm:block [--placement:bottom-left]'
                buttonid='dropdown-flag'
                CustomToggleclass='hs-dropdown-toggle !p-0 flex-shrink-0 !m-0 !border-0 !rounded-full !shadow-none'
                Imagetag={true}
                Image={us}
                Imagename='flag-img'
                Imageclass='h-[1.25rem] w-[1.25rem] rounded-full'
                Custommenuclass='min-w-[10rem] !-mt-3'
                Menulabel='dropdown-flag'>
                <div className='ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10'>
                  <div className='py-2 first:pt-0 last:pb-0'>
                    <div className='ti-dropdown-item !p-[0.65rem] '>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] flex items-center w-[1.375rem] rounded-full'>
                          <img
                            src={us}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            English
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ti-dropdown-item !p-[0.65rem]'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] w-[1.375rem] flex items-center rounded-full'>
                          <img
                            src={spain}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            Spanish
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ti-dropdown-item !p-[0.65rem]'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] w-[1.375rem] flex items-center rounded-full'>
                          <img
                            src={french}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            French
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ti-dropdown-item !p-[0.65rem]'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] w-[1.375rem] flex items-center rounded-full'>
                          <img
                            src={germany}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            German
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ti-dropdown-item !p-[0.65rem]'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] w-[1.375rem] flex items-center rounded-full'>
                          <img
                            src={italy}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            Italian
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ti-dropdown-item !p-[0.65rem]'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse w-full'>
                        <div className='h-[1.375rem] w-[1.375rem] flex items-center  rounded-sm'>
                          <img
                            src={russia}
                            alt='flag-img'
                            className='h-[1rem] w-[1rem] rounded-full'
                          />
                        </div>
                        <div>
                          <p className='!text-[0.8125rem] font-medium'>
                            Russian
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpkDropdown>
              <div
                className='header-element header-theme-mode hidden !items-center sm:block !py-[1rem] md:!px-[0.65rem] px-2'
                onClick={() => ToggleDark()}>
                <SpkButton
                  Label='anchor'
                  customClass='hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10'
                  Themevalue='dark'>
                  <i className='bx bx-moon header-link-icon'></i>
                </SpkButton>
                <SpkButton
                  Label='anchor'
                  customClass='hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs  dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10'
                  Themevalue='light'>
                  <i className='bx bx-sun header-link-icon'></i>
                </SpkButton>
              </div>

              <div className='hs-dropdown ti-dropdown  header-element py-[1rem] md:px-[0.65rem] px-2 notifications-dropdown header-notification  !hidden md:!block [--placement:bottom-right]'>
                <SpkButton
                  Id='dropdown-notification'
                  buttontype='button'
                  customClass='hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs'>
                  <i className='bx bx-bell header-link-icon  text-[1.125rem]'></i>
                  <span className='flex absolute h-5 w-5 -top-[0.25rem] end-0  -me-[0.6rem]'>
                    <span className='animate-slow-ping absolute inline-flex -top-[2px] -start-[2px] h-full w-full rounded-full bg-secondary/40 opacity-75'></span>
                    <span
                      className='relative inline-flex justify-center items-center rounded-full  h-[14.7px] w-[14px] bg-secondary text-[0.625rem] text-white'
                      id='notification-icon-badge'>
                      {notifications.length}
                    </span>
                  </span>
                </SpkButton>
                <div
                  className='main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder hidden !m-0'
                  aria-labelledby='dropdown-notification'>
                  <div className='ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center'>
                    <p className='mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold '>
                      Notifications
                    </p>
                    <span
                      className='text-[0.75em] py-[0.25rem/2] px-[0.45rem] font-[600] rounded-sm bg-secondary/10 text-secondary'
                      id='notifiation-data'>{`${notifications.length} Unread`}</span>
                  </div>
                  <div className='dropdown-divider'></div>
                  <ul
                    className='list-none !m-0 !p-0 end-0'
                    id='header-notification-scroll'>
                    {notifications.map((idx, index) => (
                      <li
                        className='ti-dropdown-item dropdown-item'
                        key={Math.random()}>
                        <div className='flex items-start'>
                          <div className='pe-2'>
                            <span
                              className={`inline-flex text-${idx.color2} justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem] ${idx.color} !rounded-[50%]`}>
                              <i
                                className={`ti ti-${idx.icon} text-[1.125rem]`}></i>
                            </span>
                          </div>
                          <div className='grow flex items-center justify-between'>
                            <div>
                              <p className='mb-0 text-defaulttextcolor dark:text-white text-[0.8125rem] font-semibold'>
                                <Link
                                  to={`${import.meta.env.BASE_URL
                                    }pages/notifications/`}>
                                  {idx.class} {idx.class2}
                                </Link>
                              </p>
                              <span className='text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text'>
                                {idx.data}
                              </span>
                            </div>
                            <div>
                              <Link
                                aria-label='anchor'
                                to='#'
                                className='min-w-fit text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1'
                                onClick={(event) =>
                                  handleNotificationClose(index, event)
                                }>
                                <i className='ti ti-x text-[1rem]'></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`p-4 empty-header-item1 border-t mt-2 ${notifications.length === 0 ? 'hidden' : 'block'
                      }`}>
                    <div className='grid'>
                      <Link
                        to={`${import.meta.env.BASE_URL}pages/notifications/`}
                        className='ti-btn ti-btn-primary-full !m-0 w-full p-2'>
                        View All
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`p-[3rem] empty-item1 ${notifications.length === 0 ? 'block' : 'hidden'
                      }`}>
                    <div className='text-center'>
                      <span className='!h-[4rem]  !w-[4rem] avatar !leading-[4rem] !rounded-full !bg-secondary/10 !text-secondary'>
                        <i className='ri-notification-off-line text-[2rem]  '></i>
                      </span>
                      <h6 className='font-semibold mt-3 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[1rem]'>
                        No New Notifications
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className='header-element header-fullscreen py-[1rem] md:px-[0.65rem] px-2'>
                <SpkButton
                  Label='anchor'
                  onclickfunc={() => toggleFullscreen()}
                  customClass='inline-flex flex-shrink-0 justify-center items-center gap-2  !rounded-full font-medium dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10'>
                  {isFullscreen ? (
                    <i className='bx bx-exit-fullscreen full-screen-close header-link-icon'></i>
                  ) : (
                    <i className='bx bx-fullscreen full-screen-open header-link-icon'></i>
                  )}
                </SpkButton>
              </div>
              <div className='header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center ti-dropdown [--placement:bottom-left]'>
                <SpkButton
                  Id='dropdown-profile'
                  buttontype='button'
                  customClass='hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent '>
                  <img
                    className='inline-block rounded-full '
                    src={authAvatarImageUrl()}
                    width='32'
                    height='32'
                    alt='Image Description'
                  />
                </SpkButton>
                <div className='md:block hidden dropdown-profile'>
                  <p className='font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] '>
                    {globalStateRedux?.user?.displayname ?? "blank"}
                  </p>
                  <span className='opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] '>
                    {globalStateRedux?.user?.company?.name ?? globalStateRedux?.user?.user_istype ?? "blank"}
                  </span>
                </div>
                <div
                  className='hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end'
                  aria-labelledby='dropdown-profile'>
                  <ul className='text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50'>
                    <li>
                      <Link
                        className='w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem]'
                        to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <i className='ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7] !inline-flex'></i>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] '
                        to={`${import.meta.env.BASE_URL}pages/email/mail-app/`}>
                        <i className='ti ti-inbox text-[1.125rem] me-2 opacity-[0.7] !inline-flex'></i>
                        Inbox{' '}
                        <span className='!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto'>
                          25
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className='w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem]'
                        to={`${import.meta.env.BASE_URL
                          }pages/email/mail-settings/`}>
                        <i className='ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7] !inline-flex'></i>
                        Settings
                      </Link>
                    </li>

                    <li>
                      <Link
                        className='w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex'
                        to="/auth/logout"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default navigation
                          routeChange();
                        }}>
                        <i className='ti ti-logout text-[1.125rem] me-2 opacity-[0.7] !inline-flex'></i>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='header-element md:px-[0.48rem]'>
                <SpkButton
                  Label='button'
                  buttontype='button'
                  customClass='hs-dropdown-toggle switcher-icon inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium  align-middle transition-all text-xs dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10'
                  Overlay='#hs-overlay-switcher'>
                  <i className='bx bx-cog header-link-icon animate-spin-slow'></i>
                </SpkButton>
              </div>
            </div>
          </div >
        </nav >
      </div >
      <Modalsearch />
    </Fragment >
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
