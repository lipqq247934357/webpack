let age = 28;
export let name = 'lipeng';
export function func() {
    console.log(age);
}
setTimeout(()=> {
    age = 22;
    func = () => {
        console.log(age + 22);
    }
}, 1000);