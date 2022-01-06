import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdLocalAirport, MdOutlineLocalAirport } from 'react-icons/md';

export const Reportdata = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Chart Report',
    path: '/chart',
    icon: <AiIcons.AiOutlineBarChart />,
    cName: 'nav-text'
  },
  {
    title: 'Airports',
    path: '/airports',
    icon: <MdLocalAirport />,
    cName: 'nav-text'
  },
  {
    title: 'Aircrafts',
    path: '/aircrafts',
    icon: <MdOutlineLocalAirport />,
    cName: 'nav-text'
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <AiIcons.AiOutlineTranslation />,
    cName: 'nav-text'
  },
  
];