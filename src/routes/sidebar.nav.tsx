import { CompanyMasterNav, CompanyNav } from "./company.nav";

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;
const ApplicationIcon = <i className="bx bx-grid-alt side-menu__icon"></i>;
const CompanyIcon = <i className="bx bx-buildings side-menu__icon"></i>;
const ServicesIcon = <i className="bx bx-cog side-menu__icon"></i>;
const LanguageIcon = <i className="bx bx-globe side-menu__icon"></i>;
const MailIcon = <i className="bx bx-envelope side-menu__icon"></i>;
const SettingsIcon = <i className="bx bx-wrench side-menu__icon"></i>;

export const MenuItems: any = [
    {
        menutitle: "MAIN",
        permission: "ALL",
    },

    {
        icon: DashboardIcon,
        path: `${import.meta.env.BASE_URL}dashboard`,
        title: "Dashboards",
        type: "link",
        active: false,
        selected: false,
        permission: "FE-DASHBOARD",
    },
    ...CompanyNav,
    {
        icon: ApplicationIcon,
        path: `${import.meta.env.BASE_URL}app-services`,
        title: "Services",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-PUBLIC",
    },
    {
        icon: CompanyIcon,
        path: `${import.meta.env.BASE_URL}company`,
        title: "Company",
        type: "link",
        active: false,
        selected: false,
        permission: "FE-MASTER-COMPANY",
    },
    {
        icon: ServicesIcon,
        path: `${import.meta.env.BASE_URL}services`,
        title: "Services",
        type: "link",
        active: false,
        selected: false,
        permission: "FE-MASTER-SERVICE",
    },
    {
        menutitle: "Master",
        permission: "ALL",
    },
    {
        icon: LanguageIcon,
        path: `${import.meta.env.BASE_URL}language-master`,
        title: "Language Master",
        type: "link",
        active: false,
        selected: false,
        permission: "SUPER-PERMISSION",
    },
    {
        icon: MailIcon,
        path: `${import.meta.env.BASE_URL}mail`,
        title: "Mail",
        type: "link",
        active: false,
        selected: false,
        permission: "SUPER-PERMISSION",
    },
    {
        icon: SettingsIcon,
        path: `${import.meta.env.BASE_URL}app-setting`,
        title: "App Setting",
        type: "link",
        active: false,
        selected: false,
        permission: "SUPER-PERMISSION",
    },
    ...CompanyMasterNav,
];
