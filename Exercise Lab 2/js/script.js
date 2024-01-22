var pageIndex = 1;
showPage(pageIndex);
showCount();
showBtn();

function showBtn() {
var btn = document.getElementsByClassName("pagination");
var pages = Math.floor(users.length/10) + 1;
var btntext = ``;
for ( i = 1; i <= pages; i++){
btntext += `<li><a onclick="paging(${i})">${i}</a></li>\n`
}
btn[0].innerHTML = btntext;
}

function showCount() {
var count = document.getElementsByClassName("contactcount");
count[0].innerHTML = `Total: ${users.length}`;
}

function paging(n) {
    showPage(pageIndex = n);
}

function showPage(n) {
    var i;
    var showIndex;
    var maxpage = Math.floor(users.length/10) + 1;
    var remainder = users.length%10;

    var contact = document.getElementsByClassName("contact-details");
    var join = document.getElementsByClassName("joined-details");
    if(n !=4){
        for(i = 0; i < 10; i++){
            showIndex = 10 * (pageIndex - 1) + i;
            contact[i].innerHTML = `<img class="avatar" src="${users[showIndex].image}"><h3>${users[showIndex].name}</h3><span class="email">${users[showIndex].email}</span>`;
            join[i].innerHTML = `<span class="date">Joined ${users[showIndex].joined}</span>`;
        }
    }

    if(n == maxpage) {
        for(i = 0; i < remainder; i++) {
            showIndex = 10 * (pageIndex - 1) + i;
            contact[i].innerHTML = `<img class="avatar" src="${users[showIndex].image}"><h3>${users[showIndex].name}</h3><span class="email">${users[showIndex].email}</span>`;
            join[i].innerHTML = `<span class="date">Joined ${users[showIndex].joined}</span>`;
        }
        for(i = remainder; i < 10; i++){
            contact[i].innerHTML = ``;
            join[i].innerHTML = ``;
        }
    }
}

