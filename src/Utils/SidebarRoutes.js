import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
export const sidebarRoutes = [
    { 
        groupname: 'General',
        groupicon: HomeIcon,
        routes:[
            {
                path: '/',
                name: 'Dashboard',
                icon: HomeIcon,
            },
            {
                path: '/login',
                name: 'Login',
                icon: LockIcon,
            },
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
            }
        ]
    },
];