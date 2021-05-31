import ctl from "helpers/ctl";


const label = ctl(`
mr-2
`);

const input = ctl(`
w-full
sm:w-50
md:w-auto
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
  label,
  input,
  inputPassword
}