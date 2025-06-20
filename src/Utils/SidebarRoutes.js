import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
export const sidebarRoutes = [
    { 
        groupname: 'General',
        groupicon: HomeIcon,
        routes:[
            {
                path: '/',
                name: 'Dashboard',
                icon: HomeIcon,
                permission: ''
            },
            {
                path: '/boards',
                name: 'Boards',
                icon: TableChartIcon,
                permission: 'board.index'
            },
            {
                path: '/lists',
                name: 'Lists',
                icon: TableChartIcon,
                permission: 'board.index'
            },
            {
                path: '/logs',
                name: 'Logs',
                icon: TableChartIcon,
                permission: 'logs.index'
            }
        ]
    },
    { 
        groupname: 'User',
        groupicon: PersonIcon,
        routes:[
            {
                path: '/profile',
                name: 'Profile',
                icon: PersonIcon,
                permission: ''
            }
        ]
    },
];