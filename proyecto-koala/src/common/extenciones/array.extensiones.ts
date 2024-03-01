
declare global {
    interface Array<T> {
        any(): boolean;
    }
}

Array.prototype.any = function () {
    //Si no hay ningun predicado solo dime si hay elementos
    return this.length > 0;
};

export { }; // Asegura que este archivo sea tratado como un módulo de TypeScript