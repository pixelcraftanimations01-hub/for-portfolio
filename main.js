const skills = {
  "Programming Languages": ["Python","C"],
  "Data & Analytics": ["SQL","Excel","Power BI","Data Analytics"],
  "AI & Machine Learning": ["Artificial Intelligence","Machine Learning","Data Science"],
  "Tools": ["GitHub","VS Code"],
  "Computer Science": ["Data Structures & Algorithms","DBMS","Computer Networks"]
};
const skillGrid = document.getElementById('skillGrid');
Object.entries(skills).forEach(([cat, items])=>{
  const div = document.createElement('div');
  div.className = 'card rounded-2xl p-5 bg-white/60 dark:bg-white/5';
  div.innerHTML = `<p class="font-display font-semibold mb-3 text-sm">${cat}</p><div class="flex flex-wrap gap-2">${items.map(i=>`<span class="text-xs px-3 py-1.5 rounded-full border border-slate3/25 dark:border-slate2/25 hover:border-amber hover:text-amber transition-colors">${i}</span>`).join('')}</div>`;
  skillGrid.appendChild(div);
});

const projects = [
  {name:"Bank Loan & Credit Risk Analysis", desc:"End-to-end credit risk analysis of loan portfolios to uncover borrower risk patterns and default trends.", tech:["Python","SQL","Excel","Power BI"], features:["Risk profiling framework","Portfolio KPI dashboards","Default trend analysis"]},
  {name:"Credit Card Transaction Analysis", desc:"Analysis of credit card transactions to uncover spending behaviour, trends and anomalous activity.", tech:["Python","SQL","Power BI"], features:["Customer segmentation","Financial KPI monitoring","Anomaly detection"]}
];
const projectGrid = document.getElementById('projectGrid');
projects.forEach(p=>{
  const div = document.createElement('div');
  div.className = 'card rounded-2xl p-7 bg-white/60 dark:bg-white/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg';
  div.innerHTML = `
    <div class="w-10 h-10 rounded-xl bg-amber/15 text-amber grid place-items-center mb-5">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9M10 19V5M16 19v-7M4 19h16"/></svg>
    </div>
    <h3 class="font-display font-bold text-xl mb-2">${p.name}</h3>
    <p class="text-slate3 dark:text-slate2 text-sm mb-4 leading-relaxed">${p.desc}</p>
    <div class="flex flex-wrap gap-2 mb-4">${p.tech.map(t=>`<span class="text-xs font-medium px-2.5 py-1 rounded-full bg-amber/10 text-amber">${t}</span>`).join('')}</div>
    <ul class="text-sm text-slate3 dark:text-slate2 space-y-1.5">${p.features.map(f=>`<li class="flex gap-2"><span class="text-amber">·</span>${f}</li>`).join('')}</ul>`;
  projectGrid.appendChild(div);
});

// theme
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const iconMoon = document.getElementById('iconMoon'), iconSun = document.getElementById('iconSun');
function setTheme(t){
  root.classList.toggle('dark', t==='dark');
  iconMoon.classList.toggle('hidden', t==='dark');
  iconSun.classList.toggle('hidden', t!=='dark');
  try{localStorage.setItem('theme', t);}catch(e){}
}
let saved; try{ saved = localStorage.getItem('theme'); }catch(e){}
setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'));
themeBtn.addEventListener('click', ()=> setTheme(root.classList.contains('dark') ? 'light':'dark'));

// mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', ()=>{
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false');}));

// navbar compact on scroll
const navInner = document.getElementById('navInner');
window.addEventListener('scroll', ()=>{
  navInner.classList.toggle('py-2', window.scrollY > 40);
  navInner.classList.toggle('py-3', window.scrollY <= 40);
}, {passive:true});

// active link + reveal on scroll
const sections = document.querySelectorAll('section[id]');
const navlinks = document.querySelectorAll('.navlink');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      navlinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href') === '#'+e.target.id));
    }
  });
},{threshold:0.3});
sections.forEach(s=>io.observe(s));
document.querySelectorAll('.reveal').forEach(s=>io.observe(s));

// Resume download — works directly on GitHub Pages.
function downloadResume(){
  const link = document.createElement('a');
  link.href = 'assets/Mayank_Pandey_Resume.pdf';
  link.download = 'Mayank_Pandey_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
['resumeBtn','resumeBtnMobile','resumeBtnHero','resumeBtnCta'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('click', downloadResume);
});

// contact form
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!form.checkValidity()){ status.textContent = 'Please fill in all fields with a valid email.'; status.className='text-sm text-red-500'; return; }
  status.textContent = 'Message ready — please email me directly at pixelcraftanimations01@gmail.com.';
  status.className = 'text-sm text-amber';
  form.reset();
});
