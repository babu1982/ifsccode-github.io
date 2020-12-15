const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
//search states.json and filter it
const searchIfsc = async searchText =>{
const res = await fetch('ifsc.json');
const ifsc =await res.json();
// Get matches to current input
let matches = ifsc.filter(ifsc => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return ifsc.IFSC.match(regex);
});

if(searchText.length===0){
    matches =[];
    matchList.innerHTML ='';
}
//console.log(matches);
outputHtml(matches);
};
//show result in HTML
const outputHtml = matches =>{
    if(matches.length >0){
        const html = matches.map(match => `
        <div class="card card-body">
        <h6>Bank Name:-${match.BANK} <br> City: ${match.CITY_I} - ${match.CITY_II} <br> State: (${match.STATE}) <br> IFSC CODE: <span class="text-primary">${match.IFSC}</span>
		<br>MICR CODE:<span class="text-info"> ${match.MICR}</span>
		<br> Branch: ${match.BRANCH}
		</h6>
        <small>Address: <span class="text-success"> ${match.ADDRESS}/ Phone: ${match.PHONE} </span></small>
        </div>
        `).join('');
        
        matchList.innerHTML = html; 
        console.log(html);  
    }
   
};
search.addEventListener('input', ()=> searchIfsc(search.value));
