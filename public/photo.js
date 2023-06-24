const img = document.getElementById("photo")
const file = document.getElementById("file")
file.addEventListener('change', () => {
    const choosedFlie = this.file[0];
    if (choosedFlie) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            img.toggleAttribute("src", reader.result)
        })
    }
})