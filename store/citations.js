import vieillesCitations from '~/old-quotes.json'

const state = () => ({
    vieillesCitations: vieillesCitations.map(cit => {
        cit.vieille = true;
        return cit;
    }),
    nouvellesCitations: [],
    dernierId: Math.max(vieillesCitations.map(cit => cit.id))
})

const mutations = {
    addCitation(state, citation){
        state.nouvellesCitations.push({
            quote:citation,
            id: ++state.dernierId,
            date: new Date().toISOString()
        });
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