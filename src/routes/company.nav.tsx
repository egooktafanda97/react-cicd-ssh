const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;

export const CompanyNav: any = [
    {
        icon: DashboardIcon,
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
                path: `${import.meta.env.VITE_META_BASE_PATH}app-services`,
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
]

export const CompanyMasterNav: any = [
    {
        icon: DashboardIcon,
        path: `${import.meta.env.VITE_META_BASE_PATH}users`,
        title: "Users Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-COMPANY",
    },
    {
        icon: DashboardIcon,
        path: `${import.meta.env.VITE_META_BASE_PATH}roles`,
        title: "Roles Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-COMPANY",
    },
]