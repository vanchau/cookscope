(this.webpackJsonpcookscope=this.webpackJsonpcookscope||[]).push([[0],{102:function(e){e.exports=JSON.parse('{"1":"Appetizers","2":"Beef","3":"Breads","4":"Budget friendly","5":"Casseroles","6":"Chicken","7":"Dinner","8":"Desserts","9":"Fish","10":"Healthy","11":"Kid friendly","12":"Pasta","13":"Pork","14":"Salads","15":"Slow cooker","16":"Snacks","17":"Soups","18":"Vegetable"}')},103:function(e,t,a){e.exports=a(158)},108:function(e,t,a){},109:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){},156:function(e,t,a){},157:function(e,t,a){},158:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),o=a.n(l),i=(a(108),a(31)),c=a(29),s=(a(73),a(162)),m=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Settings"))},u=a(52),d=(a(109),a(165)),h=a(164),p=a(96),E=a(161),f=a(97),y=a(163),g=a(166),b=a(37),v=a(94),w=a.n(v),k=function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],l=t[1],o=function(){return l(!1)};return r.a.createElement(d.a,{className:"d-flex justify-content-between sticky-top",style:{backgroundColor:"white",borderBottom:"1px solid #E75B00"}},r.a.createElement("div",null,r.a.createElement(i.Link,{className:"navbar-brand",to:"/"},r.a.createElement("img",{className:"logo-image",src:w.a,alt:"logo"}))),r.a.createElement("div",null,r.a.createElement(h.a,{inline:!0,className:"mx-auto"},r.a.createElement(p.a,{type:"text",placeholder:"Enter dish or ingredient(s)",className:"search-bar form-size"}))),r.a.createElement("div",null,r.a.createElement(E.a,null,r.a.createElement(b.LinkContainer,{to:"/create-recipe"},r.a.createElement(f.a,{variant:"outline-create-recipe-button"},"Create recipe")),r.a.createElement(y.a,{show:a,onHide:o},r.a.createElement(y.a.Header,{closeButton:!0},r.a.createElement(y.a.Title,null,"Oops, it seems like you're not logged in.")),r.a.createElement(y.a.Body,null,r.a.createElement(h.a.Group,null,r.a.createElement(h.a.Label,null,"Email address"),r.a.createElement(h.a.Control,{type:"email",placeholder:"Enter email"})),r.a.createElement(h.a.Group,null,r.a.createElement(h.a.Label,null,"Password"),r.a.createElement(h.a.Control,{type:"password",placeholder:"Enter password"}))),r.a.createElement(y.a.Footer,null,r.a.createElement(f.a,{variant:"secondary",onClick:o},"Log in"),r.a.createElement(f.a,{variant:"primary",onClick:o},"Sign up"))),r.a.createElement(g.a,{title:"Settings",id:"basic-nav-dropdown",style:{marginRight:"20px",marginLeft:"20px"}},r.a.createElement(b.LinkContainer,{to:"/profile"},r.a.createElement(g.a.Item,null,"User profile")),r.a.createElement(b.LinkContainer,{to:"/terms"},r.a.createElement(g.a.Item,null,"Terms of Service")),r.a.createElement(b.LinkContainer,{to:"/privacy"},r.a.createElement(g.a.Item,null,"Privacy Policy")),r.a.createElement(g.a.Divider,null),r.a.createElement(b.LinkContainer,{to:"/logout"},r.a.createElement(g.a.Item,null,"Log out"))))))},C=a(71),I=a(48),x=a(49),S=a(54),P=a(50),O=a(55),N=(a(137),function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(S.a)(this,Object(P.a)(t).call(this,e))).addIngredient=function(){var e=a.state.numberOfIngredients+1;a.setState((function(t){return{ingredients:[].concat(Object(C.a)(t.ingredients),[{name:"",id:e}]),numberOfIngredients:e}}))},a.addStep=function(){var e=a.state.numberOfSteps+1;a.setState((function(t){return{steps:[].concat(Object(C.a)(t.steps),[{instruction:"",id:e}]),numberOfSteps:e}}))},a.state={ingredients:[{name:"",id:1}],numberOfIngredients:1,steps:[{instruction:"",id:1}],numberOfSteps:1},a}return Object(O.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,{style:{padding:"20px 120px"}},r.a.createElement(h.a.Group,{controlId:"formGridAddress1"},r.a.createElement(h.a.Control,{style:{height:"80px",fontSize:"2rem"},type:"text",placeholder:"Enter recipe title"})),r.a.createElement(h.a.Group,{controlId:"formGridAddress1"},r.a.createElement(h.a.Control,{as:"textarea",rows:"1",placeholder:"Tell a story about your recipe"})),r.a.createElement("h5",{className:"recipe-subtitles"},"Ingredients"),r.a.createElement("hr",{style:{marginTop:"0"}}),this.state.ingredients.map((function(e){return r.a.createElement(h.a.Group,{key:e.id,controlId:e.id,className:"ingredients"},r.a.createElement(h.a.Control,{placeholder:"2 cloves of garlic"}))})),r.a.createElement(f.a,{className:"add-ingredient",onClick:this.addIngredient},"+"),r.a.createElement("h5",{className:"recipe-subtitles"},"Instructions"),r.a.createElement("hr",{style:{marginTop:"0"}}),this.state.steps.map((function(e,t){return r.a.createElement(h.a.Group,{key:e.id,controlId:e.id,className:"steps"},r.a.createElement(h.a.Label,null,"Step ",t+1),r.a.createElement(h.a.Control,{placeholder:"Write instructions here"}))})),r.a.createElement(f.a,{className:"add-ingredient",onClick:this.addStep},"+"),r.a.createElement("hr",null),r.a.createElement(f.a,{variant:"primary",type:"submit",className:"submit-button"},"I'm done!"))}}]),t}(n.Component)),j=a(167),L=(a(138),a(102)),T=function(){alert("Category clicked!")},B=function(){return r.a.createElement(j.a,{className:"sticky-offset",variant:"flush",style:{width:"18rem",height:"100%",borderRight:"1px solid #DFDFDF",padding:"20px"}},r.a.createElement("h5",{style:{color:"#413938",margin:".3rem 1.25rem"}},"Categories"),Object.values(L).map((function(e){return r.a.createElement(j.a.Item,{key:e,action:!0,onClick:T},e)})))},Y=function(){return r.a.createElement("div",{style:{backgroundColor:"white",padding:"40px"}},r.a.createElement("h2",null,"PRIVACY POLICY"),r.a.createElement("h4",{style:{paddingBottom:"40px"}},"Last Updated: September 15, 2019"),r.a.createElement("h3",null,"Contents"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"#s1"},"1. Overview")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s2"},"2. What does this Privacy Policy cover?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s3"},"3. What Personal Information do we collect from you?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s4"},"4. Cookies")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s5"},"5. How do we use Personal Information collected from you?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s6"},"6. Who do we share your Personal Information with?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s7"},"7. Our legal grounds for processing Personal Information")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s8"},"8. Where is your Personal Information stored and processed?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s9"},"9. How long do we keep your Personal Information?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s10"},"10. How do we secure your Personal Information?")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s11"},"11. Changes to this Privacy Policy")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s12"},"12. Your rights")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s13"},"13. Contacting us, further questions and how to make a complaint"))),r.a.createElement("h2",{id:"#s1"},"1. Overview"),r.a.createElement("p",null,"This is the Website and App Privacy Policy (",r.a.createElement("b",null,'"Privacy Policy"'),") of the UK registered branch of CookScope Inc., a corporation registered at 4-20-3 Ebisu, Shibuya-ku, Tokyo, Japan (",r.a.createElement("b",null,'"CookScope"'),") and we are the data controller in respect of the Personal Information (as defined below) that we collect from you.  It covers information CookScope collects from users and visitors of our official website (",r.a.createElement("b",null,'"Site"'),") and official mobile app (",r.a.createElement("b",null,'"App"'),")."),r.a.createElement("p",null,"By accessing our Site or App, you confirm that you have read and understood the entirety of this Privacy Policy."),r.a.createElement("p",null,"You have various rights in respect of our use of your Personal Information as set out in t he ",r.a.createElement("a",{href:"#s13"},"'Your Rights'")," section below.  Two of the fundamental rights to be aware of are that you may:"),r.a.createElement("ol",{type:"1"},r.a.createElement("li",null,"ask us to stop using your Personal Information for direct-marketing by email or push notification.  If you exercise this right, we will stop using your Personal Information in this regard; and"),r.a.createElement("li",null,"ask us to consider any valid objections you have to our use of your Personal Information where we process your Personal Information on the basis of our, or a third party's, legitimate interests.")))},D=a(51),A=a.n(D),G=a(168),H=(a(156),function(e){function t(){var e,a;Object(I.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(S.a)(this,(e=Object(P.a)(t)).call.apply(e,[this].concat(r)))).state={recipes:[]},a.routeChange=function(e){console.log(e);var t="/recipe/"+e;a.props.history.push(t)},a}return Object(O.a)(t,e),Object(x.a)(t,[{key:"componentDidMount",value:function(){var e=this;A.a.get("/api/recipes").then((function(t){var a=t.data;e.setState({recipes:a})}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{flex:"5"}},this.state.recipes.map((function(t){return r.a.createElement(G.a,{onClick:function(){return e.routeChange(t.id)},key:t.id,style:{left:"18rem",width:"35rem",height:"18rem",alignItems:"center",margin:"30px 40px 30px 40px"}},r.a.createElement(G.a.Img,{style:{maxWidth:"100%",maxHeight:"100%",height:"auto"},variant:"top",src:t.imageUrl}),r.a.createElement(G.a.ImgOverlay,null,r.a.createElement("div",null,r.a.createElement(G.a.Title,{style:{color:"#3C3C3C"}},t.title),r.a.createElement(G.a.Text,{style:{color:"#3C3C3C"}},"by ",r.a.createElement("a",{className:"card-author",href:"#action"},t.author)))))})))}}]),t}(n.Component)),R=Object(c.o)(H),U=function(){return r.a.createElement("div",{style:{backgroundColor:"white",padding:"40px"}},r.a.createElement("h2",null,"TERMS OF SERVICE"),r.a.createElement("h4",{style:{paddingBottom:"40px"}},"Last Updated: May 10, 2019"),r.a.createElement("h3",null,"Contents"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"#s1"},"1. Your agreement")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s2"},"2. Privacy")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s3"},"3. Content on the services")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s4"},"4. Your rights and grant of rights in the content")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s5"},"5. Using the services")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s6"},"6. Your account")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s7"},"7. Your license to use the services")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s8"},"8. Ending these terms")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s9"},"9. Disclaimers and limitations of liability")),r.a.createElement("li",null,r.a.createElement("a",{href:"#s10"},"10. General"))),r.a.createElement("h2",{id:"#s1"},"1. Your agreement"),r.a.createElement("p",null,"You may use the Services only if you agree to form a binding contract with CookScope and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words \u201cyou\u201d and \u201cyour\u201d as used in these Terms shall refer to such entity."),r.a.createElement("h2",{id:"#s2"},"2. Privacy"),r.a.createElement("p",null,"Our Privacy Policy (https://www.cookscope.com/privacy) describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information to the United States, Ireland, and/or other countries for storage, processing and use by Twitter and its affiliates."))},W=(a(157),function(e){var t=e.match.params.recipeID,a=Object(n.useState)({ingredients:[],direction:[]}),l=Object(u.a)(a,2),o=l[0],i=l[1],c="/api/recipes/"+t;return console.log(c),Object(n.useEffect)((function(){A.a.get(c).then((function(e){console.log(e.data),i(e.data)}))}),[t]),console.log(o),r.a.createElement("div",{className:"recipe-background"},r.a.createElement("div",{className:"recipe-container"},r.a.createElement("h2",{className:"title"},o.title),r.a.createElement("h6",{className:"indent"},"by ",r.a.createElement("a",{className:"author",href:"#action"},o.author)),r.a.createElement("img",{className:"main-image",src:"."+o.imageUrl,alt:""}),r.a.createElement("h5",{className:"indent description"},'"'+o.instruction+'"'),r.a.createElement("br",null),r.a.createElement("h4",{className:"indent"},"Ingredients"),r.a.createElement("div",null,o.ingredients.map((function(e){return r.a.createElement("div",{key:e,className:"indent"},e)}))),r.a.createElement("br",null),r.a.createElement("h4",{className:"indent"},"Instructions"),r.a.createElement("div",null,o&&o.direction.map((function(e){return r.a.createElement("div",{key:e.id,className:"indent"},r.a.createElement("h6",{className:"inline"},e.step),". "+e.text)})))))}),F=function(){return r.a.createElement("div",{style:{width:"930px",display:"flex",backgroundColor:"white"}},r.a.createElement(B,null),r.a.createElement(R,null))},z=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"About"))},J=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.BrowserRouter,null,r.a.createElement(k,null),r.a.createElement("div",{style:{backgroundColor:"#f7f5ef"}},r.a.createElement(s.a,{style:{maxWidth:"900px",minHeight:"900px",backgroundColor:"white",paddingLeft:"0px",paddingRight:"0px"}},r.a.createElement(c.g,null,r.a.createElement(c.d,{exact:!0,path:"/",component:F}),r.a.createElement(c.d,{path:"/about",component:z}),r.a.createElement(c.d,{path:"/create-recipe",component:N}),r.a.createElement(c.d,{path:"/settings",component:m}),r.a.createElement(c.d,{path:"/privacy",component:Y}),r.a.createElement(c.d,{path:"/terms",component:U}),r.a.createElement(c.d,{path:"/recipe/:recipeID",component:W}))))))};o.a.render(r.a.createElement(J,null),document.getElementById("root"))},94:function(e,t,a){e.exports=a.p+"static/media/logo.94ab251c.png"}},[[103,1,2]]]);
//# sourceMappingURL=main.182871c0.chunk.js.map