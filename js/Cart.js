// Cart Logic

function addToCart(product, qty=1){
  const had = state.cart.get(product.id);
  state.cart.set(product.id,{product, qty: had? had.qty+qty : qty});
  updateCartUI();
}

function updateCartUI(){
  const itemsEl = byId('cartItems');
  itemsEl.innerHTML='';
  let total=0,count=0;

  state.cart.forEach(({product,qty})=>{
    total += product.price*qty; count += qty;

    const row=document.createElement('div'); row.className='cart-item';
    row.innerHTML=`
      <img src="${product.image}" style="width:80px;height:80px;object-fit:cover;border-radius:12px">
      <div style="flex:1">
        <div class="row-between">
          <strong>${product.title}</strong><strong>${formatINR(product.price)}</strong>
        </div>
        <div class="qty">
          <button class="dec">−</button>
          <span>${qty}</span>
          <button class="inc">+</button>
          <button class="remove">Remove</button>
        </div>
      </div>`;

    row.querySelector('.inc').onclick=()=>{
      state.cart.set(product.id,{product,qty:qty+1}); updateCartUI();
    };
    row.querySelector('.dec').onclick=()=>{
      state.cart.set(product.id,{product,qty:Math.max(1,qty-1)}); updateCartUI();
    };
    row.querySelector('.remove').onclick=()=>{
      state.cart.delete(product.id); updateCartUI();
    };

    itemsEl.appendChild(row);
  });

  byId('cartTotal').textContent=formatINR(total);
  byId('cartCount').textContent=count;

  const badge=byId('cartBadge');
  if(count>0){badge.textContent=count;badge.classList.remove('hidden');}
  else{badge.classList.add('hidden');}
}

// Cart Events
function openCart(){ byId('cartOverlay').classList.add('show'); }
function closeCart(){ byId('cartOverlay').classList.remove('show'); }

byId('cartBtn').onclick=openCart;
byId('closeCart').onclick=closeCart;
byId('cartOverlay').onclick=(e)=>{ if(e.target.id==='cartOverlay') closeCart(); };
