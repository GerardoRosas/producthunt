(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{iClI:function(e,t,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/buscar",function(){return c("oKzC")}])},oKzC:function(e,t,c){"use strict";c.r(t);var o=c("q1tI"),n=c.n(o),u=c("oHpw"),r=c("nOHt"),a=c("KDT9"),i=c("oQh3"),s=c("qKvR");n.a.createElement;t.default=function(){var e=Object(r.useRouter)().query.q,t=Object(i.a)("creado").productos,c=Object(o.useState)([]),n=c[0],d=c[1];return Object(o.useEffect)((function(){var c=e.toLowerCase(),o=t.filter((function(e){return e.nombre.toLowerCase().includes(c)||e.descripcion.toLowerCase().includes(c)}));d(o)}),[e,t]),Object(s.c)("div",null,Object(s.c)(u.a,null,Object(s.c)("div",{className:"listado-productos"},Object(s.c)("div",{className:"contenedor"},Object(s.c)("ul",{className:"bg-white"},n.map((function(e){return Object(s.c)(a.a,{key:e.id,producto:e})})))))))}}},[["iClI",1,2,3,5,6,0,4,7,8]]]);