const blurBackground = (className, blur) => {
    return `${className} ${blur ? 'app-blur' : ''}`;
}

export {
    blurBackground
}
