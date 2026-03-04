import type { IMenuItem } from "@/shared/components/custom-ui/nav-menu/nav-menu.types";
import { PAGES } from "@/shared/config/page.config";
import { BookMarked, CalendarDaysIcon, ForkKnifeIcon, House, LineChart, StoreIcon, UsersRound } from "lucide-react";

export const navMenuItems: IMenuItem[] = [
  {
    icon: House,
    label: 'Главная',
    href: PAGES.DASHBOARD
  },
  {
    icon: CalendarDaysIcon,
    label: 'График',
    href: PAGES.MEAL_PLANS
  },
  {
    icon: ForkKnifeIcon,
    label: 'Питание',
    href: PAGES.NUTRITION
  },
  {
    icon: LineChart,
    label: 'Мониторинг',
    href: PAGES.ANALYTICS
  },
  {
    icon: StoreIcon,
    label: 'Заказы',
    href: PAGES.ORDER_GROCERIES
  },
  {
    icon: BookMarked,
    label: 'Рецепты',
    href: PAGES.RECIPES
  },
  {
    icon: UsersRound,
    label: 'Форум',
    href: PAGES.FORUM
  }
]