const images = ['logo.webp', 'team.webp', 'pv.webp', 'text.webp'];

images.forEach((image) => {
  const img = new Image();
  img.src = image;
});

let hh = document.getElementById('hh');
let mm = document.getElementById('mm');
let ss = document.getElementById('ss');

let sec_dot = document.querySelector('.sec_dot');
let min_dot = document.querySelector('.min_dot');
let hr_dot = document.querySelector('.hr_dot');

let hr = document.getElementById('hr');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let ampm = document.getElementById('ampm');



js = () => {
  let hh_dasharray = hh.getTotalLength().toFixed(5);
  let mm_dasharray = mm.getTotalLength().toFixed(5);
  let ss_dasharray = ss.getTotalLength().toFixed(5);
  
  hh.style.strokeDashoffset = hh_dasharray;
  mm.style.strokeDashoffset = mm_dasharray;
  ss.style.strokeDashoffset = ss_dasharray;
  
  hh.style.strokeDasharray = hh_dasharray;
  mm.style.strokeDasharray = mm_dasharray;
  ss.style.strokeDasharray = ss_dasharray;
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  ampm.innerHTML = h >= 12 ? "PM" : "AM";
  
  if (h > 12) { h = h - 12 }
  
  hh.style.strokeDashoffset = hh_dasharray - ((hh_dasharray * h) / 12) - ((document.getElementById('time').clientWidth) * .0025 * m);
  mm.style.strokeDashoffset = mm_dasharray - (mm_dasharray * m) / 60 - (0.16 * s);
  ss.style.strokeDashoffset = ss_dasharray - (ss_dasharray * s) / 60;
  
  sec_dot.style.transform = `rotateZ(${(s / 60) * 360}deg)`;
  min_dot.style.transform = `rotateZ(${((m / 60) * 360 + (s / 60) * 6)}deg)`;
  hr_dot.style.transform = `rotateZ(${((h / 12) * 360 + (m / 60) * 30)}deg)`;
  
  hr.innerHTML = h;
  min.innerHTML = m;
  sec.innerHTML = s;
  if (h == 12 && ampm.innerHTML == "PM") {
    h = 0
    hh.style.strokeDashoffset = hh_dasharray - ((hh_dasharray * h) / 12) - ((document.getElementById('time').clientWidth) * .0025 * m);
    
  }
}
js();
setInterval(js)

let currentSubs = 0;
const odometerElement = document.getElementById("subs");
const odometer = new Odometer({
  el: odometerElement,
  value: 0
});

async function getYouTubeSubscribers() {
  const channelId =
    "UCQTjljo7SUknPwCrqIPkN9g";
  const url = `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`;
  
  try {
    let response = await fetch(url);
    let data = await response.json();
    let newSubs = parseInt(data.est_sub);
    
    if (newSubs !== currentSubs) {
      odometer.update(newSubs);
      currentSubs = newSubs;
    }
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
  }
}

setInterval(getYouTubeSubscribers, 1000);
getYouTubeSubscribers();