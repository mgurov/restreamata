export function messageContainsCaptor(key, messageContains, field) {
    return {key, messageContains, type: 'contains', field}
}

export function messageMatchesRegexCaptor(key, regex, field) {
    return {key, messageContains: 'do not match anything if old code 09a539c', regex, type: 'regex', field}
}

//mutating
export function messageExtractor(captor, field) {
    captor.messageField = field
    return captor
} 

//mutating
export function keepPending(captor) {
    captor.acknowledge = false
    return captor
} 

/**
 * @throws exceptions e.g. if regex pattern isn't valid
 */
export function captorToPredicate(captor) {

    let valueExtractor = captor.field ? h => h.fields[captor.field] : h => h.message

    let predicate
    if (captor.type === 'regex') {
        let re = new RegExp(captor.regex)
        predicate = (h) => re.test(valueExtractor(h))
    } else {
        predicate = (h) => (valueExtractor(h) + "").indexOf(captor.messageContains) > -1
    }
    return {
        ...captor,
        predicate,
    }
}