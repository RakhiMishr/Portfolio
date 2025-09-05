// Products Grid Rendering

function renderGrid(){
  const list=currentList();
  const grid=byId('grid');
  grid.innerHTML='';

  list.forEach(p=>{
    const card=document.createElement('article');
    card.className='card card-prod';
    card.innerHTML=`
      <div class="prod-img">
        <img src="${p.image}" alt="${p.title}">
        <button class="wish">${state.wish.has(p.id)?'❤️':'🤍'}</button>
      </div>
      <div class="prod-body">
        <div class="row-between">
          <h3 class="title">${p.title}</h3>
          <span class="price">${formatINR(p.price)}</span>
        </div>
        <div class="rate">${starHTML(p.rating)}</div>
        <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="btn-row">
          <button class="btn add">Add to cart</button>
          <button class="btn outline details">Details</button>
        </div>
      </div>`;

    card.querySelector('.wish').onclick=()=>{
      state.wish.has(p.id)?state.wish.delete(p.id):state.wish.add(p.id);
      renderGrid();
    };
    card.querySelector('.add').onclick=()=>addToCart(p,1);
    card.querySelector('.details').onclick=()=>openDetail(p);

    grid.appendChild(card);
  });

  // Thumbnails
  const thumbs=byId('thumbs');
  thumbs.innerHTML=PRODUCTS.slice(0,6).map(p=>
    `<div class="thumb"><img src="${p.image}" alt=""></div>`).join('');
}
