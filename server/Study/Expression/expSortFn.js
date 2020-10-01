// Sort function that returns 1 if stronger and -1 if weaker and 0 if equal
let weak = (a, b) => {
    if (a == null || b == null) return -1
    if (a.strength < b.strength) return -1
    if (a.strength > b.strength) return 1
    return 0
}

// Returns 1 if a is weaker than b, results in the sort to be ordered by strongest
let strong = (a, b) => {
    if (a == null || b == null) return -1
    if (a.strength > b.strength) return -1
    if (a.strength < b.strength) return 1
    return 0
}

// Sorts by the language string value
let language = (a, b) => {
    if (a == null || b == null) return -1
    if (a.language > b.language) return 1
    if (a.language < b.language) return -1
    return 0
}

let young = (a, b) => {
    if (a == null || b == null) return -1
    if (a._id > b._id) return -1
    if (a._id < b._id) return 1
    return 0
}

let old = (a, b) => {
    if (a == null || b == null) return -1
    if (a._id < b._id) return -1
    if (a._id > b._id) return 1
    return 0
}

function sort(sortString) {
    switch (sortString) {
        case 'strong':
            return strong
        case 'language':
            return language
        case 'young':
            return young
        case 'old':
            return old
        case 'weak':
        default:
            return weak
    }
}

module.exports = {
    sort,
    weak,
    strong,
    language,
    young,
    old
}