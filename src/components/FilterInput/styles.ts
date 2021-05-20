import ctl from "helpers/ctl";


const input = ctl(`
appearance-none 
bg-transparent 
border-t-0 
border-r-0 
border-l-0 
border-b-1 
border-gray-300 
w-2/4 
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

const list = ctl(`
min-h-list-filter-input
shadow-inset-outset 
absolute 
z-20 
top-12 
left-4 
w-2/4 
h-8 
max-h-80
h-auto
p-2 
rounded-md 
bg-gray-100 
overflow-y-scroll
`)

export default {
  input,
  list
}