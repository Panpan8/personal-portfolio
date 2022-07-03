const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

/*=============== SHOW MENU ===============*/
if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'))
}

/*============== MENU HIDDEN ===============*/
if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'))
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav-link')
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLinks.forEach(navLink => navLink.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')

    if (this.scrollY >= 80) {
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
const swiper = new Swiper('.testimonial-wrapper', {
    loop: 'true',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', navHighLighter)

function navHighLighter() {
    let scrollY = window.pageYOffset

    sections.forEach(c => {
        const sectionHeight = c.offsetHeight
        const sectionTop = c.offsetTop - 50
        const sectionID = c.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-menu a[href *= ${sectionID}]`).classList.add('active-link')
        } else {
            document.querySelector(`.nav-menu a[href *= ${sectionID}]`).classList.remove('active-link')
        }
    })
}

/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector('.portfolio-filter-inner')
const filterBtns = filterContainer.children
const totalFilterBtn = filterBtns.length
const portfolioItems = document.querySelectorAll('.portfolio-item')
const totalPortfolioItem = portfolioItems.length

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener('click', function () {
        filterContainer.querySelector('.active').classList.remove('active')
        this.classList.add('active')

        const filterValue = this.getAttribute('data-filter')
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (filterValue === portfolioItems[k].getAttribute('data-category')) {
                portfolioItems[k].classList.add('show')
                portfolioItems[k].classList.remove('hide')
            } else {
                portfolioItems[k].classList.add('hide')
                portfolioItems[k].classList.remove('show')
            }

            if (filterValue === 'all') {
                portfolioItems[k].classList.add('show')
                portfolioItems[k].classList.remove('hide')
            }
        }
    })
}

/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector('#theme-button')
const themeModal = document.querySelector('.customize-theme')
// open modal
const openThemeModal = () => themeModal.style.display = 'grid'
// close modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none'
    }
}

theme.addEventListener('click', openThemeModal)
themeModal.addEventListener('click', closeThemeModal)

/*===== FONTS =====*/
const fontSizes = document.querySelectorAll('.choose-size span')
const removeSizeSelector = () => {
    fontSizes.forEach(size => size.classList.remove('active'))
}

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector()
        let fontSize
        size.classList.toggle('active')

        if (size.classList.contains('font-size-1')) {
            fontSize = '12px'
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '14px'
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px'
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '18px'
        }

        // change font size of the root html
        document.querySelector('html').style.fontSize = fontSize
    })
})

/*===== PRIMARY COLORS =====*/
const root = document.querySelector(':root')
const colorPallete = document.querySelectorAll('.choose-color span')
// remove active color
const removeActiveColor = () => {
    colorPallete.forEach(colorPicker => colorPicker.classList.remove('active'))
}

colorPallete.forEach(color => [
    color.addEventListener('click', () => {
        removeActiveColor()
        let primaryColor

        if (color.classList.contains('color-1')) {
            primaryColor = 'hsl(240, 69.9%, 66.1%)'
        } else if (color.classList.contains('color-2')) {
            primaryColor = 'hsl(4, 97.6%, 67.1%)'
        } else if (color.classList.contains('color-3')) {
            primaryColor = 'hsl(132, 38.1%, 67.1%)'
        } else if (color.classList.contains('color-4')) {
            primaryColor = 'hsl(252, 75%, 60%)'
        } else if (color.classList.contains('color-5')) {
            primaryColor = 'hsl(202, 75%, 60%)'
        }

        color.classList.add('active')
        root.style.setProperty('--color-primary', primaryColor)
    })
])

/*===== THEME BACKGROUNDS =====*/
const light = document.querySelector('.bg-1')
const dim = document.querySelector('.bg-2')
const dark = document.querySelector('.bg-3')
let lightColorLightness
let whiteColorLightness
let darkColorLightness
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness)
    root.style.setProperty('--white-color-lightness', whiteColorLightness)
    root.style.setProperty('--dark-color-lightness', darkColorLightness)
}

// change background - light
light.addEventListener('click', () => {
    // add and remove active class
    light.classList.add('active')
    dim.classList.remove('active')
    dark.classList.remove('active')

    // remove customized changes from local storage
    window.location.reload()
})

// change background - dim
dim.addEventListener('click', () => {
    lightColorLightness = '15%'
    whiteColorLightness = '20%'
    darkColorLightness = '95%'

    // add and remove active class
    dim.classList.add('active')
    light.classList.remove('active')
    dark.classList.remove('active')

    changeBG()
})

// change background - dark
dark.addEventListener('click', () => {
    lightColorLightness = '0%'
    whiteColorLightness = '10%'
    darkColorLightness = '95%'

    // add and remove active class
    dark.classList.add('active')
    light.classList.remove('active')
    dim.classList.remove('active')

    changeBG()
})