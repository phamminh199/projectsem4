import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const getIconByName = (iconName: string) => {
        
   switch (iconName) {
      case 'signin':
         return <LoginIcon fontSize="small"/>
      case 'signout':
         return <LogoutIcon fontSize="small"/>
      case 'account':
         return <Settings fontSize="small"/>
      case 'signup':
         return <PersonAddIcon fontSize="small"/>
      case 'dashboard':
         return <AdminPanelSettingsIcon fontSize="small"/>
      default:
         return <React.Fragment/>
   }
}
