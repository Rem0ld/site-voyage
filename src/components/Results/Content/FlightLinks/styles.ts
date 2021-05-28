import ctl from "helpers/ctl";

const input = ctl(`
appearance-none 
block
w-full
h-10
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
disabled:bg-gray-200
`);

const radio = ctl(`
mr-1
border-gray-400
outline-none 
focus:outline-none 
focus:border-primary 
focus:ring-primary 
text-primary
`)

export default {
  input, radio
}