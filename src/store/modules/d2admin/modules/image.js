export default {
    namespaced: true,
    state: {
        imageArray: [],
        imageIndex: 0
    },
    getters: {
        length(state) {
            return state.imageArray.length
        },
        index(state) {
            return state.imageIndex
        }
    },
    mutations: {
        /**
         * @description 设置图片数组
        */
        setImageArray(state, data) {
            state.imageArray = data.data;
            if (data.index) {
                state.imageIndex = data.imageIndex
            }
        }
    }
}
