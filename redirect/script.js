const url = "http://ec2-3-15-204-116.us-east-2.compute.amazonaws.com/";
document.getElementById("url").innerHTML = url;
document.getElementById("url").setAttribute("href", url);
setTimeout(() => (window.location.href = url), 5000);
