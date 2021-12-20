import vieillesCitations from '~/old-quotes.json'
const state = () => ({
    liste: vieillesCitations
})

const mutations = {
    addCitation(state, citation){
        state.liste.push(citation);
    }
}

export default {
    state: state,
    mutations: mutations
}
/* export const plugins = [
    store => {
        store.subscribe((mutation, state) => {
            console.log(mutation)
        })
    }
] */