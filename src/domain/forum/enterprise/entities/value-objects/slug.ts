export class Slug {
    public value: string

    constructor(value: string) {
        this.value = value

    }

    /**
     * Receives a string and normalize it as a slug
     * 
     * Example: "An example title" = "an-example-title"
     * 
     * @param text {string}
     * 
     */

    static createFromText(text:string){
        const slugText = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/[\u0300-\u036f]/g, '')   // strip accent marks left by NFKD
            .replace(/[\s_]+/g, '-')          // spaces & underscores -> single dash
            .replace(/[^\w-]+/g, '')          // strip remaining non-word chars (punctuation etc.)
            .replace(/-+/g, '-')              // collapse multiple dashes
            .replace(/^-+|-+$/g, '');         // trim leading/trailing dashes

        return new Slug(slugText);


    }
}