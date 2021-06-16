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
flex
items-center
space-x-2
py-1 
px-1
rounded-md
hover:bg-gray-100
`)

const linkDesktop = ctl(`
flex
flex-col
text-xs
items-center
justify-center
leading-5
`)

const variant = ctl(`
w-22
h-9
grid
place-items-center
py-1 
px-2 
px-2
transition
duration-500
transform-gpu
hover:scale-105
shadow-xs
border-2
font-bold
rounded-full
`);

const variantPrimary = ctl(`
bg-primary
hover:bg-gray-100
border-primary
text-white
hover:text-primary
`);

const variantSecondary = ctl(`
bg-gray-100
hover:bg-primary
border-primary
text-primary
hover:text-gray-100
`);


export default {
  menu,
  notif,
  link,
  linkDesktop,
  variant,
  variantPrimary,
  variantSecondary
};
