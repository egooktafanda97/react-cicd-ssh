import SpkBadge from '../../../../src/@spk/uielements/spk-badge';

const DashboardIcon = <i className='bx bx-home side-menu__icon'></i>;

const CompanyIcon = <i className='bx bx-briefcase side-menu__icon'></i>;

const ErrorIcon = <i className='bx bx-error side-menu__icon'></i>;

const NestedmenuIcon = <i className='bx bx-layer side-menu__icon'></i>;

export const MenuItems: any = [
  {
    menutitle: 'MAIN',
  },

  {
    icon: DashboardIcon,
    path: `${import.meta.env.BASE_URL}dashboard`,
    title: 'Dashboards',
    type: 'link',
    active: false,
    selected: false,
  },
  {
    icon: CompanyIcon,
    path: `${import.meta.env.BASE_URL}company`,
    title: 'Company',
    type: 'link',
    active: false,
    selected: false,
  },
  {
    icon: CompanyIcon,
    path: `${import.meta.env.BASE_URL}permissions`,
    title: 'Permissions',
    type: 'link',
    active: false,
    selected: false,
  },

  {
    menutitle: 'Master',
  },
];
