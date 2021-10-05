/*==================== 漢堡菜單顯示 ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')



/*===== 清單顯示 =====*/
/* 點擊後顯示清單 */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== 清單隱藏 =====*/
/* 點擊叉叉後關閉 */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== 手機模式下的菜單 ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // 當點擊了漢堡菜單 原本的漢堡按鈕將在畫面上消失
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== 改變HEADER的背景色 ====================*/

let scrollBar = document.querySelector('.scroll-bar');

function scrollHeader() {
    const header = document.getElementById('header')
    // 當清單大於等於100時，HEADER會改變樣貌，如果小於就會使用原本樣貌。
    if (this.scrollY >= 100) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')

    window.onscroll = () => {

        scrollIndicator();
    }



}

/*==================== 控制網頁上方滑動進度條 ====================*/
function scrollIndicator() {

    let maxHeight = window.document.body.scrollHeight - window.innerHeight;
    let percentage = ((window.scrollY) / maxHeight) * 100;
    scrollBar.style.width = percentage + '%';

}

window.addEventListener('scroll', scrollHeader)


/*==================== 置頂 ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // 當網頁向下滑到超過200時會跳出置頂按鈕
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== 頁簽滾動標示 ====================*/

// const sections = document.querySelectorAll('section[id]')

// function scrollActive() {
//     const scrollY = window.pageYOffset

//     sections.forEach(current => {
//         const sectionHeight = current.offsetHeight
//         const sectionTop = current.offsetTop - 50;
//         sectionId = current.getAttribute('id')

//         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//             document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
//         } else {
//             document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
//         }
//     })
// }
// window.addEventListener('scroll', scrollActive)

/*==================== 控制進入網頁時的動畫進場 ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,

})

// 由上往下進入
sr.reveal(`.home__data, .home__social-link,            
           .heading, .workinfo,.experiencerow
           ,.box-container
           `, {
    origin: 'top',
    interval: 100,
})

// 由左往右進入
sr.reveal(`.about__data, 
           .aboutimg, .box-container,.skill`, {
    origin: 'left',
})
// 由右往左進入
sr.reveal(``, {
    origin: 'right',
    interval: 100,
})

/*==================== 光暗模式 ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// 選擇原本的模式光模式，背景和ICON改變
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// 點擊暗模式會做驗證的動作
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// 有無點擊按鈕選擇模式
if (selectedTheme) {
    // 如果點擊模式那會判斷是否使用暗模式。
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// 點擊按鈕關閉模式
themeButton.addEventListener('click', () => {
    // 改變ICON
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // 保存所選的模式和ICON
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

