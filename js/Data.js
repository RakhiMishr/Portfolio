// ------- Data ---------
const CATEGORIES = ["All","Electronics","Fashion","Home","Beauty","Sports"];
const PRODUCTS = [
  {id:1,title:"Noise Cancelling Headphones",category:"Electronics",price:12999,rating:4.5,stock:18,image: src= "./image/ra.jpg",desc:"Immersive sound, 35h battery, Type-C fast charge.",tags:["wireless","bluetooth","over-ear"]},
  {id:2,title:"Smart Watch Series X",category:"Electronics",price:8999,rating:4.2,stock:10,image: src ="image/b.jpg",desc:"AMOLED, GPS, SpO₂, 5-day battery.",tags:["fitness","amoled"]},
  {id:3,title:"Minimal Sneakers",category:"Fashion",price:3499,rating:4.4,stock:26,image: src ="image/c.jpg",desc:"Breathable knit upper with cushioned sole.",tags:["unisex","casual"]},
  {id:4,title:"Ergo Office Chair",category:"Home",price:15999,rating:4.7,stock:7,image: src ="image/d.jpg",desc:"Adjustable lumbar support, breathable mesh.",tags:["work","ergonomic"]},
  {id:5,title:"Ceramic Cookware Set (5 pc)",category:"Home",price:4999,rating:4.1,stock:32,image:"https://images.unsplash.com/photo-1514516430035-0c1ee2533f80?q=80&w=1200&auto=format&fit=crop",desc:"Non-stick, PFAS free, induction compatible.",tags:["kitchen","non-stick"]},
  {id:6,title:"Vitamin C Serum",category:"Beauty",price:799,rating:4.3,stock:70,image:"https://images.unsplash.com/photo-1611931960484-9e5b4b2d8f1d?q=80&w=1200&auto=format&fit=crop",desc:"Brightens skin, 10% stabilized formula.",tags:["skincare","glow"]},
  {id:7,title:"Yoga Mat Pro",category:"Sports",price:1399,rating:4.6,stock:40,image:"https://images.unsplash.com/photo-1599058945522-28d584b6f77b?q=80&w=1200&auto=format&fit=crop",desc:"6mm thick, anti-slip, sweat resistant.",tags:["workout","stretch"]},
  {id:8,title:"Classic Denim Jacket",category:"Fashion",price:2899,rating:4.0,stock:14,image:"https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",desc:"Timeless fit with durable stitching.",tags:["denim","casual"]},
];

// ------- State ---------
const state = {q:"",cat:"All",sort:"popular",wish:new Set(),cart:new Map(),detail:null};

// ------- Helpers ---------
const byId = (id)=>document.getElementById(id);
const formatINR = (n)=> new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);

function starHTML(r){
  const round = Math.round(r);
  let s='';
  for(let i=0;i<5;i++) 
    s += `<svg width="16" height="16" viewBox="0 0 24 24" ${i<round?"fill='gold'":"fill='none'"} stroke="currentColor" stroke-width="1.5" style="opacity:${i<round?1:.35}">
            <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"></polygon>
          </svg>`;
  return s + `<span class="muted" style="font-size:12px">${r.toFixed(1)}</span>`;
}

function currentList(){
  let list = PRODUCTS.filter(p=> state.cat==='All' ? true : p.category===state.cat);
  const t = state.q.trim().toLowerCase();
  if(t) list = list.filter(p=> p.title.toLowerCase().includes(t)||p.category.toLowerCase().includes(t)||p.tags.some(x=>x.toLowerCase().includes(t)));
  switch(state.sort){
    case 'price_low': list.sort((a,b)=>a.price-b.price);break;
    case 'price_high': list.sort((a,b)=>b.price-a.price);break;
    case 'rating': list.sort((a,b)=>b.rating-a.rating);break;
    default: list.sort((a,b)=> (b.rating*25 + (b.stock-a.stock)) - (a.rating*25 + (a.stock-b.stock)));
  }
  return list;
}
