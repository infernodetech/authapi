export default abstract class AbstractDTOConverter<T, U> {
    abstract convertToDTO(object : U) : T

    convertListToDTO(list : U[]) : T[] {
         return list.map(item =>  this.convertToDTO(item))

    }

    public static  getConverter<K>(this: new () => K) : K {
        if(!(this as any)._converter) {
            (this as any)._converter = new this()
        }

        return (this as any)._converter
    }
}
