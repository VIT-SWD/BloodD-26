(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

//2025 status
// Total Number of Blood Donors:  1111
// Day 1 Count:  500
// Day 2 Count:  611
dept = {
  'AI&DS': 85,
  'CHEM': 120,
  'COMP': 145,
  'DESH': 50,
  'ENTC': 180,
  'INSTRU': 95,
  'IT': 110,
  'INDUS/PROD': 65,
  'MECH': 210,
  'Other': 51
}
years = {
  'FY': 150,
  'SY': 380,
  'TY': 345,
  'B.Tech': 180,
  'Others': 56,
}
bloodGroup = {
  'A+': 210,
  'B+': 289,
  'AB+': 95,
  'O+': 312,
  'A-': 15,
  'B-': 25,
  'AB-': 12,
  'O-': 18,
  'Unknown': 135,
}

const bloodGrpParentContainer = document.querySelector('.blood-grps');

let header = document.createElement('header');
let h3TextEle = document.createElement('h2');
h3TextEle.innerHTML = "Blood group stats";
h3TextEle.style.fontWeight="bold";

header.appendChild(h3TextEle);
bloodGrpParentContainer.appendChild(header);

const bloodGrpsContainer = document.createElement('div');
bloodGrpsContainer.className = "blood-grps-container";
bloodGrpParentContainer.appendChild(bloodGrpsContainer);


for (const key in bloodGroup) {

  let contactAddress = document.createElement('div');
  contactAddress.className = "contact-address";
  bloodGrpsContainer.appendChild(contactAddress);
  
  let spanElem = document.createElement('span');
  spanElem.innerHTML = bloodGroup[key];
  spanElem.style.fontStyle = "italic";
  spanElem.style.fontWeight = "bold";
  contactAddress.appendChild(spanElem);
  
  let h3ele = document.createElement('h3');
  h3ele.innerHTML = key;
  contactAddress.appendChild(h3ele);

}

const yearsContainer = document.querySelector('.years-containers');


header = document.createElement('header');
h3TextEle = document.createElement('h2');
h3TextEle.innerHTML = "Yearwise stats";
h3TextEle.style.fontWeight="bold";
header.appendChild(h3TextEle);
yearsContainer.appendChild(header);

const yearsContainerChild = document.createElement('div');
yearsContainerChild.className = "years-grps-container";

yearsContainer.appendChild(yearsContainerChild);

for (const key in years) {
  let contactAddress = document.createElement('div');
  contactAddress.className = "contact-address";
  yearsContainerChild.appendChild(contactAddress);
  
  let spanElem = document.createElement('span');
  spanElem.innerHTML = years[key];
  spanElem.style.fontStyle = "italic";
  spanElem.style.fontWeight = "bold";
  contactAddress.appendChild(spanElem);
  
  let h3ele = document.createElement('h3');
  h3ele.innerHTML = key;
  contactAddress.appendChild(h3ele);
}

const deptContainer = document.querySelector('.dept_container');

header = document.createElement('header');
h3TextEle = document.createElement('h2');
h3TextEle.innerHTML = "Departmentwise stats";
h3TextEle.style.fontWeight="bold";
header.appendChild(h3TextEle);
deptContainer.appendChild(header);

const deptContainerChild = document.createElement('div');
deptContainerChild.className = "dept-grps-container";
deptContainer.appendChild(deptContainerChild);

for (const key in dept) {
  let contactAddress = document.createElement('div');
  contactAddress.className = "contact-address";
  deptContainerChild.appendChild(contactAddress);
  
  let spanElem = document.createElement('span');
  spanElem.innerHTML = dept[key];
  spanElem.style.fontStyle = "italic";
  spanElem.style.fontWeight = "bold";
  contactAddress.appendChild(spanElem);
  
  let h3ele = document.createElement('h3');
  h3ele.innerHTML = key;
  contactAddress.appendChild(h3ele);
}

// ['FY', 'SY', 'TY', 'BTECH', 'OTHERS'] = [6, 220, 234, 52 ,90]
// ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-','AB-', 'O-','Unknown'] = [110, 159, 40, 162, 5, 10, 5, 7, 104]
// ['AI&DS', 'CHEM', 'COMP', 'DESH', 'ENTC', 'INSTRU','IT', 'INDUS/PROD','MECH', 'Other'] = [45, 85, 68, 7, 100, 48 , 28 , 12, 123, 86]
