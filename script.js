// Page logic. Data lives in data.js.
const $=s=>document.querySelector(s);let lang='en';
document.querySelectorAll('[data-i]').forEach(e=>L.en[e.dataset.i]=e.innerHTML);
function tr(){document.querySelectorAll('[data-i]').forEach(e=>{const v=L[lang][e.dataset.i];if(v)e.innerHTML=v});document.documentElement.lang=lang;$('#lang').textContent=lang==='en'?'ID':'EN'}
$('#lang').onclick=()=>{lang=lang==='en'?'id':'en';tr()};
$('#theme').onclick=()=>{const d=document.documentElement,dark=getComputedStyle(d).colorScheme==='dark';d.dataset.theme=dark?'light':'dark'};

$('#skillGrid').innerHTML=SK.map(s=>`<div class="card"><div class="ico">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('');
$('#projGrid').innerHTML=PJ.map((p,i)=>`<a class="card" href="#project-${i+1}"><div class="ico">${p[0]}</div><h3>Project ${i+1}: ${p[1]}</h3><p>${p[2]}</p><p><b style="color:var(--teal)">Open case study →</b></p></a>`).join('');

const ST={v:['Verified','ok'],c:['Needs correction','fix'],m:['Needs more info','more']};
const pill=k=>`<span class="st ${ST[k][1]}">${ST[k][0]}</span>`;
const tbl=(h,r)=>`<div class="tw"><table><thead><tr>${h.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;


function d1(){return `<p>Verify each listing against the evidence, then recommend a correction. Use the filters to explore the sample data.</p>
<div class="filters"><input id="q" type="search" placeholder="Search business, address, finding…" aria-label="Search"><select id="s" aria-label="Filter by status"><option value="">All statuses</option><option value="v">Verified</option><option value="c">Needs correction</option><option value="m">Needs more info</option></select></div>
<div id="t1"></div><h3 style="margin-top:22px">Method</h3><p>1) Compare the name with the source. 2) Check that the category fits what the business does. 3) Check the address is complete and specific. 4) Confirm the operating location. 5) Record the evidence and the recommended fix.</p>`}
function r1(){const q=($('#q').value||'').toLowerCase(),s=$('#s').value;const rows=P1.filter(r=>(!s||r[5]===s)&&(!q||r.slice(0,5).join(' ').toLowerCase().includes(q))).map(r=>[...r.slice(0,5),pill(r[5])]);$('#t1').innerHTML=rows.length?tbl(['Business','Listed category','Listed address','Verification finding','Recommended correction','Status'],rows):'<p>No matching records.</p>'}
function d2(){const seen={};const rows=P2.map(r=>{const[ id,n,st,di,ci,po]=r,is=[];if(!/^\d{5}$/.test(po))is.push('Postal code format invalid (needs 5 digits)');if(!di)is.push('District missing');else if(!(DIS[ci]||[]).includes(di))is.push(`District “${di}” does not belong to ${ci}`);const k=(n+st).toLowerCase();if(seen[k])is.push(`Possible duplicate of ${seen[k]}`);else seen[k]=id;return[id,n,st,di||'(blank)',ci,po,is.length?`<span class="st fix">${is.join('; ')}</span>`:'<span class="st ok">Passed</span>']});
return `<div class="note">Fictional sample records. The postal check is a format check only; real validation needs an authoritative postal reference.</div>${tbl(['ID','Name','Street','District','City','Postal','Result'],rows)}<h3 style="margin-top:22px">What this shows</h3><p>Consistency checks (district belongs to city), format validation, completeness checks, and duplicate detection by normalized name and street. The result column is computed live from the sample data above.</p>`}
function d3(){return `<p>Reviewing map-related text in Indonesian means checking spelling, naming conventions, and whether a description is specific enough to locate something.</p>${tbl(['Original text','Issue type','Suggested correction','Reason'],P3)}<div class="note">Local place names and terms should always be confirmed against an authoritative source before changing them.</div>`}
function d4(){return `<p>Tick the checklist as you would while reviewing a record. The sample report below uses fictional data.</p><div class="grid"><div class="panel"><h3>Quality checklist <span id="pg" style="color:var(--teal)"></span></h3>${CK.map(c=>`<b>${c[0]}</b>${c[1].map(i=>`<label class="chk"><input type="checkbox" class="ck"> <span>${i}</span></label>`).join('')}`).join('')}</div>
<div class="panel"><h3>Sample quality report (20 fictional records)</h3>${CK.map(c=>`<div class="row"><span>${c[0]}</span><div class="track"><div class="fill" style="width:${c[2]/4*100}%"></div></div><b>${c[2]} issues</b></div>`).join('')}<p style="color:var(--mu);font-size:.88rem">Highest issue volume: Consistency. Recommended action: review style-guide formatting rules.</p></div></div>
<h3 style="margin-top:22px">Correction process</h3><ol><li>Flag the issue and assign it a category.</li><li>Check it against the evidence.</li><li>Propose the correction with its source.</li><li>Re-verify the corrected record.</li><li>Log recurring patterns in the daily report.</li></ol>`}
function detail(n){const T=[d1,d2,d3,d4][n-1]();$('#detail').innerHTML=`<a class="back" href="#projects">← All projects</a><div class="eyebrow">Independent portfolio exercise · fictional sample data</div><h2>Project ${n}: ${PJ[n-1][1]}</h2>${T}`;
if(n===1){r1();$('#q').oninput=r1;$('#s').onchange=r1}
if(n===4){const u=()=>{const a=[...document.querySelectorAll('.ck')];$('#pg').textContent=`(${a.filter(x=>x.checked).length}/${a.length})`};document.querySelectorAll('.ck').forEach(x=>x.onchange=u);u()}}
function route(){const m=location.hash.match(/^#project-([1-4])$/);$('#main').hidden=!!m;$('#detail').hidden=!m;if(m){detail(+m[1]);scrollTo(0,0)}else if(location.hash.length>1){const e=document.getElementById(location.hash.slice(1));if(e)e.scrollIntoView()}}
addEventListener('hashchange',route);route();

$('#cf').onsubmit=e=>{e.preventDefault();location.href=`mailto:ra.amisah@gmail.com?subject=${encodeURIComponent('Portfolio inquiry from '+$('#cn').value)}&body=${encodeURIComponent($('#cm').value+'\n\n'+$('#cn').value+' ('+$('#ce').value+')')}`};
