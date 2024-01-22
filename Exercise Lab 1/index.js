var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function randomSlide() {
    do {
        random = Math.floor(Math.random() * 6 + 1);
    } while(slideIndex == random);
    showSlides(slideIndex = random);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].innerHTML = `<q>${quotes[i].quote}</q><p class="author">${quotes[i].author}</p>`;
  }

     for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
     }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}