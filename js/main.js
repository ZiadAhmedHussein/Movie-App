let apiKey = 'api_key=f500db83ccffaa1858be12e44aeec63c';
// to watch what outPut that be when the api key is not valid swith '//' from the lower apiKey to upper apiKey
// let apiKey = 'api_key=f500db83ccffaa1858be12e44ae63c';
let apiKeyValidation = 'https://api.themoviedb.org/3/authentication';


async function isApiKeyValid(fApiKey) {
  let response = await fetch(`${apiKeyValidation}?${fApiKey}`);
  $(response).ready(lazyLoadRemover());
  let { status_code } = await response.json();
  if (status_code === 1) {

    // defualt home operation

    async function getMoviesArr (apiLink) {
      let response = await fetch(apiLink)
      $(response).ready(lazyLoadRemover());
      let { results } = await response.json();
      // console.log(results);
      displayMoviesCards(results);
    }

    function displayMoviesCards(arr) {
      if (arr.length >= 1) {
        for (let i = 0; i < arr.length; i++) {
          creatMovieCard(arr, i);
        }
      }
    }

{/* <li>
                  <i class="fa-solid fa-star"></i>
                </li>
                <li>
                  <i class="fa-solid fa-star"></i>
                </li>
                <li>
                  <i class="fa-solid fa-star"></i>
                </li> */}
    function creatMovieCard(arr, index) {
      // Number(arr[index].vote_average.toFixed(1))
      document.querySelector('header .header-movies').innerHTML += `
        <div class="inner-movie-card mb-4 col-12 col-md-6 col-lg-4 px-4">
          <div class="movie-card-content position-relative rounded-3 overflow-hidden">
            <div class="movie-img h-100">
              <img class="w-100" src="https://image.tmdb.org/t/p/original${arr[index].poster_path}" alt="${arr[index].original_title} Movie Image">
            </div>
            <div dataID='1' class="movie-details position-absolute top-0 start-0 bg-gradient d-flex flex-column h-100 w-100 text-white px-3 py-4">
              <h2 class="text-center">${arr[index].original_title}</h2>
              <p class="movie-overview m-0 p-0 overflow-auto">${arr[index].overview}</p>
              <p class="release-date my-4">Release Date : ${arr[index].release_date}</p>
              <ul class="stars-movie list-unstyled d-flex align-items-center fs-6">
              
                ${starsOfRateShower(Number(arr[index].vote_average.toFixed(1)))}
                
              </ul>
              <div class="vote-average d-flex justify-content-center align-items-center fs-5">${arr[index].vote_average.toFixed(1)}</div>
            </div>
          </div>
        </div>
      `
    }

    function starsOfRateShower(rate) {
      let cortonaOfStars = '';
      if (rate >= 0 && rate < 1) {
        return cortonaOfStars;
      }else if (rate >= 1 && rate < 5) {
        for (let i = 0; i < 2; i++) {
          cortonaOfStars += 
          `
            <li>
              <i class="fa-solid fa-star"></i>
            </li>
          `
        }
        return(cortonaOfStars)
      }else if (rate >= 5) {
        for (let i = 0; i < Math.round(rate/2); i++) {
          cortonaOfStars += 
          `
            <li>
              <i class="fa-solid fa-star"></i>
            </li>
          `
        }
        return(cortonaOfStars)
      }
    };

    // search operaton
    let searchInput = document.querySelector('.search-movies input.search-name');

    searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim()) {
        $('header .header-movies').html(' ')
        getMoviesArr (`https://api.themoviedb.org/3/search/movie?query=${e.target.value.trim()}\&${apiKey}`);
      }else {
        $('header .header-movies').html(' ');
        getMoviesArr (`https://api.themoviedb.org/3/movie/now_playing?${apiKey}`);
      }
    })
    // #######

    // navbar operations

    function moviesShowerByClick (moviesHref , apiLink) {
      $(`.main-links a[href="${moviesHref}"]`).click((e) => {
        $('header .header-movies').html(' ')
        closeSidebar();
        lazyLoadShower('header .header-movies')
        getMoviesArr (apiLink)
        console.log(e.currentTarget);
      })
    }

    getMoviesArr (`https://api.themoviedb.org/3/movie/now_playing?${apiKey}`);

    moviesShowerByClick ('#nowPlaying', `https://api.themoviedb.org/3/movie/now_playing?${apiKey}`);

    moviesShowerByClick ('#popular', `https://api.themoviedb.org/3/movie/popular?${apiKey}`);

    moviesShowerByClick ('#topRated', `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`);

    moviesShowerByClick ('#trending', `https://api.themoviedb.org/3/trending/movie/day?${apiKey}`);

    moviesShowerByClick ('#upComing', `https://api.themoviedb.org/3/movie/upcoming?${apiKey}`);

    let uNameInput = document.querySelector('form .inner-uName input#uName');
    let uNameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/

    let uMailInput = document.querySelector('form .inner-uEmail input#uEmail');
    let uEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    let uPhoneInput = document.querySelector('form .inner-uPhone input#uPhone');
    let uPhoneRegex = /^01[0,1,2,5][0-9]{8}$/

    let uAgeInput = document.querySelector('form .inner-uAge input#uAge');

    let uPasswordInput = document.querySelector('form .inner-uPassword input#uPassword');
    let uPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    let uRepasswordInput = document.querySelector('form .inner-uRepassword input#uRepassword');

    function ValidationInputValues(regex, value) {
      return regex.test(value)
    }

    function emptyEffect(input, eleOfMessage) {
      $(input).removeClass('border-danger');
      $(input).removeClass('border-success');
      $(eleOfMessage).addClass('opacity-0');
      $(`${eleOfMessage} + i`).removeClass('text-success');
    }

    function ValidEffect(input, eleOfMessage) {
      $(input).removeClass('border-danger');
      $(input).addClass('border-success');
      $(eleOfMessage).addClass('opacity-0');
      $(`${eleOfMessage} + i`).addClass('text-success')
    }

    function inValidEffect(input, eleOfMessage) {
      $(input).addClass('border-danger');
      $(input).removeClass('border-success');
      $(eleOfMessage).removeClass('opacity-0');
      $(`${eleOfMessage} + i`).removeClass('text-success');
    }

    uNameInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.name-valid')
      }else if(ValidationInputValues(uNameRegex, e.target.value)) {
        ValidEffect(e.target, 'p.name-valid')
      }else {
        inValidEffect(e.target, 'p.name-valid')
      }
    })


    uMailInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.email-valid')
      } else if(ValidationInputValues(uEmailRegex, e.target.value)) {
        ValidEffect(e.target, 'p.email-valid')
      }else {
        inValidEffect(e.target, 'p.email-valid')
      }
    })

    uPhoneInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.phone-valid')
      }else if(ValidationInputValues(uPhoneRegex, e.target.value)) {
        ValidEffect(e.target, 'p.phone-valid')
      }else {
        inValidEffect(e.target, 'p.phone-valid')
      }
    })

    uAgeInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.age-valid')
      }else if(Number(e.target.value) >= 6 && Number(e.target.value) <= 70) {
        ValidEffect(e.target, 'p.age-valid')
      }else {
        inValidEffect(e.target, 'p.age-valid')
      }
    })

    uPasswordInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.password-valid')
      }else if(ValidationInputValues(uPasswordRegex, e.target.value)) {
        ValidEffect(e.target, 'p.password-valid')
      }else {
        inValidEffect(e.target, 'p.password-valid')
      }
    })

    uRepasswordInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === "") {
        emptyEffect(e.target, 'p.repassword-valid')
      }else if(e.target.value === uPasswordInput.value) {
        ValidEffect(e.target, 'p.repassword-valid')
      }else {
        inValidEffect(e.target, 'p.repassword-valid')
      }
    })


    let validationIcons = [...document.querySelectorAll('form i')];
    let formInputs = [...document.querySelectorAll('form input')];

    $('form button').click((e) => {
      e.preventDefault();
      let checker = 0;
      for (let i = 0; i < validationIcons.length; i++) {
        if($(validationIcons[i]).hasClass('text-success')) {
          checker++
        }
      }
      if (checker === validationIcons.length) {
        if (uPasswordInput.value === uRepasswordInput.value) {
          for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = '';
            emptyEffect(formInputs[i],  'form input + p')
          }
          $(e.currentTarget).html('Acsepted');
          $(e.currentTarget).removeClass('btn-outline-danger');
          $(e.currentTarget).addClass('btn-success');
          $(e.currentTarget).addClass('disabled');

          
        }else {
          inValidEffect(uRepasswordInput, 'p.repassword-valid')
        }
      }
    })
    // ###############################
    // #######################3
  } else {
    $('.search-movies').css('display', 'none')
    $('.contact-us').removeClass('d-flex');
    $('.contact-us').addClass('d-none');
    $('header .header-movies').html(' <p class="m-0 p-4 fs-3 fw-medium d-flex col-12 rounded-4 justify-content-center align-items-center text-danger border border-5 border-danger bg-black">Sorry... Cant reach this app, maybe API  key not valid</p> ')
    
  }
}
isApiKeyValid(apiKey);
$("a").click(function(e) {
  e.preventDefault();
});

