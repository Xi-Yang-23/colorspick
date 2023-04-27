import ColorsPick from "./ColorsPick.vue"

export {
    ColorsPick
}

const install = (app) => {
    app.component(ColorsPick.name, ColorsPick)
}

export default {
    install
}

