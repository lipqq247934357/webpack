import { SyncHook } from 'tapable';

export class Compiler {
    constructor() {
        this.hooks = {
            brake: new SyncHook(["speed"])
        }
    }
}