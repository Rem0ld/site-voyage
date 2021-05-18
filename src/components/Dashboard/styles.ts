import ctl from "helpers/ctl";

const input = ctl(`
appearance-none 
bg-transparent 
border-t-0 
border-r-0 
border-l-0 
border-b-1 
border-gray-300 
w-full 
mr-3 
py-1 
px-2 
leading-tight
focus:outline-none 
focus:ring-white 
focus:bg-white
focus:border-primary
focus:border-b-2
hover:border-primary
hover:border-b-2
`);

const component = ctl(`
absolute 
z-10 
height 
lg:w-2/12 
w-5/12 
mt-1 
p-2 
transform-gpu 
shadow-md 
bg-white
`)

export default {
  input,
  component
}