import{d as f,c as k,a as S,o as _,r as h,n as q}from"./iframe-DOOvEQod.js";import"./preload-helper-D9Z9MdNV.js";const z=["type","disabled"],B=f({__name:"Button",props:{variant:{default:"primary"},size:{default:"medium"},disabled:{type:Boolean,default:!1},type:{default:"button"},class:{default:""}},emits:["click"],setup(e,{emit:i}){const t=e,d=i,p=k(()=>{const r="qk-button",g=`qk-button--${t.variant}`,v=`qk-button--${t.size}`,y=t.disabled?"qk-button--disabled":"";return[r,g,v,y,t.class].filter(Boolean).join(" ")}),b=r=>{t.disabled||d("click",r)};return(r,g)=>(_(),S("button",{type:r.type,class:q(p.value),disabled:r.disabled,onClick:b},[h(r.$slots,"default",{},void 0,!0)],10,z))}}),C=(e,i)=>{const t=e.__vccOpts||e;for(const[d,p]of i)t[d]=p;return t},a=C(B,[["__scopeId","data-v-d3e53c28"]]);B.__docgenInfo={exportName:"default",displayName:"Button",description:"",tags:{},props:[{name:"variant",required:!1,type:{name:"union",elements:[{name:'"primary"'},{name:'"secondary"'},{name:'"outline"'},{name:'"ghost"'}]},defaultValue:{func:!1,value:"'primary'"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"small"'},{name:'"medium"'},{name:'"large"'}]},defaultValue:{func:!1,value:"'medium'"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"type",required:!1,type:{name:"union",elements:[{name:'"button"'},{name:'"submit"'},{name:'"reset"'}]},defaultValue:{func:!1,value:"'button'"}},{name:"class",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"click",type:{names:["MouseEvent"]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/quanta-kit-design-system/quanta-kit-design-system/packages/quanta-kit-vue/src/components/Button/Button.vue"]};const D={title:"Components/Button",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","outline","ghost"]},size:{control:{type:"select"},options:["small","medium","large"]},disabled:{control:{type:"boolean"}},type:{control:{type:"select"},options:["button","submit","reset"]}}},s={args:{variant:"primary"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Primary Button</Button>'})},n={args:{variant:"secondary"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Secondary Button</Button>'})},o={args:{variant:"outline"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Outline Button</Button>'})},u={args:{variant:"ghost"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Ghost Button</Button>'})},l={args:{size:"small"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Small Button</Button>'})},m={args:{size:"large"},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Large Button</Button>'})},c={args:{disabled:!0},render:e=>({components:{Button:a},setup(){return{args:e}},template:'<Button v-bind="args">Disabled Button</Button>'})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Primary Button</Button>'
  })
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Secondary Button</Button>'
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Outline Button</Button>'
  })
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "ghost"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Ghost Button</Button>'
  })
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "small"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Small Button</Button>'
  })
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "large"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Large Button</Button>'
  })
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: '<Button v-bind="args">Disabled Button</Button>'
  })
}`,...c.parameters?.docs?.source}}};const G=["Primary","Secondary","Outline","Ghost","Small","Large","Disabled"];export{c as Disabled,u as Ghost,m as Large,o as Outline,s as Primary,n as Secondary,l as Small,G as __namedExportsOrder,D as default};
