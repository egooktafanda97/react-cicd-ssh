const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;

export const CompanyNav: any = [
    {
        icon: DashboardIcon,
        path: `${import.meta.env.BASE_URL}app-services`,
        title: "Settings",
        type: "sub",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-PUBLIC",
        children: [
            {
                path: `${import.meta.env.BASE_URL}app-services`,
                title: "Formula",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-PUBLIC",
            },
            {
                path: `${import.meta.env.BASE_URL}app-services`,
                title: "Tax",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-PUBLIC",
            },
            {
                path: `${import.meta.env.BASE_URL}app-services`,
                title: "Format Document",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-PUBLIC",
            },
            {
                path: `${import.meta.env.BASE_URL}app-services`,
                title: "Config",
                type: "link",
                active: false,
                selected: false,
                permission: "AUTH-ACCESS-PUBLIC",
            },
        ]
    },
]

export const CompanyMasterNav: any = [
    {
        icon: DashboardIcon,
        path: `${import.meta.env.BASE_URL}users`,
        title: "Users Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-PUBLIC",
    },
    {
        icon: DashboardIcon,
        path: `${import.meta.env.BASE_URL}roles`,
        title: "Roles Management",
        type: "link",
        active: false,
        selected: false,
        permission: "AUTH-ACCESS-PUBLIC",
    },
]