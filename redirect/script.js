const url = "http://ec2-3-7-147-20.ap-south-1.compute.amazonaws.com/";
document.getElementById("url").innerHTML = url;
document.getElementById("url").setAttribute("href", url);
setTimeout(() => (window.location.href = url), 5000);
