export class Validators {

    static required (value = '') {
        return value && value.trim()
    }

    static minLength (minlength){
        return value => {
            return value.length >= minlength
        }
    }
}

