import directives from "./directives"

const Directives = Vue => {
    Vue.directive('drag', directives.drag)
}

export default Directives