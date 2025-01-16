import{u as B,r as o,j as s,L as F}from"./index-D0jTGpOe.js";import{u as I,v as b,a as S}from"./index.esm-dKqOkKeh.js";import{R as V}from"./ReverseTimer-NxXJsJkJ.js";const W=()=>{const P=B(),[m,T]=o.useState(new Array(6).fill("")),E=m.length,{register:d,handleSubmit:C,watch:k,trigger:i,getValues:q,setError:f,clearErrors:O,formState:{errors:n,isSubmitting:w}}=I(),[u,U]=o.useState(!1),[p,K]=o.useState(!1),[h,x]=o.useState(!1),[j,L]=o.useState(null),c=o.useRef([]),[R,M]=o.useState(0),$=k("password"),v=e=>{e==0?U(!u):K(!p)},D=async e=>{const{name:a,email:t,password:r}=e,g=await(await fetch("http://localhost:3000/api/sign-up",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,email:t,password:r,otp:j}),credentials:"include"})).json();g.message?P("/sign-in"):g.message==="server"?alert("The server was not responding"):f("otp",{type:"maunal",message:"The otp is invalid"})},J=async e=>!!(await(await fetch("http://localhost:3000/api/nameExist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})})).json()).message,l=async e=>{if(e==="next"){const a=await i("name"),t=await i("email"),r=await i("password"),y=await i("confirmPassword");if(a&&t&&r&&y){const N={email:q("email")};(await(await fetch("http://localhost:3000/api/sendSignUpOtp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(N),credentials:"include"})).json()).message&&(x(!0),M(300))}}e==="name"&&await i("name"),e==="email"&&await i("email"),e==="password"&&await i("password"),e==="confirmPassword"&&await i("confirmPassword"),e==="back"&&x(!1)},_=(e,a)=>{const t=e.target.value,r=[...m];r[a]=t.substring(t.length-1),T(r),L(r.join("")),t&&a<E-1&&c.current[a+1]&&c.current[a+1].focus(),isNaN(j)?f("otp",{type:"manual",message:"Please enter the valid otp "}):O("otp")},A=(e,a)=>{e.key==="Backspace"&&!m[a]&&a>0&&c.current[a-1]&&c.current[a-1].focus()};return s.jsxs("section",{className:"sign-up",children:[s.jsx("div",{className:"heading",children:"Sign Up"}),s.jsx("div",{className:"sub-heading",children:"Create New Account"}),s.jsxs("form",{action:"",onSubmit:C(D),children:[h?s.jsxs("div",{className:"otp-validation",children:[s.jsx("div",{className:"text",children:"Enter 6-digit code sent to your email. This code is valid for the next 5 minutes"}),s.jsxs("div",{className:"otpfield",children:[s.jsx("div",{className:"otp-input",children:m.map((e,a)=>s.jsx("input",{type:"text",value:e,onChange:t=>{_(t,a)},ref:t=>c.current[a]=t,onKeyDown:t=>{A(t,a)},placeholder:"0"},a))}),s.jsxs("div",{className:"resend-timer",children:[s.jsx("span",{children:"Otp valid for 5 minute"}),h?s.jsx(V,{initialTime:R}):s.jsx("span",{})]})]}),s.jsx("div",{})]}):s.jsxs("div",{className:"form-validation",children:[s.jsxs("div",{className:"username",children:[s.jsx("input",{type:"text",onKeyUp:()=>{l("name")},placeholder:"username",...d("name",{required:{value:!0,message:"Username is required"},minLength:{value:3,message:"Minimum length is 3 "},maxLength:{value:15,message:"Maximum length is 15 "},pattern:{value:/^\S*$/,message:"Username should not contain any spaces"},validate:{userExist:async e=>await J(e)||"The username is already taken"}})}),s.jsx("div",{className:"error",children:n.name&&n.name.message})]}),s.jsxs("div",{className:"email",children:[s.jsx("input",{type:"text",placeholder:"Email",onKeyUp:()=>{l("email")},...d("email",{required:{value:!0,message:"Email is required"},pattern:{value:/^[^\s@]+@[^\s@]+\.(com)$/i,message:"Please enter valid email"}})}),s.jsx("div",{className:"error",children:n.email&&n.email.message})]}),s.jsxs("div",{className:"password",children:[s.jsxs("div",{className:"password-field",children:[s.jsx("input",{type:u?"password":"text",onKeyUp:()=>{l("password")},placeholder:"Password",...d("password",{required:{value:!0,message:"Password is required"},minLength:{value:3,message:"Minimum length 3 required"},maxLength:{value:15,message:"Maximum length 15 required"},pattern:{value:/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/,message:"Password should contain special character and numeric value"}})}),s.jsx("button",{className:"pass",type:"button",onClick:()=>{v(0)},children:s.jsx("img",{src:u?b:S,className:"image",alt:""})})]}),s.jsx("div",{className:"error",children:n.password&&n.password.message})]}),s.jsxs("div",{className:"confirm-password",children:[s.jsxs("div",{className:"password-field",children:[s.jsx("input",{type:p?"password":"text",onKeyUp:()=>{l("confirmPassword")},placeholder:"Confirm password",...d("confirmPassword",{required:{value:!0,message:"This field is required"},validate:e=>e===$||"Passwords do not match"})}),s.jsx("button",{className:"pass",type:"button",onClick:()=>{v(1)},children:s.jsx("img",{src:p?b:S,className:"image",alt:""})})]}),s.jsx("div",{className:"error",children:n.confirmPassword&&n.confirmPassword.message})]})]}),h?s.jsxs("div",{className:"button",children:[s.jsx("button",{className:"submit",type:"button",onClick:()=>{l("back")},children:"Back"}),s.jsx("button",{disabled:w,className:"submit",type:"submit",children:w?s.jsx("div",{className:"loader"}):"submit"})]}):s.jsx("button",{className:"submit",onClick:()=>{l("next")},type:"button",children:"Next"})]}),s.jsx("span",{className:"or"}),s.jsx("div",{className:"sign_in",children:s.jsxs("div",{children:["Don' t hava an account?"," ",s.jsx("button",{children:s.jsx(F,{to:"/sign-in",children:"Sign In"})})]})})]})};export{W as default};
