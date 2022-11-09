import { IMenuItem } from "./Menu.interface";
import { HiHome, HiChartBar, HiCollection, HiStar } from 'react-icons/hi';

export const MenuArr: IMenuItem[] =
    [{
        title: "Home",
        link: '/',
        icon: HiHome
    },
    {
        title: "Popular",
        link: '/popular',
        icon: HiChartBar
    },
    {
        title: "Subscriptions",
        link: '/subscriptions',
        icon: HiCollection
    },
    {
        title: "My channel",
        link: '/channel',
        icon: HiStar
    }
    ]