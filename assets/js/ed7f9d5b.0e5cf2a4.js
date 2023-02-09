"use strict";(self.webpackChunkwww_cloudcarbonfootprint_org=self.webpackChunkwww_cloudcarbonfootprint_org||[]).push([[389],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=o.createContext({}),s=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),h=a,m=u["".concat(p,".").concat(h)]||u[h]||d[h]||r;return n?o.createElement(m,i(i({ref:t},c),{},{components:n})):o.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=h;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<r;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6150:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return r},metadata:function(){return l},toc:function(){return s}});var o=n(3117),a=(n(7294),n(3905));const r={id:"gcp",title:"GCP",slug:"/gcp",sidebar_position:2},i=void 0,l={unversionedId:"ConnectingData/gcp",id:"ConnectingData/gcp",title:"GCP",description:"Your Google Cloud Billing Account needs to be configured to export Billing Data to BigQuery, and the application needs to authenticate with GCP to run queries on that data in BigQuery.",source:"@site/docs/ConnectingData/GCP.md",sourceDirName:"ConnectingData",slug:"/gcp",permalink:"/docs/gcp",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"gcp",title:"GCP",slug:"/gcp",sidebar_position:2},sidebar:"defaultSidebar",previous:{title:"AWS",permalink:"/docs/aws"},next:{title:"Azure",permalink:"/docs/azure"}},p={},s=[{value:"Unsupported Usage Types",id:"unsupported-usage-types",level:3},{value:"Options for Google Authentication",id:"options-for-google-authentication",level:3}],c={toc:s};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Your Google Cloud Billing Account needs to be configured to export Billing Data to BigQuery, and the application needs to authenticate with GCP to run queries on that data in BigQuery."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Ensure you have a GCP Service Account with the permission to start BigQuery jobs and read Bigquery job results by granting at least ",(0,a.kt)("inlineCode",{parentName:"p"},"roles/bigquery.dataViewer")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"roles/bigquery.jobUser")," to the service account. Learn more about GCP Service Accounts ",(0,a.kt)("a",{parentName:"p",href:"https://cloud.google.com/iam/docs/service-accounts"},"here"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Ensure that your environment is configured to authenticate with Google Cloud as described ",(0,a.kt)("a",{parentName:"p",href:"https://cloud.google.com/docs/authentication/getting-started"},"here"),"."),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"If you do download a service account key, make sure the environment variable ",(0,a.kt)("inlineCode",{parentName:"li"},"GOOGLE_APPLICATION_CREDENTIALS")," points to the full path of the service account key file. E.g. ",(0,a.kt)("inlineCode",{parentName:"li"},"/Users/<user>/path/to/credential")))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Set up Google Cloud billing data to export to BigQuery. You can find the instructions for this ",(0,a.kt)("a",{parentName:"p",href:"https://cloud.google.com/billing/docs/how-to/export-data-bigquery"},"here"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Configure environment variables for the api and client:"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"After configuring your credentials, we need to set a number of environment variables in the app, so it can authenticate. We use .env files to manage this. Reference ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/trunk/packages/api/.env.template"},"packages/api/.env.template")," for a template .env file. Rename this file as .env, optionally remove the comments and then set the environment variables for the \u201cBilling Data'' approach. If you are only using one of these cloud providers, you can remove the environment variables associated with the other cloud provider in your ",(0,a.kt)("inlineCode",{parentName:"p"},"packages/api/.env")," file.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"There is also a ",(0,a.kt)("inlineCode",{parentName:"p"},"packages/client/.env")," file that allows you to set some configuration for the data range the application requests data for. See ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/trunk/packages/client/.env.template"},"packages/client/.env.template")," for a template. Rename this file as .env, optionally remove the comments and then set the environment variables.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"By default, the client uses AWS, GCP and Azure. If you are only using one of these cloud providers, please update the ",(0,a.kt)("inlineCode",{parentName:"p"},"appConfig")," object in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/trunk/packages/client/src/Config.ts"},"client Config file")," to only include your provider in the ",(0,a.kt)("inlineCode",{parentName:"p"},"CURRENT_PROVIDERS")," array.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"For more details on the GCP specific configuration options and their definitions, please read the ",(0,a.kt)("a",{parentName:"p",href:"./configurations-glossary#variables-needed-for-the-billing-data-holistic-approach-with-gcp"},"Configuration Glossary"))))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Finally, start up the application:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"yarn start\n")))),(0,a.kt)("p",null,"\u26a0\ufe0f This will incur some cost. Use this sparingly if you wish to test with live data."),(0,a.kt)("p",null,"DISCLAIMER: If your editor of choice is VS Code, we recommend using either your native or custom terminal of choice (i.e. iterm) instead. Unexpected authentication issues have occurred when starting up the server in VS Code terminals."),(0,a.kt)("h3",{id:"unsupported-usage-types"},"Unsupported Usage Types"),(0,a.kt)("p",null,"The application has a file containing supported usage types located ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/trunk/packages/gcp/src/lib/BillingExportTypes.ts"},"here"),". The current lists consist of types the application has faced, so there are likely to be some types not yet handled. When querying your data, you may come across unsupported types with a warning like this:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"2021-03-31T09:48:38.815Z [BillingExportTable] warn: Unsupported Usage unit: Filestore Capacity Standard")),(0,a.kt)("p",null,"If you come across a similar warning message, congratulations! You have found a usage type that the app currently isn\u2019t aware of - this is a great opportunity for you to improve Cloud Carbon Footprint!"),(0,a.kt)("p",null,"The steps to resolve are:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Determine the type in question based on the warning message"),(0,a.kt)("li",{parentName:"ol"},"Add the type to the respective list in the ",(0,a.kt)("inlineCode",{parentName:"li"},"BillingExportTypes.ts")," file"),(0,a.kt)("li",{parentName:"ol"},"Delete ",(0,a.kt)("inlineCode",{parentName:"li"},"estimates.cache.json")," file and restart the application server"),(0,a.kt)("li",{parentName:"ol"},"Submit an issue or pull request with the update")),(0,a.kt)("h3",{id:"options-for-google-authentication"},"Options for Google Authentication"),(0,a.kt)("p",null,"We currently only support authentication with Google via the ",(0,a.kt)("inlineCode",{parentName:"p"},"GOOGLE_APPLICATION_CREDENTIALS")," environment variable."))}u.isMDXComponent=!0}}]);