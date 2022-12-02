var limit = 16;
var offset = 0;

// Get current tag tab
site = window.location.href;
if (site.includes("explore/projects/")) {
    site = site.split('/')
    var tag = site[site.length - 2]
} else {
    var tag = "*"
}

console.log(tag)

function getProjects(tag, limit=16, offset=0) {
    fetch('/api/'+tag+'/?limit='+limit.toString()+"&offset="+offset.toString())
       .then((response) => response.json())
       .then((response) => addProjects(response))
}

function addProjects(projects) {
    for (const project of projects) {
        insertProject(project);
    }
    document.getElementById("more").innerHTML = "Load more"
}

function insertProject(project) {
    const grid = document.getElementById("projectGrid");
    console.log(grid);
    //project_div = '<div class="thumbnail project"><a class="thumbnail-image" href="/projects/'+project["id"].toString()+'/"><img alt="" src="https://cdn2.scratch.mit.edu/get_image/project/'+project["id"].toString()+'_480x360.png"></a><div class="thumbnail-info"><a class="creator-image" href="/users/'+project["author"].toString()+'/"><img alt="'+project["author"].toString()+'" src="https://cdn2.scratch.mit.edu/get_image/user/72092169_32x32.png"></a><div class="thumbnail-title"><a href="/projects/'+project["id"].toString()+'/" title="'+project["title"]+'">'+project["title"].toString()+'</a><div class="thumbnail-creator"><a href="/users/'+project["author"].toString()+'/">'+project["author"].toString()+'</a></div></div></div></div>'
    project_div = '<div class="thumbnail project"><a class="thumbnail-image" target="_blank" href="https://scratch.mit.edu/projects/'+project["id"].toString()+'/"><img alt="" src="https://cdn2.scratch.mit.edu/get_image/project/'+project["id"].toString()+'_480x360.png"></a><div class="thumbnail-info"><a class="creator-image" href="/users/'+project["author"].toString()+'/"><div class="thumbnail-title"><a target="_blank" href="https://scratch.mit.edu/projects/'+project["id"].toString()+'/" title="'+project["title"]+'">'+project["title"].toString()+'</a><div class="thumbnail-creator"><a target="_blank" href="https://scratch.mit.edu/users/'+project["author"].toString()+'/">'+project["author"].toString()+'</a></div></div></div></div>'
    grid.innerHTML = grid.innerHTML + project_div
}


function loadMore() {
    document.getElementById("more").innerHTML = "Loading ..."
    offset += 16;
    getProjects(tag, limit=limit, offset=offset);
}

window.onload = function init(){
    getProjects(tag);
}