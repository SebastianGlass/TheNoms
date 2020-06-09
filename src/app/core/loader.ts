export async function loadJson<T>(url): Promise<T> {
    return fetch(url)
        .then(file => file.json())
        .catch(() => console.error(`Parsing error in file ${url}`));
}

export function loadImage(url): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.src = url;
    });
}