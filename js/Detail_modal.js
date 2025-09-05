// Product Detail Modal

function openDetail(p){
  state.detail=p;
  byId('dImg').src=p.image;
  byId('dTitle').textContent=p.title;
  byId('dPrice').textContent=formatINR(p.price);
  byId('dRating').innerHTML=starHTML(p.rating);
  byId('dDesc').textContent=p.desc;
  byId('dTags').innerHTML=p.tags.map(t=>`<span class="tag">${t}</span>`).join('');

  byId('detailModal').classList.add('show');

  byId('dAdd').onclick=()=>addToCart(p,1);
  byId('dBuy').onclick=()=>{ addToCart(p,1); openCart(); };
}

byId('dClose').onclick=()=>byId('detailModal').classList.remove('show');
byId('detailModal').onclick=(e)=>{
  if(e.target.id==='detailModal') byId('detailModal').classList.remove('show');
};
