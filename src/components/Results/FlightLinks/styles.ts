import ctl from "helpers/ctl";

const input = ctl(`
appearance-none 
block 
mb-3
mr-2
py-2 
px-3 
bg-gray-100 
border 
placeholder-gray-400
rounded 
leading-tight
outline-none
focus:outline-none
focus:bg-white
focus:ring-primary
focus:border-primary
`);

const radio = ctl(`
mr-2
border-gray-400
outline-none 
focus:outline-none 
focus:border-primary 
focus:ring-primary 
text-primary
`)

const link = ctl(`
grid 
place-items-center 
w-38
h-12
shadow-special 
rounded-md 
text-white 
font-bold 
text-center
filter 
hover:brightness-75
`)

export default {
  input, radio, link
}