const blurBackground = (className, blur) => {
    return `${className} ${blur ? 'app-blur' : ''}`;
}

export default blurBackground;
