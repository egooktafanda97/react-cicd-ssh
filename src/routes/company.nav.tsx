// Import ikon baru
const SettingsIcon = <i className="bx bx-cog side-menu__icon"></i>;
const UsersIcon = <i className="bx bx-user side-menu__icon"></i>;
const RolesIcon = <i className="bx bx-lock side-menu__icon"></i>;

// Menyesuaikan CompanyNav dan CompanyMasterNav
export const CompanyNav: any = [
    {
        icon: SettingsIcon,  // Mengganti ikon Dashboard dengan ikon settings
        path: `${import.meta.env.VITE_META_BASE_PATH}app-services`,
        title: "Settings",
        type: "sub",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-COMPANY",
        children: [
            {
                path: `${import.meta.env.VITE_META_BASE_PATH}app-services`,
                title: "Formula",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-COMPANY",
            },
            {
                path: `${import.meta.env.VITE_META_BASE_PATH}master/tax`,
                title: "Tax",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-COMPANY",
            },
            {
                path: `${import.meta.env.VITE_META_BASE_PATH}app-services`,
                title: "Format Document",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-COMPANY",
            },
            {
                path: `${import.meta.env.VITE_META_BASE_PATH}app-services`,
                title: "Config",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-COMPANY",
            },
        ]
    },
    {
        icon: UsersIcon,  // Mengganti ikon Dashboard dengan ikon user
        path: `${import.meta.env.VITE_META_BASE_PATH}users`,
        title: "Users Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-COMPANY",
    },
    {
        icon: RolesIcon,  // Mengganti ikon Dashboard dengan ikon lock
        path: `${import.meta.env.VITE_META_BASE_PATH}roles`,
        title: "Roles Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-COMPANY",
    },
];

export const CompanyMasterNav: any = [

];
