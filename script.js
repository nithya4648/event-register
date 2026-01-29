const events=[
 {id:'coco',name:'Badminton',about:'Fun cultural event.',participants:[]},
 {id:'chess',name:'Chess',about:'Strategic chess competition.',participants:[]}
];

const $=id=>document.getElementById(id);
const show=id=>['role-selection','participant-dashboard','organizer-dashboard']
.forEach(d=>$(d).style.display=d===id?'block':'none');

function goToParticipant(){show('participant-dashboard');renderP()}
function goToOrganizer(){show('organizer-dashboard');renderO()}
function goBack(){show('role-selection')}

function renderP(){
 $('participant-events').innerHTML=events.map(e=>`
  <div class="event">
   <h3>${e.name}</h3><p>${e.about}</p>
   <button onclick="toggle('f-${e.id}')">Register</button>
   <div id="f-${e.id}" style="display:none">
    <input id="n-${e.id}" placeholder="Name">
    <input id="a-${e.id}" type="number" placeholder="Age">
    <input id="d-${e.id}" placeholder="Department">
    <button onclick="reg('${e.id}')">Submit</button>
   </div>
  </div>`).join('');
}

const toggle=id=>$(id).style.display=
 $(id).style.display=='block'?'none':'block';

function reg(id){
 let n=$(`n-${id}`).value,a=$(`a-${id}`).value,d=$(`d-${id}`).value;
 if(!n||!a||!d) return alert('Please fill all fields');

 let e=events.find(x=>x.id==id);
 e.participants.push({name:n,age:a,dept:d});

 alert(`${n} registered for ${e.name}`);
 toggle(`f-${id}`);
}

function renderO(){
 $('organizer-events').innerHTML=events.map(e=>`
  <div class="event">
   <h3>${e.name}</h3><p>${e.about}</p>
   <p>Count: ${e.participants.length}</p>
   <button onclick="view('${e.id}')">View</button>
   <div id="p-${e.id}" style="display:none"></div>
   <button onclick="edit('${e.id}')">Edit</button>
  </div>`).join('');
}

function view(id){
 let e=events.find(x=>x.id==id),div=$(`p-${id}`);
 div.innerHTML=e.participants.length?
 `<table><tr><th>Name</th><th>Age</th><th>Dept</th></tr>
 ${e.participants.map(p=>`
 <tr><td>${p.name}</td><td>${p.age}</td><td>${p.dept}</td></tr>`).join('')}
 </table>`:'<p>No participants</p>';
 toggle(div.id);
}

function edit(id){
 let t=prompt('New description');
 if(t){events.find(e=>e.id==id).about=t;renderO()}
}
