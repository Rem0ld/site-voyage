import ctl from "helpers/ctl";

const input = ctl(`
w-full
sm:w-50
lg:w-auto
mb-2
appearance-none
rounded-md
border-gray-200
border-0
border-b
leading-tight 
outline-none
focus:outline-none
focus:ring-primary
focus:border-primary
focus:border-b-0
disabled:bg-gray-200
`);

const inputPassword = ctl(`
w-full
sm:w-20
md:w-40
appearance-none
rounded-md
border-gray-200
leading-tight 
outline-none
focus:outline-none
focus:ring-primary
focus:border-primary
`);

export default {
  input,
  inputPassword
}