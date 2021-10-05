
/*==================== 點擊後展示選單 ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // 驗證
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // 假如成功會產生一個區塊
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')


/*==================== 手機模式下點擊選單會撤掉面板 ====================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== 點擊選單時根據ID移動到對應位置 ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 20;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== 在大於150高度時顯示至頂圖標 ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 150) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== 光暗模式 ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// 選擇先前的主題顏色
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// 通過驗證來確認當前的主題顏色
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// 驗證是否選擇了某個主題色
if (selectedTheme) {
    // 驗證成功會判定是否啟動暗模式或亮模式
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// 點擊按鈕停用主題顏色
themeButton.addEventListener('click', () => {
    // 增加或停用主題色
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // 保存當前的主題ICON
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*==================== 執行此區塊在點擊下載時 ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv')
}

/*==================== 下載後移除此區塊 ====================*/
function removeScale() {
    document.body.classList.remove('scale-cv')
}
/*==================== 生成PDF ====================*/
// PDF區塊生成

let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')
// Html2pdf options套件

var opt = {
    margin: 1,
    filename: '沈家慶履歷.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
};
// 呼叫 areaCv and Html2Pdf options 執行動作
function generaateResume() {
    html2pdf(areaCv, opt)
}

// 點擊下載後執行的3個動作
resumeButton.addEventListener('click', () => {

    // 1. 改變成A4模式下的大小
    scaleCv()

    // 2. PDF
    generaateResume()

    // 3. 幾秒後變回原來大小頁面
    // setTimeout(removeScale, 5000)
})