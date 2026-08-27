/* Navbar scroll */
const navbar = document.querySelector('.custom-navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* Skin selection */
let selectedSkin = "dry";
document.querySelectorAll('.skin-pill').forEach(p => {
  p.onclick = () => {
    document.querySelectorAll('.skin-pill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    selectedSkin = p.dataset.skin;
  };
});

/* PRODUCTS */
const products = [
  {name:"Gentle Hydrating Cleanser", ingredients:["water","glycerin","hyaluronic acid","cetyl alcohol","niacinamide","cocamidopropyl betaine"], bestFor:["dry","normal","sensitive"], recommended:["hyaluronic acid","glycerin","ceramides"]},
  {name:"Foaming SA Cleanser", ingredients:["salicylic acid","water","sodium cocoyl glycinate","niacinamide","tea tree"], bestFor:["oily","acne-prone"], avoid:["dry","sensitive"], recommended:["salicylic acid","niacinamide"]},
  {name:"Vitamin C Serum", ingredients:["l-ascorbic acid","vitamin e","ferulic acid","hyaluronic acid"], bestFor:["normal","combination"], avoid:["sensitive"], recommended:["vitamin c","hyaluronic acid"]},
  {name:"Gel Moisturizer", ingredients:["water","niacinamide","glycerin","hyaluronic acid","green tea extract"], bestFor:["oily","combination"], recommended:["niacinamide","green tea extract","hyaluronic acid"]},
  {name:"Retinol Night Cream", ingredients:["retinol","shea butter","squalane","vitamin e"], bestFor:["normal","dry"], avoid:["sensitive"], recommended:["retinol","squalane"]},
  {name:"SPF 50 Sunscreen", ingredients:["zinc oxide","octinoxate","water","aloe vera"], bestFor:["all"], recommended:["zinc oxide","aloe vera"]},
  {name:"Soothing Toner", ingredients:["rose water","glycerin","panthenol"], bestFor:["sensitive","dry"], recommended:["panthenol","rose water"]},
  {name:"Niacinamide Serum", ingredients:["niacinamide","zinc","glycerin","ferulic acid"], bestFor:["oily","combination"], recommended:["niacinamide","zinc"]},
  {name:"Collagen Eye Cream", ingredients:["collagen","peptides","hyaluronic acid"], bestFor:["dry","normal"], recommended:["collagen","hyaluronic acid"]},
  {name:"Exfoliating AHA Gel", ingredients:["glycolic acid","lactic acid","aloe vera"], bestFor:["oily","combination"], recommended:["glycolic acid","lactic acid"]}
];

/* Render product cards */
function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<h4>${p.name}</h4><p>${p.bestFor.join(', ')}</p>`;
    card.onclick = () => updateRecommendations(p);
    grid.appendChild(card);
  });
}
renderProducts();

/* OCR upload */
document.getElementById('dropArea').onclick = () => document.getElementById('ocrImage').click();
document.getElementById('ocrImage').onchange = () => {
  let file = document.getElementById('ocrImage').files[0];
  if(!file) return;
  document.getElementById('preview').src = URL.createObjectURL(file);
  document.getElementById('preview').style.display = 'block';
  document.getElementById('ocrStatus').innerText = "Extracting...";
  
  Tesseract.recognize(file,'eng').then(r => {
    const text = r.data.text.trim().toLowerCase();
    const matchedProducts = products.filter(p =>
      p.ingredients.some(i => text.includes(i)) && 
      (p.bestFor.includes(selectedSkin) || p.bestFor.includes("all"))
    );
    
    // Show recommendations based on OCR
    const box = document.getElementById('recommendList');
    box.innerHTML = "";
    matchedProducts.forEach(p => {
      p.recommended.forEach(r => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = r;
        box.appendChild(chip);
      });
    });

    document.getElementById('ocrStatus').innerText = "Done!";
  });
};

/* Recommendations from card click */
function updateRecommendations(p){
  const box = document.getElementById('recommendList');
  box.innerHTML = "";
  p.recommended.forEach(r => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = r;
    box.appendChild(chip);
  });
}

/* Spawn bubbles */
(function(){
  const container = document.getElementById('bubble-container');
  function spawnBubble(){
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random()*50+20;
    b.style.width = size+'px';
    b.style.height = size+'px';
    b.style.left = Math.random()*100+'%';
    b.style.bottom = '-10vh';
    b.style.animationDuration = (Math.random()*6+8)+'s';
    container.appendChild(b);
    setTimeout(()=>b.remove(),12000);
  }
  for(let i=0;i<14;i++) spawnBubble();
  setInterval(spawnBubble,600);
})();
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Keep it visible for at least 2s
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.body.style.overflow = "auto"; // allow scrolling
    }, 500); // fade duration
  }, 2000);
});

