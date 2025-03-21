type Words = {
    /**
     * It is an array of words from a string, separated by a space
     */
    words: string[]
}
export function getWords(sentence: string): Words {

    const words = sentence.split(' ');
    return { words }
}