// lazyload

function lazyLoadShower(parent) {
  $(`${parent}`).html(`
  <div class="lazy-load d-flex justify-content-center align-items-center z-3 position-absolute top-0 start-0 w-100 bg-black h-100">
    <div class="spinner-border text-white fs-1" role="status">
    </div>
  </div>
  `);
  $(`${parent}`).css(`position`,`relative`)
}
function lazyLoadRemover() {
  $('.lazy-load').remove();
}


// #####################

 // sidebar operations
$('.main-navbar').css('left' , -$('.navbar-content').innerWidth());
$('.main-links li').css('top' , 500)

let navbarContentWidth = $('.navbar-content').innerWidth()


function closeSidebar() {
  homeLayOut()
  $('.main-navbar').animate({
    'left': - navbarContentWidth
  }, (500))
  $('.navbar-shower-icon i').toggleClass("d-none");
}

function homeLayOut() {
  $('header .layout').toggleClass('d-none')
}

$('.navbar-shower-icon').click(() => {
  $('.navbar-shower-icon i').toggleClass("d-none"); 
  homeLayOut();
    if($('.main-navbar').css('left') === '0px') {
      $('.main-navbar').animate({
        'left': - navbarContentWidth
      }, (500))
      $('.main-links li').animate({
        'top' : 500
      }, (1000))
    }else {
      $('.main-navbar').animate({
        'left': 0
      }, (500))

      $('.main-links li:first-child').animate({
          'top' : 0
        }, (450) , () => {

          $('.main-links li:nth(1)').animate({
            'top' : 0
          }, (150), () => {

            $('.main-links li:nth(2)').animate({
              'top' : 0
            }, (150) , () => {

              $('.main-links li:nth(3)').animate({
                'top' : 0
              }, (150), () => {

                $('.main-links li:nth(4)').animate({
                  'top' : 0
                }, (150), () => {
                  $('.main-links li:nth(5)').animate({
                    'top' : 0
                  }, (150))

                })

                
              })
            })
          })
        })
    }
});

 // ###########






























