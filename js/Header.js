// Header / Category / Search / Sort

function renderCats(){
  const el = byId('cats');
  el.innerHTML = '';
  CATEGORIES.forEach(c=>{
    const b=document.createElement('button');
    b.className='chip'+(state.cat===c?' active':'');
    b.textContent=c;
    b.onclick=()=>{state.cat=c; renderAll();};
    el.appendChild(b);
  });
}

// Events
byId('search').addEventListener('input',(e)=>{
  state.q=e.target.value; renderGrid();
});
byId('sort').addEventListener('change',(e)=>{
  state.sort=e.target.value; renderGrid();
});

// Theme toggle
byId('themeBtn').onclick=()=>{
  document.body.classList.toggle('dark');
};
