import ctl from "../../../helpers/ctl";

const menu = ctl(`
menu
opacity-0
absolute
top-8
z-30
right-2
w-40
h-auto
py-1
px-2
transition-opacity
drop-shadow 
bg-white
rounded-md
border
border-gray-200
leading-10
md:text-md
text-lg
`);

const notif = ctl(`
absolute 
-top-2 
left-4 
min-w-min
min-h-min 
flex 
justify-center 
items-center 
bg-red-600 
rounded-md
`);

export default {
  menu,
  notif,
};
