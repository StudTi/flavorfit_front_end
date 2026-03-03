import type { IMenuItem } from "@/shared/components/custom-ui/nav-menu/nav-menu.types";
import { PAGES } from "@/shared/config/page.config";
import { BookMarked, CalendarDaysIcon, ForkKnifeIcon, House, LineChart, StoreIcon, UsersRound } from "lucide-react";

export const navMenuItems: IMenuItem[] = [
  {
    icon: House,
    label: 'Home',
    href: PAGES.DASHBOARD
  },
  {
    icon: CalendarDaysIcon,
    label: 'Meal Plans',
    href: PAGES.MEAL_PLANS
  },
  {
    icon: ForkKnifeIcon,
    label: 'Nutrition',
    href: PAGES.NUTRITION
  },
  {
    icon: LineChart,
    label: 'Analytics',
    href: PAGES.ANALYTICS
  },
  {
    icon: StoreIcon,
    label: 'Order Groceries',
    href: PAGES.ORDER_GROCERIES
  },
  {
    icon: BookMarked,
    label: 'Recipes',
    href: PAGES.RECIPES
  },
  {
    icon: UsersRound,
    label: 'Forum',
    href: PAGES.FORUM
  }
]