import ctl from "../../../helpers/ctl";

const menu = ctl(`
menu
absolute
top-8
right-2
z-special 
w-40
h-auto
transition-opacity
drop-shadow 
bg-white
rounded-md
border
border-gray-200
md:leading-7
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

const link = ctl(`
block 
py-1 
px-2 
rounded-md
hover:bg-gray-100
`)

export default {
  menu,
  notif,
  link
};
