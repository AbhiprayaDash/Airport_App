import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdLocalAirport,MdOutlineLocalAirport } from "react-icons/md";
import { DiCodeBadge } from "react-icons/di";
import { GrTransaction } from "react-icons/gr";
export const SidebarData = [
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard',
  //   icon: <AiIcons.AiFillHome />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Chart Report',
    path: '/chart',
    icon: <AiIcons.AiOutlineBarChart />,
    cName: 'nav-text'
  },
  {
    title: 'Report',
    path: '/report',
    icon: <DiCodeBadge />,
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