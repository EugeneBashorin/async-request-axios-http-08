const showLoadBtn = (btnEl) => {
    btnEl.classList.add("is-active");
}
const hideLoadBtn = (btnEl) => {
    btnEl.classList.remove("is-active");
}

export {showLoadBtn, hideLoadBtn}