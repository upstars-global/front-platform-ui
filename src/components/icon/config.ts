// fill
import allSlots from '../../assets/icons/fill/allSlots.svg?raw'
import arrowBack from '../../assets/icons/fill/arrowBack.svg?raw'
import arrowNext from '../../assets/icons/fill/arrowNext.svg?raw'
import arrowUp from '../../assets/icons/fill/arrowUp.svg?raw'
import bankCard from '../../assets/icons/fill/bankCard.svg?raw'
import bitcoin from '../../assets/icons/fill/bitcoin.svg?raw'
import calendar from '../../assets/icons/fill/calendar.svg?raw'
import chat from '../../assets/icons/fill/chat.svg?raw'
import check from '../../assets/icons/fill/check.svg?raw'
import checkCircle from '../../assets/icons/fill/checkCircle.svg?raw'
import close from '../../assets/icons/fill/close.svg?raw'
import closeCircle from '../../assets/icons/fill/closeCircle.svg?raw'
import copy from '../../assets/icons/fill/copy.svg?raw'
import deposit from '../../assets/icons/fill/deposit.svg?raw'
import dropdownDown from '../../assets/icons/fill/dropdownDown.svg?raw'
import dropdownLeft from '../../assets/icons/fill/dropdownLeft.svg?raw'
import dropdownRight from '../../assets/icons/fill/dropdownRight.svg?raw'
import dropdownUp from '../../assets/icons/fill/dropdownUp.svg?raw'
import edit from '../../assets/icons/fill/edit.svg?raw'
import exclamationCircle from '../../assets/icons/fill/exclamationCircle.svg?raw'
import exclamationOctagon from '../../assets/icons/fill/exclamationOctagon.svg?raw'
import exclamationTriangle from '../../assets/icons/fill/exclamationTriangle.svg?raw'
import filterOutline from '../../assets/icons/fill/filterOutline.svg?raw'
import fullscreen from '../../assets/icons/fill/fullscreen.svg?raw'
import info1 from '../../assets/icons/fill/info_1.svg?raw'
import info3 from '../../assets/icons/fill/info_3.svg?raw'
import info4 from '../../assets/icons/fill/info_4.svg?raw'
import legality from '../../assets/icons/fill/legality.svg?raw'
import longTap from '../../assets/icons/fill/longTap.svg?raw'
import mail from '../../assets/icons/fill/mail.svg?raw'
import minus from '../../assets/icons/fill/minus.svg?raw'
import notAvailable from '../../assets/icons/fill/notAvailable.svg?raw'
import paymentCard from '../../assets/icons/fill/paymentCard.svg?raw'
import paymentCard2 from '../../assets/icons/fill/paymentCard_2.svg?raw'
import phone from '../../assets/icons/fill/phone.svg?raw'
import plus from '../../assets/icons/fill/plus.svg?raw'
import prize from '../../assets/icons/fill/prize.svg?raw'
import promoCode from '../../assets/icons/fill/promoCode.svg?raw'
import radioButton from '../../assets/icons/fill/radioButton.svg?raw'
import radioButtonActive from '../../assets/icons/fill/radioButtonActive.svg?raw'
import rollUp from '../../assets/icons/fill/rollUp.svg?raw'
import safety2 from '../../assets/icons/fill/safety_2.svg?raw'
import timer from '../../assets/icons/fill/timer.svg?raw'
import user from '../../assets/icons/fill/user.svg?raw'
import visibilityOff from '../../assets/icons/fill/visibilityOff.svg?raw'
import visibilityOn from '../../assets/icons/fill/visibilityOn.svg?raw'
import withdraw from '../../assets/icons/fill/withdraw.svg?raw'
// navigation
import arena from '../../assets/icons/navigation/arena.svg?raw'
import bet from '../../assets/icons/navigation/bet.svg?raw'
import birthdayPromo from '../../assets/icons/navigation/birthdayPromo.svg?raw'
import bonuses from '../../assets/icons/navigation/bonuses.svg?raw'
import eSport from '../../assets/icons/navigation/esport.svg?raw'
import faq from '../../assets/icons/navigation/faq.svg?raw'
import giftShop from '../../assets/icons/navigation/giftShop.svg?raw'
import more from '../../assets/icons/navigation/more.svg?raw'
import pokies from '../../assets/icons/navigation/pokies.svg?raw'
import profile from '../../assets/icons/navigation/profile.svg?raw'
import table from '../../assets/icons/navigation/table.svg?raw'
import vip from '../../assets/icons/navigation/vip.svg?raw'
// outline
import actions from '../../assets/icons/outline/actions.svg?raw'
import current from '../../assets/icons/outline/current.svg?raw'
import filters from '../../assets/icons/outline/filters.svg?raw'
import giftBox from '../../assets/icons/outline/giftBox.svg?raw'
import loader from '../../assets/icons/outline/loader.svg?raw'
import notificationsOff from '../../assets/icons/outline/notificationsOff.svg?raw'
import quests from '../../assets/icons/outline/quests.svg?raw'
import search from '../../assets/icons/outline/search.svg?raw'
import support from '../../assets/icons/outline/support.svg?raw'
import tournaments from '../../assets/icons/outline/tournaments.svg?raw'
import vipEvents from '../../assets/icons/outline/vipEvents.svg?raw'
// social
import facebook from '../../assets/icons/social/facebook.svg?raw'
import instagram from '../../assets/icons/social/instagram.svg?raw'
import twitter from '../../assets/icons/social/twitter.svg?raw'
import whatsapp from '../../assets/icons/social/whatsapp.svg?raw'

const iconsFill = {
  allSlots,
  arrowBack,
  arrowNext,
  arrowUp,
  bankCard,
  calendar,
  check,
  checkCircle,
  closeCircle,
  close,
  deposit,
  dropdownDown,
  dropdownLeft,
  dropdownRight,
  dropdownUp,
  exclamationCircle,
  exclamationOctagon,
  exclamationTriangle,
  fullscreen,
  info1,
  info3,
  info4,
  promoCode,
  mail,
  phone,
  chat,
  minus,
  notAvailable,
  plus,
  prize,
  rollUp,
  safety2,
  timer,
  user,
  visibilityOff,
  visibilityOn,
  copy,
  radioButton,
  radioButtonActive,
  longTap,
  bitcoin,
  paymentCard,
  paymentCard2,
  filterOutline,
  edit,
  legality,
  withdraw
}
const iconsNavigation = {
  pokies,
  bet,
  arena,
  table,
  eSport,
  bonuses,
  vip,
  profile,
  faq,
  giftShop,
  birthdayPromo,
  more
}
const iconsOutline = {
  giftBox,
  notificationsOff,
  search,
  filters,
  support,
  loader,
  tournaments,
  actions,
  quests,
  current,
  vipEvents
}
const iconsSocial = {
  facebook,
  instagram,
  twitter,
  whatsapp
}

export type IconsFill = keyof typeof iconsFill
export type IconsNavigation = keyof typeof iconsNavigation
export type IconsOutline = keyof typeof iconsOutline
export type IconsSocial = keyof typeof iconsSocial
export type IconName = IconsFill | IconsNavigation | IconsOutline | IconsSocial

export const icons: Record<string, string> = {
  ...iconsFill,
  ...iconsNavigation,
  ...iconsOutline,
  ...iconsSocial
}
